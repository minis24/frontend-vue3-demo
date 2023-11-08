<template>
	<div>
		<VRow>
			<VCol
				md="12"
				cols="12"
			>
				<VCard>
					<VCardItem>
						<VCardTitle><h4>기본 예제</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						버튼을 누르면 confirm창이 뜹니다.
					</VCardText>

					<VCardText>
						<VBtn
							class="bg-info"	
							v-on:click="onDefault"
						>show confirm</VBtn>
					</VCardText>
					<VDivider />
					<VCardItem>
						<VCardTitle>code</VCardTitle>
					</VCardItem>
					<VCardText>
						<pre>
							<code
								class="language-javascript"
							>
window.ui.confirm('confirm 예제 입니다.&lt;br /&gt;확인 하시겠습니까?')
	.then((result) => {
		console.log(result);
	});</code>
						</pre>
					</VCardText>
				</VCard>
			</VCol>
			<VCol
				md="12"
				cols="12"
			>
				<VCard>
					<VCardItem>
						<VCardTitle><h4>'확인', '취소' 버튼명 수정.</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						버튼을 누르면 confirm창이 뜹니다.<br />
						confirm창은 기본으로 '확인', '취소' 버튼을 가진다.<br />
						각 버튼 텍스트를 다르게 설정할 수 있다.<br />
						<strong>confirmButton : </strong> '확인' 버튼의 텍스트를 변경.<br />
						<strong>cancelButton : </strong> '취소' 버튼의 텍스트를 변경.
					</VCardText>

					<VCardText>
						<VBtn
							class="bg-info"	
							v-on:click="onChangeBtnNm"
						>show confirm</VBtn>
					</VCardText>
					<VDivider />
					<VCardItem>
						<VCardTitle>code</VCardTitle>
					</VCardItem>
					<VCardText>
						<pre>
							<code
								class="language-javascript"
							>
window.ui.confirm('confirm 예제 입니다.&lt;br /&gt;확인 하시겠습니까?', {
	confirmButton: '등록',
	cancelButton: '등록취소',
}).then((result: boolean) => {
	console.log(result);
})</code>
						</pre>
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
	</div>
</template>

<script lang="ts">
export default {
	name: 'UiConfirmDemo',
	components: {},
	props: {},
	data() {
		return {};
	},
	methods: {},
};
</script>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Prism from 'prismjs';

const callHighlightAll = () => {
	nextTick(() => {
		Prism.highlightAll();
	});
};

const onDefault = () => {
	window.ui.confirm('confirm 예제 입니다.<br />확인 하시겠습니까?')
		.then((result: boolean) => {
			console.log(result);
		});
};

const onChangeBtnNm = () => {
	window.ui.confirm('confirm 예제 입니다.<br />확인 하시겠습니까?', {
		confirmButton: '등록',
		cancelButton: '등록취소',
	}).then((result: boolean) => {
		console.log(result);
	});
};

onMounted(() => {
	callHighlightAll();
});
</script>

<style lang='scss' scoped></style>
