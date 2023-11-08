<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-card
					title="게시글 작성"
					width="100%"
					class="pa-4"
				>
					<v-card-text>
						<v-form
							ref="inputForm"
							v-on:submit.prevent="() => {}"
						>
							<v-row no-gutters>
								<v-col
									cols="12"
									md="12"
								>
									<div class="text-overline mb-1">
										<v-chip
											class="mt-2 mb-3"
											size="small"
											color="primary"
											variant="outlined"
										>
											공지사항 게시판
										</v-chip>
									</div>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<!-- 👉 title -->
								<v-col
									cols="12"
									md="12"
								>
									<v-text-field
										label="제목 입력"
										placeholder="제목 입력"
										v-model="titleTxt"
									/>
								</v-col>
								<!-- 👉 글 내용 -->
								<v-col
									cols="12"
									md="12"
								>
									<v-textarea
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
										multiple
										prepend-icon="mdi-camera"
										v-model:model-value="fileModel"
										v-on:change="onImgChange"
									/>
								</v-col>
							</v-row>
							<v-row
								dense
								v-if="imgUrl !== ''"
							>
								<v-col
									cols="12"
									class="pa-5"
								>
									<v-img
										v-bind:src="imgUrl"
										width="300px"
									/>
								</v-col>
							</v-row>
						</v-form>
					</v-card-text>
					<v-card-item>
						<v-btn
							class="mr-2"
							v-bind:disabled="isDisabledBtn"
							color="primary"
							v-on:click="onRegistration"
						>
							<v-icon>mdi-pencil</v-icon>
							등록
						</v-btn>
						<v-btn
							class="mr-2"
							color="primary"
							v-on:click="initContents"
						>
							<v-icon>mdi-notification-clear-all</v-icon>
							초기화
						</v-btn>
						<v-btn
							class="mr-2"
							color="primary"
							v-on:click="goList"
						>
							<v-icon>mdi-list-box</v-icon>
							목록으로
						</v-btn>
					</v-card-item>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
export default {
	name: 'WritingBoard',
	components: {},
	props: {},
	methods: {},
};
</script>
<script setup lang="ts">
export type VForm = {
  validate: () => Promise<any>;
  resetValidation: () => boolean;
  reset: () => void;
};

import { ref, computed } from 'vue';
import { useBoardListStore } from '@/domains/example/store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const boardListStore = useBoardListStore();
const { board_create, } = storeToRefs(boardListStore);
const router = useRouter();

const inputForm = ref(null);
const formValid = ref(false);
const titleTxt = ref('');
const contentsTxt = ref('');

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
const imgUrl = ref('');
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
		imgUrl.value = URL.createObjectURL(item);
	}
	console.log('========formData 값: ', formData);
	reqFormData.value = arr[0];
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

// board 게시글 등록 API 처리
const regBoardValue = (atchId: string) => {
	boardListStore.BOARD_CREATE({
		atchFileId: atchId,
		bbsId: '0000000013',
		ntceBgnde: window.dayjs().format('YYYYMMDDHHmm'),
		ntceEndde: window.dayjs().format('YYYYMMDDHHmm'),
		ntcrId: 'test-01@secucen.com',
		ntcrNm: '홍길동',
		nttCn: contentsTxt.value,
		nttId: '36',
		nttNo: 0,
		nttSj: titleTxt.value,
		parnts: '41243',
		password: '12345',
		rdcnt: 0,
		option: {
			isSetState: false,
		},
	}).then(() => {
		// 글등록 되면 atchFileMapping API처리
		if (reqFormData.value && board_create.value) {
			const nttId = board_create.value.data.nttId;
			boardListStore.ATTACH_FILEMAPPING({
				bbsId: '0000000013',
				nttId,
				atchFileId: atchId,
				option: {
					headers: { 'Content-Type': 'multipart/form-data', },
				},
			});
		}
		reqFormData.value = null;

		// 글등록 완료되면 alert띄우고 list로 이동
		window.ui.alert('글이 등록 되었습니다.').then(() => {
			router.push('/example/board-list');
		});
	});
};


// 입력내용 초기화 버튼 클릭 이벤트
const initContents = () => {
	titleTxt.value = '';
	contentsTxt.value = '';
	fileModel.value = [];
	imgUrl.value = '';
	reqFormData.value = null;
};

// 등록 버튼 클릭 이벤트
const onRegistration = async () => {
	if (reqFormData.value) {
		const result = await regFileAPI();
		if (result) {
			const atchFileId = result.data.bdy.list[0].atchFileId;
			regBoardValue(atchFileId);
		}
	} else {
		regBoardValue('');
	}
};

const goList = () => {
	router.push('/example/board-list');
};
</script>

<style lang='scss' scoped></style>
