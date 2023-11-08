<template>
	<transition name="modal">
		<div class="modal-mask g-dialog-mask">
			<div class="modal-wrapper g-dialog-centered">
				<div class="modal-container shadow border-none radius-2"
					v-bind:class="[modalAnimate]"
					v-on:animationend="animationend"
				>
					<v-icon
						class="text-success"
						v-if="type==='success'">mdi-check-circle</v-icon>
					<v-icon
						class="text-info"
						v-if="type==='info'">mdi-information</v-icon>
					<v-icon
						class="text-warning"
						v-if="type==='warning'">mdi-alert-circle</v-icon>
					<v-icon
						class="text-error"
						v-if="type==='error'">mdi-close-circle</v-icon>
					<div class="modal-header"
						v-if="title"
						v-html="title"
					/>
					<div class="modal-body text-center"
						v-html="msg"
					/>
					<v-divider />
					<div class="modal-footer bg-white justify-content-between pt-4">
						<ui-button v-on:click="close">확인</ui-button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'UiAlert',
});
</script>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';

const inst = getCurrentInstance();

defineProps({
	/**
	 * alert에 표시될 상태 타입을 입력합니다.
	 * @type {'success'|'info'|'warning'|'error'}
	 */
	type: { type: String, required: false, default: '', },
	/**
	 * alert에 표시될 내용 문구를 입력합니다.
	 * @type {String||''}
	 */
	msg: { type: String, required: false, default: '', },
	/**
	 * alert에 표시될 타이틀 문구를 입력합니다.
	 * @type {String||''}
	 */
	title: { type: String, required: false, default: '', },
});

const modalAnimate = ref('modal-show');

const close = () => {
	modalAnimate.value = 'modal-close';
};

const animationend = (event: Event) => {
	if (modalAnimate.value === 'modal-close') {
		(event.currentTarget as HTMLElement).style.opacity = '0';
		window.ui.alert().innerClose(inst?.vnode);
	}
};
</script>
