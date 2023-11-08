<template>
	<v-row>
		<v-col cols="12">
			<template v-if="!mobile">
				<v-card
					title="Board List"
				>
					<v-card-item>
						<v-table>
							<thead>
								<tr>
									<th
										class="text-center text-uppercase font-weight-bold"
										style="width:130px"
									>
										글번호
									</th>
									<th
										class="text-center text-uppercase font-weight-bold"
										style="width:150px"
									>
										게시판명
									</th>
									<th class="text-center text-uppercase font-weight-bold">
										제목
									</th>
									<th class="text-center text-uppercase font-weight-bold">
										작성자
									</th>
									<th class="text-center text-uppercase font-weight-bold">
										작성일
									</th>
									<th class="text-center text-uppercase font-weight-bold">
										조회
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="item in boardList"
									v-bind:key="item.nttNo"
									v-on:click="goDetail(item.nttId, $event)"
								>
									<td class="text-center">{{ item.nttId }}</td>
									<td class="text-center">{{ item.bbsNm }}</td>
									<td class="text-left pl-6">
										{{ item.nttSj }}
									</td>
									<td class="text-center">
										{{ item.ntcrId }}
									</td>
									<td class="text-center">
										{{ execDate(item.frstRegisterPnttm, 'YYYY년 MM월 DD일') }}
									</td>
									<td class="text-center">
										{{ item.rdcnt }}
									</td>
								</tr>
							</tbody>
						</v-table>
						<v-pagination
							v-bind:length="paginationLength"
							v-bind:model-value="currentPageNo"
							v-bind:start="1"
							v-bind:total-visible="rowsPerPage"
							v-on:update:model-value="updatePagination"
						/>
					</v-card-item>
					<v-card-item>
						<v-btn
							color="primary"
							v-on:click="goWriting"
						>
							<v-icon>mdi-pencil</v-icon>
							글쓰기
						</v-btn>
					</v-card-item>
				</v-card>
			</template>
			<template v-else>
				<v-list
					lines="three"
				>
					<v-list-item
						v-for="item in mobileAccumulateList"
						v-bind:key="item.nttId"
						v-on:click="goDetail(item.nttId, $event)"
					>
						<template v-slot:prepend>
							<v-avatar color="blue">
								<v-icon color="gray">mdi-list-box</v-icon>
							</v-avatar>
						</template>

						<v-list-item-title
							class="font-weight-bold"
							v-html="getListTitle(item.nttSj, item?.frstRegisterPnttm)"
						/>
						<v-list-item-subtitle
							v-html="getSubTitle(item.ntcrNm, item.nttCn)"
						/>

						<template v-slot:append>
							<v-btn
								color="grey-lighten-1"
								icon="mdi-information"
								variant="text"
							/>
						</template>
					</v-list-item>
				</v-list>
			</template>
		</v-col>
	</v-row>
	<v-row
		justify="center"
		class="pb-4"
		v-if="mobile && isShowBtnMore"
	>
		<v-btn
			color="blue"
			v-on:click="updatePagination(currentPageNo + 1)"
		>
			더보기
		</v-btn>
	</v-row>
	<v-row
		justify="end"
		v-if="mobile"
	>
		<v-btn
			color="success"
			icon="mdi-pencil"
			size="x-large"
			position="fixed"
			class="justify-space-between write-btn-position"
			v-on:click="goWritingDialog"
		/>
	</v-row>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed, inject } from 'vue';
import { useBoardListStore } from '@/domains/example/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

import WritingBoardDialog from '@/domains/example/components/board-api/WritingBoardDialog.vue';

export default defineComponent({
	name: 'BoardList',
});
</script>
<script setup lang="ts">

const { mobile, } = useDisplay();
const router = useRouter();

const boardListStore = useBoardListStore();
const dayjs = inject('dayjs') as any;
const spa = inject('spa') as any;

// 날짜 가공
const execDate = (dateString: string, format: string): string => {
	return dayjs(dateString).format(format);
};

// board list 상태값 가져오기
const { board_list, } = storeToRefs(boardListStore);
// list state를 이용한 computed
const boardList = computed(() => {
	return board_list.value?.list;
});
// 모바일용 누적 board list 
const mobileAccumulateList = ref([] as any[]);
const setMobileAccumnlateList = (init: boolean) => {
	const newList = boardList.value || [];
	if (init) {
		mobileAccumulateList.value = newList;
	} else {
		mobileAccumulateList.value = mobileAccumulateList.value.concat(newList);
	}
};

// list 타이틀 조합
const getListTitle = (title: string, date: string) => {
	const name = title || '';
	const d = execDate(date, 'YYYY.MM.DD');
	return `${name} <span style="font-weight: normal;font-size: 0.875rem;">- ${d}</span>`;
};
// list 제목 + 내용
const getSubTitle = (title: string, content: string) => {
	return `<span class="font-weight-bold">${title || '게시자명 없음'}</span><br />${content || '게시글 내용 없음'}`;
};


// 상세페이지 이동 이벤트
const goDetail = (no: string, event: Event) => {
	// 상세페이지 이동
	const route1 = {
		name: 'BoardDetailNo',
		params: {
			no,
		},
	};
	spa.router.push(route1);
};

// 글쓰기 이동 이벤트
const goWriting = () => {
	// window.spa.router를 사용하면 useRouter를 import할 필요 없이 사용만 하면 된다.
	spa.router.push('/example/writing-board');
};

// 다이얼로그창 글쓰기 띄우기
const goWritingDialog = () => {
	window.ui.dialog(WritingBoardDialog, {
		title: '게시글 작성',
		fullscreen: true,
	}).then((res: any) => {
		console.log('UI Dialog then result!!!: ', res);
		if (!res) {
			console.log('callBoardApi!!!: -------------');
			callBoardApi(true);
		}
	});
};

const currentPageNo = ref(1);
const rowsPerPage = ref(10);
const totalCount = computed((): number => {
	const cnt = board_list.value?.data.totalListCount || 0;
	return cnt as number;
});
const paginationLength = computed(() => {
	if ( totalCount.value <= 0 ) {
		return 0;
	} else {
		return Math.ceil(totalCount.value / rowsPerPage.value);
	}
});

const updatePagination = (value: any) => {
	console.log('pagination return value:::: ', value);
	currentPageNo.value = value;
	callBoardApi(false);
};
// 모바일 더보기 버튼 숨길지 여부
const isShowBtnMore = computed(() => {
	const list = board_list.value?.list || [];
	if ( list.length < rowsPerPage.value ) {
		return false;
	} else {
		return true;
	}
});

const callBoardApi = async (init: boolean) => {
	// board list api 호출
	await boardListStore.BOARD_LIST({
		bbsId: '0000000013',
		currentPageNo: currentPageNo.value,
		rowsPerPage: rowsPerPage.value,
		pagePerGroup: '1',
		option: { method: 'get', }, 
	}).then(() => {
		if (mobile.value) {
			setMobileAccumnlateList(init);
		}
	});
};

onMounted(() => {
	callBoardApi(true);
});
</script>

<style lang='scss' scoped>
th {
	font-weight: bold !important;
}
.write-btn-position {
	bottom: 70px;
	right: 20px;
}
table tr:hover {
  background-color:#eff6fd;
}
</style>
