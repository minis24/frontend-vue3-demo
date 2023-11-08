<template>
	<transition name="modal">
		<div class="modal-mask g-dialog-mask">
			<div class="modal-wrapper g-dialog-centered">
				<div class="modal-container shadow border-none radius-2"
					v-bind:class="[modalAnimate]"
					v-on:animationend="animationend"
				>
					<div class="modal-header"
						v-if="title"
						v-html="title"
					/>
					<div class="modal-body text-center"
						v-html="msg"
					/>
					<v-divider />
					<div class="modal-footer bg-white justify-content-between pt-3">
						<ui-button
							large
							v-on:click="onOk"
						>{{ confirmButton }}</ui-button>
						<v-spacer />
						<ui-button
							large
							v-on:click="onCancel"
						>{{ cancelButton }}</ui-button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'UiConfirm',
	data() {
		return {};
	},
});
</script>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';

const inst = getCurrentInstance();
const result = ref(false);

defineProps({
	/**
	 * confirm에 표시될 내용 문구를 입력합니다.
	 * @type {String||''}
	 */
	msg: { type: String, required: false, default: '', },
	/**
	 * confirm에 표시될 타이틀 문구를 입력합니다.
	 * @type {String||''}
	 */
	title: { type: String, required: false, default: '', },
	/**
	 * confirm창에 confirm버튼 텍스트에 적용할 내용을 입력합니다.
	 * @type {String||''}
	 */
	confirmButton: { type: String, required: false, default: '확인', },
	/**
	 * confirm창에 cancel버튼 텍스트에 적용할 내용을 입력합니다.
	 * @type {String||''}
	 */
	cancelButton: { type: String, required: false, default: '취소', },
});

const modalAnimate = ref('modal-show');

const onOk = () => {
	result.value = true;
	modalAnimate.value = 'modal-close';
};
const onCancel = () => {
	result.value = false;
	modalAnimate.value = 'modal-close';
};

const animationend = (event: Event) => {
	console.log('-=-=-=-=> confirm animationend: ', modalAnimate.value);
	if (modalAnimate.value === 'modal-close') {
		(event.currentTarget as HTMLElement).style.opacity = '0';
		window.ui.confirm().close(inst?.vnode, result.value);
	}
};
</script>
