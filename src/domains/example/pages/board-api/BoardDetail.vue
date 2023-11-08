<template>
	<div v-if="!mobile">
		<v-card
			width="100%"
			class="pa-4"
		>
			<v-card-item>
				<div>
					<div class="text-overline mb-1">
						<v-chip
							class="mt-2"
							size="small"
							color="primary"
							variant="outlined"
						>
							{{ boardDetail?.bbsNm }}
						</v-chip>
					</div>
					<div class="text-h4 mb-1">
						{{ boardDetail?.nttSj }}
					</div>
					<v-divider class="my-2"/>
					<div class="font-weight-bold">{{ boardDetail?.ntcrNm }}</div>
					<span class="pr-4">
						작성일: {{ execDate(boardDetail?.frstRegisterPnttm as string, 'YYYY.MM.DD hh:mm:ss') }}
					</span>
					<span>조회수: {{ boardDetail?.rdcnt }}</span>
					<v-divider class="my-2"/>
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
							<v-card-text class="pa-2 pt-0">
								<canvas
									v-bind:id="`${fileItem.orignlFileNm}_${fileItem.atchFileId}`"
									width="160"
									height="160"
									style="border:1px solid #000000;" 
								/>
							</v-card-text>
						</v-card>
					</v-row>
					<div
						class="pt-4 pb-4"
					>
						<p class="text-left pa-5"
							v-html="boardContent?.nttCn? boardContent?.nttCn.replace(/\n/g, '<br />'): '내용이 없습니다.'" />
					</div>
				</div>
			</v-card-item>

			<v-card-item>
				<v-btn
					class="mr-2"
					color="primary"
					v-on:click="goEdit"
				>
					<v-icon>mdi-pencil</v-icon>
					수정
				</v-btn>
				<v-btn
					class="mr-2"
					color="primary"
					v-on:click="deletePost"
				>
					<v-icon>mdi-pencil-minus</v-icon>
					삭제
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
	</div>
	<div v-else>
		<h2 style="font-weight:normal;">{{ boardDetail?.nttSj }}</h2>
		<v-row>
			<v-col cols="10">
				<v-chip
					class="mt-2"
					size="small"
					color="primary"
					variant="outlined"
				>
					{{ boardDetail?.bbsNm }}
				</v-chip>
			</v-col>
			<v-col cols="2">
				<v-row
					justify="end"
					no-gutters
					dense
				><v-icon>mdi-dots-vertical-circle-outline</v-icon></v-row>
			</v-col>
		</v-row>
		<v-row>
			<v-list
				lines="three"
				bg-color="rgba(0,0,0,0)"
				width="100%"
			>
				<v-list-item>
					<template v-slot:prepend>
						<v-avatar color="blue">
							<v-icon color="gray">mdi-list-box</v-icon>
						</v-avatar>
					</template>

					<v-list-item-title
						class="font-weight-bold"
						v-html="getContentTitle(boardDetail?.frstRegisterNm || '', boardDetail?.frstRegisterPnttm || '')"
					/>
					<v-list-item-subtitle>
						{{ `작성자: ${boardDetail?.ntcrNm || ' - '}` }}
					</v-list-item-subtitle>
					<v-list-item-subtitle>
						{{ `첨부파일: ${boardDetail?.ntcrNm || ' - '}` }}
						<v-icon color="gray">mdi-chevron-down</v-icon>
					</v-list-item-subtitle>

					<template v-slot:append>
						<v-btn
							color="grey-lighten-1"
							icon="mdi-dots-horizontal"
							variant="text"
						/>
					</template>
				</v-list-item>
			</v-list>
			<p class="text-left pa-5"
				v-html="boardContent?.nttCn? boardContent?.nttCn.replace(/\n/g, '<br />'): '내용이 없습니다.'" />
		</v-row>
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
				<v-card-text class="pa-2 pt-0">
					<canvas
						v-bind:id="`${fileItem.orignlFileNm}_${fileItem.atchFileId}`"
						width="160"
						height="160"
						style="border:1px solid #000000;" 
					/>
				</v-card-text>
			</v-card>
		</v-row>
		<v-row
			justify="center"
			dense
			class="mt-5"
		>
			<v-col cols="4">
				<v-btn
					variant="outlined"
					color="primary"
					size="large"
					width="100%"
					v-on:click="goEditDialog"
				>
					<v-icon>mdi-text-box-edit</v-icon>
					수정
				</v-btn>
			</v-col>
			<v-col cols="4">
				<v-btn
					color="primary"
					variant="outlined"
					size="large"
					width="100%"
					v-on:click="deletePost"
				>
					<v-icon>mdi-pencil-minus</v-icon>
					삭제
				</v-btn>
			</v-col>
			<v-col cols="4">
				<v-btn
					color="primary"
					variant="outlined"
					size="large"
					width="100%"
					v-on:click="goList"
				>
					<v-icon>mdi-list-box</v-icon>
					목록으로
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
export default {
	name: 'BoardDetailPage',
	components: {},
	data() {
		return {};
	},
	methods: {},
};
</script>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useBoardListStore } from '@/domains/example/store';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { useDisplay } from 'vuetify';

import ModifyBoardDialog from '@/domains/example/components/board-api/ModifyBoardDialog.vue';

import { useDrawOnCanvas, useDownloadFile } from '@/domains/example/composables/files';

const { mobile, } = useDisplay();

const boardListStore = useBoardListStore();
const router = useRouter();
const route = useRoute();
const _no = ref('');
const { board_detail, files, board_content, } = storeToRefs(boardListStore);
// bbs detail state를 이용한 computed
const boardDetail = computed(() => {
	return board_detail.value?.data;
});
// bbs content state를 이용한 computed
const boardContent = computed(() => {
	return board_content.value?.data;
});
// bbs state의 첨부파일 리스트 가져오기
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
		useDownloadFile(res);
	});
};

// 날짜 가공
const execDate = (dateString: string, format: string): string => {
	return dayjs(dateString).format(format);
};

// 게시글 타이틀 조합
const getContentTitle = (title: string, date: string) => {
	const name = title || '-';
	const d = execDate(date, 'YYYY.MM.DD');
	return `${name} <span style="font-weight: normal;font-size: 0.875rem;">- ${d}</span>`;
};


const callBoardDetailApi = () => {
	_no.value = route.params.no as string;
	boardListStore.BOARD_DETAIL({
		bbsId: '0000000013',
		nttId: _no.value,
		option: {
			method: 'get', 
		}, 
	}).then(() => {
		// 글 상세 컨텐츠 가져오기
		boardListStore.BOARD_CONTENT({
			bbsId: '0000000013',
			nttId: _no.value,
			option: {
				method: 'get', 
			},
		});

		// 첨부 파일 가져오기
		boardListStore.FILES({
			bbsId: '0000000013',
			nttId: _no.value,
			option: {
				method: 'get', 
			},
		}).then((res: any) => {
			// 첨부파일 이미지 화면 canvas에 보이기
			getFileInfo(res.data.bdy.list);
		});
	});
};

const getFileInfo = (list: any[]) => {
	list.forEach((item) => {
		boardListStore.ATTACH_FILEDOWNLOAD({
			bbsId: '0000000013',
			nttId: _no.value,
			atchFileId: item.atchFileId,
			option: { isSetState: false, isSetParams: true, responseType: 'blob', },
		}).then((res: any) => {
			const canvas = document.getElementById(`${item.orignlFileNm}_${item.atchFileId}`) as HTMLCanvasElement;
			useDrawOnCanvas(canvas, res.data, 160, 160);
		});
	});
};


// 글 수정 화면으로 이동 이벤트
const goEdit = () => {
	// 수정페이지 이동
	if (_no.value !== '') {
		const route1 = {
			name: 'BoardModify',
			params: {
				no: _no.value,
			},
		};
		router.push(route1);
	}
};

// 수정버튼 클릭 이벤트
const goEditDialog = () => {
	let atchId = null;
	try {
		atchId = files?.value?.list[0].atchFileId as string;
	} catch {
		atchId = '';
	}
	window.ui.dialog(ModifyBoardDialog, {
		title: '게시글 수정',
		fullscreen: true,
		params: { 
			nttId: _no.value,
			atchFileId: atchId,
		},
	}).then((res: any) => {
		console.log('UI Dialog then result!!!: ', res);
		if (!res) {
			// 상세보기 api 호출
			callBoardDetailApi();
		}
	});
};

// 목록으로 이동 클릭 이벤트
const goList = () => {
	router.push('/example/board-list');
};

// 글 삭제 버튼 클릭 이벤트
const deletePost = () => {

	window.ui.confirm('글을 삭제 하시겠습니까?', {
		confirmButton: '삭제',
		cancelButton: '취소',
	}).then((res) => {
		if (res && _no.value !== '') {
			boardListStore.BOARD_DELETE({
				bbsId: '0000000013',
				nttId: _no.value,
				option: {
					method: 'get', 
				}, 
			}).then(() => {
				// 삭제 완료되면 alert띄우고 list로 이동
				window.ui.alert('글이 삭제 되었습니다.').then(() => {
					router.push('/example/board-list');
				});
			});
		}
	});
};

onMounted(() => {
	callBoardDetailApi();
});
</script>

<style lang='scss' scoped></style>
