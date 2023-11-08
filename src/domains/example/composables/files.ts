import type { AxiosResponse } from 'axios';

// Blob타입의 데이타를 이용하여 blob url을 추출하는 함수
export function useBlobURL(str: string, type?: string ) {
	let sType = 'text/plain';
	if (type) {
		sType = type;
	}
	return URL.createObjectURL(new Blob([str,], { type: sType, }));
}

// ajax 결과 다운로드 파일 response에서 이름을 추출하는 함수
export function useExtractDownloadFilename(response: AxiosResponse) {
	const disposition = response.headers['content-disposition'];
	const fileName = decodeURI(
		disposition
			.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
			.replace(/['"]/g, '')
	);
	return fileName;
}

// canvas에 이미지 그리기 함수
export function useDrawOnCanvas(canvas: HTMLCanvasElement, imgStr: string, w=200, h=200, imgType='image/png') {
	const imgUrl = useBlobURL(imgStr, imgType);
	const ctx = canvas.getContext('2d') as any;
	const img = new Image;

	img.addEventListener('load', () => {
		//console.log('canvas image load event:: ', `${img.width}, ${img.height}`);
		//(myCanvas.value as HTMLCanvasElement).width = img.width;
		//(myCanvas.value as HTMLCanvasElement).height = img.height;
		//myContext.value.drawImage(img, 0, 0, img.width, img.height);
		ctx.drawImage(img, 0, 0, w, h);
		URL.revokeObjectURL(imgUrl);
	});

	img.src = imgUrl;
}

// ajax결과 데이타가 파일일 경우 다운로드 함수
export function useDownloadFile(response: any) {
	const imgStr = useBlobURL(response.data, 'image/png');
	let imgName = '';
	try {
		imgName = useExtractDownloadFilename(response);
	} catch {
		imgName = 'download';
	}
	useDownloadURI(imgStr, imgName);
	
}

export function useDownloadURI(uri: string, name: string) {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri;
	link.style.display = 'none';
	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(uri);
}
