<template>
	<v-dialog
		transition="dialog-bottom-transition"
		v-bind:width="fullscreen? '100%': 'auto'"
		v-bind:fullscreen="fullscreen"
		v-bind:scrim="false"
		v-model="dialog"
	>
		<template v-slot:default="{ }">
			<template v-if="component">
				<v-toolbar
					color="#fff"
					flat
					class="fixed-bar"
				>
					<v-btn
						icon
					>
						<v-icon
							v-on:click="dialogClose"
						>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>{{ title }}</v-toolbar-title>
					<v-spacer/>
					<v-toolbar-items>
						<!--<v-btn
							variant="text"
						>
							Save
						</v-btn>-->
					</v-toolbar-items>
				</v-toolbar>
				<component
					v-bind:params="params?params:{}"
					v-bind:is="component"
					v-on:dialog:close="dialogClose"
				/>
			</template>
			<template v-else>
				<v-card>
					<v-toolbar
						v-bind:title="title"
						v-if="title"
					>
						<v-btn
							icon
						>
							<v-icon
								v-on:click="dialogClose"
							>mdi-close</v-icon>
						</v-btn>
					</v-toolbar>
					<v-card-text>
						<div
							v-html="msg"
						/>
					</v-card-text>
					<v-card-actions class="justify-end">
						<v-btn
							color="primary"
							v-on:click="close"
						>Close</v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</template>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'UiDialog',
	data() {
		return {};
	},
});
</script>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
//import type { VNode } from 'vue';

let dialog = ref(true);

const inst = getCurrentInstance();

defineProps({
	/**
	 * dialog에 표시될 내용 문구를 입력합니다.
	 * @type {String||''}
	 */
	msg: { type: String, required: false, default: '', },
	/**
	 * dialog에 표시될 타이틀 문구를 입력합니다.
	 * @type {String||''}
	 */
	title: { type: String, required: false, default: '', },
	/**
	 * dialog에 적용할 컴포넌트
	 * @type {Component||''}
	 */
	component: { required: false, default: null, },
	/**
	 * dialog를 화면 전체 보기
	 * @type {Boolean||false}
	 */
	fullscreen: { type: Boolean, required: false, default: false, },
	/**
	 * dialog에 넘겨줄 parameters
	 * @type {Object||null}
	 */
	 params: { type: Object || null, required: false, default: null, },
});

const modalAnimate = ref('modal-show');

const close = () => {
	dialog.value = false;
};

const dialogClose = () => {
	modalAnimate.value = 'modal-close';
	return window.ui.dialog().close(inst?.vnode, false);
	//close();
};

const animationend = (event: Event) => {
	if (modalAnimate.value === 'modal-close') {
		(event.currentTarget as HTMLElement).style.opacity = '0';
		window.ui.dialog().close(inst?.vnode);
	}
};
</script>

<style lang="scss" scoped>
.fixed-bar {
	position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0;
  z-index: 2;
}
</style>
