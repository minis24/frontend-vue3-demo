<template>
	<v-navigation-drawer
		app
		fixed
		v-model="showMenu"

	>
		<v-treeview
			v-bind:items="treeItems"
		>
			<template v-slot:prepend="{ item }">
				<v-icon
					v-if="item.children"
					v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
				/>
			</template>
		</v-treeview>
		<v-sheet rounded="lg">
			<v-list rounded="lg">

				<v-img
					width="150"
					class="pa-1 ml-4"
					v-bind:src="logoImg"
				/>
				<p class="logo_text">SECUCEN</p>

				<v-divider class="my-2"/>

				<v-list-item
					v-for="(item, i) in items"
					v-bind:key="i"
					v-on:click="clickSNBHandler( item.path )"
				>
					<v-list-item-title>
						<v-icon class="mr-2">{{ item.icon }}</v-icon>
						{{ item.text }}
					</v-list-item-title>
				</v-list-item>

				<section-title v-bind:item="{heading: 'UI Component'}" />

				<v-list-item
					v-for="(item, i) in uiCompItems"
					v-bind:key="i"
					v-on:click="clickSNBHandler( item.path )"
				>
					<v-list-item-title>
						<v-icon class="mr-2">{{ item.icon }}</v-icon>
						{{ item.text }}
					</v-list-item-title>
				</v-list-item>

				<section-title v-bind:item="{heading: '기타'}" />

				<v-list-item
					v-for="(item, i) in etcItems"
					v-bind:key="i"
					v-on:click="clickSNBHandler( item.path )"
				>
					<v-list-item-title>
						<v-icon class="mr-2">{{ item.icon }}</v-icon>
						{{ item.text }}
					</v-list-item-title>
				</v-list-item>

				<section-title v-bind:item="{heading: '서비스 이동'}" />

				<v-list-item
					v-for="(item, i) in serviceItems"
					v-bind:key="i"
				>
					<v-list-item-title>
						<v-icon class="mr-2">{{ item.icon }}</v-icon>
						<a
							v-bind:href="item.link"
							class="link-a"
						>{{ item.text }}</a>
					</v-list-item-title>
				</v-list-item>

			</v-list>
		</v-sheet>
	</v-navigation-drawer>
	<v-app-bar
		app
		fixed
		dark
		color="primary"
	>
		<v-icon
			size="40"
			class="ml-3"
			v-if="isShowBack"
			v-on:click="goBack"
		>
			mdi-chevron-left
		</v-icon>
		<v-app-bar-nav-icon v-on:click.stop="toggleMenu"/>

		<v-toolbar-title>{{ topRootTitle }}</v-toolbar-title>
		<v-icon
			size="30"
			class="mr-4"
			v-on:click="onLogin"
		>{{ `mdi-${btnLoginTxt}-variant` }}</v-icon>
	</v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TopToolbar',
	data() {
		return {};
	},
});
</script>
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useAppRootStore } from '@/app/store';
import { useBoardListStore } from '@/domains/example/store';
import { storeToRefs } from 'pinia';
import SectionTitle from '@/app/components/layout/SectionTitle.vue';

const appRootStore = useAppRootStore();

// top area ==========================================
const showMenu = ref(false);
const { topRootTitle, isShowBack, } = storeToRefs(appRootStore);

const toggleMenu = () => {
	showMenu.value = !showMenu.value;
};
const goBack = () => {
	console.log('Click Go Back button!!!');
	window.spa.router.go(-1);
};

// 로그인 관련 =======================================
const boardListStore = useBoardListStore();
const { needLogin, } = storeToRefs(boardListStore);
const btnLoginTxt = computed((): 'login'|'logout' => {
	if (needLogin.value) {
		return 'login';
	} else {
		return 'logout';
	}
});
// 로그인, 로그아웃 버튼 클릭
const onLogin = () => {
	if (btnLoginTxt.value === 'login') {
		window.spa.router.push('/example/log-in');
	} else {
		
		needLogin.value = true;
		// cookie에 있는 값 삭제
		window.spa.utils.delItemLocalStorage('access_token');
		window.spa.utils.delItemLocalStorage('refresh_token');
		window.spa.router.push('/');
		window.location.reload();
			
	}
};

// SNB area ==========================================
const logoImg = new URL('@/assets/images/img_logo_secucen.png', import.meta.url).href;
const items = reactive([
	{ text: 'Home', icon: 'mdi-home', path: '/', },
	{ text: 'BOARD API', icon: 'mdi-api', path: '/example/board-list', },
]);
const uiCompItems = reactive([
	//{ text: 'UI Component', icon: 'mdi-video-input-component', path: '/example/ui-component-ex', },
	{ text: 'ui-alert', icon: 'mdi-message-alert', path: '/ui-demo/alert-demo', },
	{ text: 'ui-confirm', icon: 'mdi-message-check', path: '/ui-demo/confirm-demo', },
	{ text: 'ui-dialog', icon: 'mdi-message-bulleted', path: '/ui-demo/dialog-demo', },
	{ text: 'ui-chip', icon: 'mdi-credit-card-chip', path: '/ui-demo/chip-demo', },
]);
const etcItems = reactive([
	{ text: 'Form Validate', icon: 'mdi-form-textbox', path: '/example/form-validate', },
]);
const serviceItems = reactive([
	{ text: 'go DEMO2', icon: 'mdi-washing-machine', link: 'http://front.dfpcen.com/demo2/#/ui-demo/alert-demo', },
]);
const clickSNBHandler = (path: string) => {
	window.spa.router.push(path);
};

const treeItems = reactive([
	{
		id: 1,
		name: 'Home',
		icon: 'mdi-home',
		path: '/',
	},
	{
		id: 1,
		name: 'UI Component',
		icon: 'mdi-video-input-component',
		path: '/example/ui-component-ex',
		children: [
			{
				id: 2,
				name: 'Alert',
				icon: 'mdi-comment-alert',
				path: '/',
			},
		],
	},
]);
</script>

<style lang='scss' scoped>
.logo_text {
	position: absolute;
	left: 60px;
	top: 16px;
	font-size: 19px;
}
.link-a {
	color: inherit;
  text-decoration: none;
}
</style>
