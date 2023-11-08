const fs = require('fs');
const { exec, spawn } = require('child_process');
const chalk = require('chalk');
const rimraf = require('rimraf');


class Build {

	mode = '';
	dist = './dist';
  tempDist = './dist_temp';
	directoryName = '';
	targetDist = '';
	deployMode = '';
  projectName = '';
  buildVer = '';
	targetRevisionDist = '';

	constructor() {
		this.mode = process.argv[2];
		process.argv[2] === 'production'
      ? require('dotenv').config({ path: './.env.production' })
      : require('dotenv').config({ path: './.env.development' });
		this.deployMode = process.env.NODE_ENV;
		this.buildVer = process.env.VITE_APP_BUILD_VER;
		this.projectName = process.env.VITE_APP_PROJECT_NAME;
		this.directoryName = `${this.projectName}_V${this.buildVer.replace(/\./g, '')}_${this.deployMode}`;
		this.targetDist = `${this.dist}/${this.directoryName}`;
		this.targetRevisionDist = `${this.targetDist}/V${this.buildVer.replace(/\./g, '')}`;
	}

	// git 사용 시 현재branch가져오기
  async getCurrentBranch() {
    // (git rev-parse --abbrev-ref HEAD)현재 브랜치명 가져오기
    const res = await this.execShell(`git rev-parse --abbrev-ref HEAD`);
    return String(res).trim();
  }

	// svn사용 시(테스트 필요)
	//async getCurrentBranch() {
	//	const res  = await this.execShell(`svn info | grep 'Relative URL:'`)
	//	return res
	//}

	// 현재브랜치가 빌드 가능한지 여부 판단
  isBuildableBranch(branch) {
    return ['master'].includes(branch);
  }

	// shell 실행하기
  execShell(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        } else {
          resolve(stdout ? stdout : stderr);
        }
      });
    });
  }

	startBuild() {
		console.log(chalk.green('\n================================================='));
		console.log(chalk.green('=== Build start ================================='));
		console.log(chalk.green('================================================= \n\n'));

		// window에서 spawn을 사용할때 'spawn ENOENT' 에러가 발생하는 경우가 있다.
    // 이럴땐 exec를 사용하거나 cmd를 이용하여 spawn을 작성한다.
    // stdout을 그대로 받는 식으로 작성하면 Hex값만나온다. 변환해서 사용하는 방법 참조
    /**
     * // solution #1
      process.stdout.write(data);

      // solution #2
      console.log(data.toString().replace(/[\n\r]/g, ""));

      // solution #3
      var child_process = require('child_process');
      var readline = require('readline');
      var proc = child_process.spawn(...);
      readline.createInterface({
        input: proc.stdout,
        terminal: false
      }).on('line', function(line) {
        console.log(line);
      });
    */

		return new Promise((resolve, reject) => {
			let cmd = '';
			let runArray = null;
			if (process.platform === 'win32') {
				cmd = 'npm.cmd';
			} else {
				cmd = 'npm';
			}
			
			if (this.mode === 'development') {
				runArray = ['run', 'build-origin-development'];
			} else if (this.mode === 'production') {
				runArray = ['run', 'build-origin'];
			}

			const child = spawn(cmd, runArray);

			child.stdout.on('data', (data) => {
				console.log(chalk.green(`stdout: ${data}`));
			});
			child.stderr.on('data', (data) => {
				console.log(chalk.yellow(`stderr: ${data}`));
			});
			child.on('error', (error) => {
				reject(`error: ${error.message}`);
			});
			child.on('close', (code) => {
				if (code === 0) {
					console.log(chalk.green('\n================================================='));
					console.log(chalk.green('=== Build completed ============================='));
					console.log(chalk.green('================================================= \n\n'));
					resolve();
				} else {
					reject(`build: ${code}`);
				}
			});
		});
	}

	async deployPackage() {
    // 빌드폴더 tempDist로 복사
    await this.execShell(`cp -R ${this.dist} ${this.tempDist}`);

    if (fs.existsSync(this.targetDist)) {
      console.log(chalk.red(`[${this.targetDist}] : 빌드 대상 디렉토리가 존재합니다. 대상 디렉토리를 삭제합니다.`));
      await rimraf.sync(this.targetDist);
    }

    await fs.mkdirSync(this.targetDist, (error) => {
      console.log(chalk.red(`[${this.targetDist}] : 디렉토리 생성에 실패했습니다.: ${error}`));
      process.exit(1); // 즉시종료
    });

    // 복사한 빌드폴더 이동
		// mv 명령어가 Permission denied 에러가 자꾸 발생하여 cp명령어로 교체 함.
		await this.execShell(`cp -R ${this.tempDist} ${this.targetRevisionDist}`);
		await rimraf.sync(this.tempDist);
    //await this.execShell(`mv ${this.tempDist} ${this.targetRevisionDist}/`);
    // zip 파일 생성`
    await this.createZip(this.targetDist, `${this.targetDist}.tar`, this.dist);
    console.log(chalk.green('[deploy package]: deployPackage completed \n'));
  }

	createZip(target, name, dist) {
    if (process.platform === 'win32') {
      return new Promise((resolve) => {
        this.execShell(`tar -caf ${name} ${target}`);
        resolve();
      });
    } else {
      return new Promise((resolve, reject) => {
        const zip = spawn('zip', ['-rX', name, target]);
        zip.stdout.on('data', (data) => {
          console.log(chalk.green(`stdout: ${data}`));
        });
        zip.stderr.on('data', (data) => {
          console.log(chalk.yellow(`stderr: ${data}`));
        });
        zip.on('error', (error) => {
          console.log(chalk.red(`error: ${error.message}`));
        });
        zip.on('close', (code) => {
          console.log(chalk.blue(`zip process exited with code ${code}`));
          if (code === 0) {
            this.execShell(`mv ${name} ${dist}`)
              .then(() => resolve())
              .catch(() => reject());
          } else {
            reject();
          }
        });
      });
    }
  }

	async start() {
		try {
			// 브랜치명을 가져와서 빌드 가능한 브랜치 인지 체크
      //const currentBranch = await this.getCurrentBranch();
      //console.log(chalk.green(`[git] : Check the current branch... : "${currentBranch}"`));
      //if (!this.isBuildableBranch(currentBranch)) {
      //  throw new Error('"master"브랜치에서만 빌드 가능합니다.');
      //}

			await this.startBuild();
			await this.deployPackage();
			// 배포된 파일위치 창 열기
			if (process.platform === 'win32') {
				await this.execShell(`start .\\dist`);
			} else {
				await this.execShell(`open ${this.dist}`);
			}
		} catch (error) {
			console.log(chalk.red(`[ERROR] : ${error}`));
		}
	}
}

const buildInst = new Build();
buildInst.start();
