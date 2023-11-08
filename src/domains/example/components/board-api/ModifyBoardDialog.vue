<template>
	<v-card style="min-height: auto;">
		<v-row
			style="display: block;flex:none;">
			<v-col cols="12">
				<v-chip
					class="mt-2 ml-4"
					size="small"
					color="primary"
					variant="outlined"
				>
					{{ board_detail?.data.bbsNm }}
				</v-chip>
			</v-col>
		</v-row>
		<v-form
			ref="inputForm"
			v-on:submit.prevent="() => {}"
		>
			<v-row
				dense
				no-gutters
				style="display: block;flex:none;">
				<v-col cols="12">
					<v-text-field
						bg-color="#fff"
						label="제목 입력"
						placeholder="제목 입력"
						v-model="titleTxt"
					/>
				</v-col>
			</v-row>
			<v-row
				dense
				no-gutters
				style="display: block;flex:none;">
				<v-col
					cols="12">
					<v-textarea
						bg-color="#fff"
						name="input-7-1"
						label="글 내용 입력"
						auto-grow
						v-model="contentsTxt"
					/>
				</v-col>
			</v-row>
			<v-row
				dense
				no-gutters>
				<v-col
					cols="12">
					<v-file-input
						bg-color="#fff"
						label="이미지 업로드"
						placeholder="이미지 업로드"
						class="input pl-5"
						type="file"
						accept="image/png, image/jpeg, image/bmp"
						counter
						show-size
						outlined
						dense
						prepend-icon="mdi-camera"
						v-model:model-value="fileModel"
						v-on:change="onImgChange"
					/>
				</v-col>
			</v-row>
		</v-form>
		<v-row class="ma-2">
			<v-card
				max-width="200"
				variant="outlined"
				v-bind:rounded="false"
				color="rgba(0,0,0,0.6)"
				v-for="(fileItem, index) in boardFiles"
				v-bind:key="index"
				v-on:click="onFileDownload(fileItem.atchFileId, fileItem.orignlFileNm)"
			>
				<template v-slot:text>
					<v-icon>mdi-image-area</v-icon>
					{{ fileItem.orignlFileNm }}
				</template>
			</v-card>
		</v-row>
		<v-row
			justify="center"
			dense
			class="ma-5"
		>
			<v-col cols="6">
				<v-btn
					variant="outlined"
					color="primary"
					size="large"
					width="100%"
					v-bind:disabled="isDisabledBtn"
					v-on:click="onRegistration"
				>
					<v-icon>mdi-text-box-edit</v-icon>
					수정
				</v-btn>
			</v-col>
			<v-col cols="6">
				<v-btn
					color="primary"
					variant="outlined"
					size="large"
					width="100%"
					v-on:click="cancelModifyArticle"
				>
					<v-icon>mdi-cancel</v-icon>
					취소
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>

<script lang="ts">
export default {
	name: 'ModifyBoardDialog',
	components: {},
	data() {
		return {};
	},
	methods: {},
};
</script>
<script setup lang="ts">
export type VForm = {
  validate: () => Promise<any>;
  resetValidation: () => boolean;
  reset: () => void;
};

import { ref, computed, onMounted } from 'vue';
import { useBoardListStore } from '@/domains/example/store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const props = defineProps({
	/**
	 * dialog에 넘겨줄 parameters
	 * @type {Object||null}
	 */
	params: { type: Object || null, required: false, default: null, },
});

const emit = defineEmits([
	'dialog:close',
]);

const boardListStore = useBoardListStore();
const { board_create, board_update, board_detail, files, board_content, } = storeToRefs(boardListStore);
const router = useRouter();

const formValid = ref(false);
const titleTxt = ref('');
const contentsTxt = ref('');
const inputForm = ref(null);
const _no = ref('');

// bbs state의 첨부파일 리스트 관련====================
const boardFiles = computed(() => {
	if (files.value) {
		return files.value.list;
	} else {
		return [];
	}
});

const onFileDownload = (id: string, fileName: string) => {
	boardListStore.ATTACH_FILEDOWNLOAD({
		bbsId: '0000000013',
		nttId: _no.value,
		atchFileId: id,
		option: {
			isSetState: false,
			isSetParams: true,
			responseType: 'blob',
		},
	}).then((res: any) => {
		console.log('!!!FileDownload===', res.data);
		const imgStr = getBlobStr(res.data);
		console.log('!!!FileDownload base64data===', imgStr);
		let imgName = '';
		try {
			imgName = extractDownloadFilename(res);
		} catch {
			imgName = fileName;
		}
		console.log('!!!FileDownload IMGNAME===', imgName);
		downloadURI(imgStr, imgName);
		
	});
};
const getBlobStr = (str: string) => {
	return URL.createObjectURL(new Blob([str,], { type: 'text/plain', }));
};
const downloadURI = (uri: string, name: string) => {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri;
	link.style.display = 'none';
	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(uri);
};
// 다운로드 파일 이름을 추출하는 함수
const extractDownloadFilename = (response: any) => {
	const disposition = response.headers['content-disposition'];
	const fileName = decodeURI(
		disposition
			.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
			.replace(/['"]/g, '')
	);
	return fileName;
};

const isDisabledBtn = computed((): boolean => {
	if (inputForm.value) {
		getValidate();
		if ( formValid.value && titleTxt.value != '' && contentsTxt.value != '') {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
});
const getValidate = async () => {
	const res = await (inputForm.value as unknown as VForm).validate();
	if (res.valid) {
		formValid.value = true;
	} else {
		formValid.value = false;
	}
};

// 이미지 업로드 관련 ======================================
const fileModel = ref([]);
const reqFormData = ref(null) as any;
const onImgChange = (file: any) => {
	if (!file) {
		return;
	}
	console.log('========file 값: ', file);
	console.log('========fileModel 값: ', fileModel.value);

	const formData = new FormData();
	const arr = Array.from(fileModel.value);

	for ( let item of arr ) {
		formData.append('file', item);
	}
	console.log('========formData 값: ', formData);
	reqFormData.value = arr[0];
};

// file 삭제
const removeFileAPI = async (atchId: string) => {
	const result = await boardListStore.ATTACH_FILEDELETE({
		bbsId: '0000000013',
		nttId: _no.value,
		atchFileId: atchId,
		option: {
			isSetState: false,
			headers: { 'Content-Type': 'multipart/form-data', },
		},
	});
	return result;
};

// file 등록
const regFileAPI = async () => {
	console.log('========formData 값: ', reqFormData.value);
	const result = await boardListStore.ATTACH_FILELIST({
		bbsId: '0000000013',
		nttId: 36,
		file: reqFormData.value,
		option: {
			headers: { 'Content-Type': 'multipart/form-data', },
		},
	});
	return result;
};

// board 게시글 수정 API 처리
const regBoardValue = (atchId: string) => {
	boardListStore.BOARD_UPDATE({
		atchFileId: atchId,
		bbsId: '0000000013',
		ntceBgnde: window.dayjs().format('YYYYMMDDHHmm'),
		ntceEndde: window.dayjs().format('YYYYMMDDHHmm'),
		ntcrId: 'test-01@secucen.com',
		ntcrNm: '홍길동',
		nttCn: contentsTxt.value,
		nttId: _no.value,
		nttNo: 0,
		nttSj: titleTxt.value,
		parnts: '41243',
		password: '12345',
		rdcnt: 0,
		option: {
			isSetState: false,
		},
	}).then(() => {
		// 글 수정 등록 되면 atchFileMapping API처리
		if (reqFormData.value && board_update.value) {
			boardListStore.ATTACH_FILEMAPPING({
				bbsId: '0000000013',
				nttId: _no.value,
				atchFileId: atchId,
				option: {
					headers: { 'Content-Type': 'multipart/form-data', },
				},
			});
		}
		reqFormData.value = null;

		// 글등록 완료되면 alert띄우고 list로 이동
		window.ui.alert('글이 수정 되었습니다.').then(() => {
			emit('dialog:close');
		});
	});
};


// 수정 취소하고 Dialog 닫기 이벤트
const cancelModifyArticle = () => {
	emit('dialog:close');
};

// 다시 수정 등록 버튼 클릭 이벤트
const onRegistration = async () => {
	if (reqFormData.value) {
		await removeFileAPI(props.params.atchFileId);
		const result = await regFileAPI();
		if (result) {
			const atchFileId = result.data.bdy.list[0].atchFileId;
			regBoardValue(atchFileId);
		}
	} else {
		regBoardValue(props.params.atchFileId);
	}
};

// 게시글 초기 셋팅
const setDetailValue = (data: any, content: any) => {
	titleTxt.value = data.nttSj;
	contentsTxt.value = content.nttCn;
	reqFormData.value = null;
};

onMounted(() => {
	if (props.params.nttId && board_detail.value && board_content.value) {
		_no.value = props.params.nttId;
		setDetailValue(board_detail.value.data, board_content.value.data);
	}
});
</script>

<style lang='scss' scoped></style>
