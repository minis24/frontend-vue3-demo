<template>
	<div class="pa-4">
		<div><h1>UI Component</h1></div>
		<v-form v-on:submit.prevent="">
			<v-container class="grey lighten-5">
				<v-row gutters>
					<v-col
						cols="12"
						sm="4"
					>
						<ui-button class="mr-4">ui 전역 버튼</ui-button>
					</v-col>
				</v-row>
				<v-row gutters>
					<v-col
						cols="12"
						sm="4"
					>
						<ui-button
							class="mr-4"
							v-on:click.stop="openAlert"
						>
							open alert
						</ui-button>
						<ui-button
							v-on:click.stop="openConfirm"
						>
							open confirm
						</ui-button>
						<!--<v-icon icon="$home-on"/>-->
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, h, inject } from 'vue';

export default defineComponent({
	name: 'UiComponentEx',
	data() {
		return {};
	},
	methods: {
		openAlert2() {
			//this.$spa.utils.hashStringTo32BitInteger('aaaaa');
			window.ui.alert('alert테스트 입니다.<br />잘 됩니다.');
		},
	},
	render() {
		return h('span', { class: 'g-popup-container', style: 'z-index:9999999;', });
	},
});
</script>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, type ComponentCustomProperties } from 'vue';
import { useRouter } from 'vue-router';
import type { IUi } from '@types';

const router = useRouter();

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;
const disabled = ref(true);
let ui: IUi|null = null;

// alert관련
const openAlert = () => {
	//self.$ui.alert('등록 되었습니다.', { title: '테스트 타이틀', }).then((res: any) => {
	//	console.log('fjdk==res::', res);
	//});

	//router.push('/final-ex/news-page');
	//window.ui.alert('alert테스트 입니다.<br />잘 됩니다.');

	
	(ui as IUi).alert('alert테스트 입니다.<br />잘 됩니다.', {
		type: 'success',
	});

	//setTimeout(() => {
	//	window.ui.alert({ close: true, });
	//}, 2000);
};

// confirm관련
const openConfirm = () => {
	//window.ui.confirm('confirm테스트 입니다.<br />잘 되나요?').then((result: any) => {
	//	console.log('confirm의 then result값:: ', result);
	//});
	confirmTest();
};

const confirmTest = async () => {
	console.log('confirmTest function 1');
	const result = await window.ui.confirm(
		'confirm테스트 입니다.<br />잘 되나요?',
		{
			confirmButton: 'Let\'s go',
			cancelButton: 'Never mind',
		}
	);
	console.log('confirmTest function 2');
	console.log('confirm의 then result값:: ', result);

};

onMounted(() => {
	ui = inject('ui') as IUi;
});

</script>

<style lang='scss' scoped></style>
