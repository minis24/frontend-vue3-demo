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
						버튼을 누르면 alert창이 뜹니다.
					</VCardText>

					<VCardText>
						<VBtn
							class="bg-info"	
							v-on:click="onDefault"
						>show alert</VBtn>
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
window.ui.alert('alert 예제 입니다.!');</code>
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
						<VCardTitle><h4>title 설정</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						alert창의 <strong>제목(title)</strong>을 적용 합니다.
					</VCardText>

					<VCardText>
						<VBtn
							class="bg-info"	
							v-on:click="onTitle"
						>show alert</VBtn>
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
window.ui.alert(
	'title 예제 입니다.!',
	{
		title: '제목',
	}
);</code>
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
						<VCardTitle><h4>유형별 Alert</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						<strong>success</strong> : <span style="color:#56ca00;font-weight:bold;">success</span> 색상의 아이콘이 표시됩니다.<br />
						<strong>info</strong> : <span class="text-info"
							style="font-weight:bold;">info</span> 색상의 아이콘이 표시됩니다.<br />
						<strong>warning</strong> : <span class="text-warning"
							style="font-weight:bold;">warning</span> 색상의 아이콘이 표시됩니다.<br />
						<strong>error</strong> : <span class="text-error"
							style="font-weight:bold;">error</span> 색상의 아이콘이 표시됩니다.<br />
						
					</VCardText>

					<VCardText>
						<div class="demo-space-x">
							<VBtn
								class="bg-success ma-1"
								v-on:click="onType(1)"
							>success alert</VBtn>
							<VBtn
								class="bg-info ma-1"
								v-on:click="onType(2)"
							>info alert</VBtn>
							<VBtn
								class="bg-warning ma-1"
								v-on:click="onType(3)"
							>warning alert</VBtn>
							<VBtn
								class="bg-error ma-1"
								v-on:click="onType(4)"
							>error alert</VBtn>
						</div>
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
// 'success' 타입
window.ui.alert(
	'alert 예제 입니다.!',
	{ type: 'success', }
);</code>
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
						<VCardTitle><h4>Auto dismiss</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						alert창을 띄우고 설정한 <strong>autoDismiss</strong>옵션값의 <strong>millisecond</strong> 후에 자동으로 닫음.
					</VCardText>

					<VCardText>
						<div class="demo-space-x">
							<VBtn
								class="bg-info"	
								v-on:click="onAutoDismiss"
							>show alert</VBtn>
						</div>
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
// 'autoDismiss'옵션 설정.
window.ui.alert(
	'3초 후 자동 닫음.',
	{
		autoDismiss: 3000,
	}
);</code>
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
						<VCardTitle><h4>아이콘 설정</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						// TODO<br />
						alert창에 아이콘을 표시 하기.
					</VCardText>

					<VCardText>
						<!--<div class="demo-space-x">
							<VBtn
								v-on:click="onAutoDismiss"
							>show alert</VBtn>
						</div>-->
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
window.ui.alert(
	'아이콘 표시 예제!',
	{
		icon: 'mdi-home',
	}
);</code>
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
						<VCardTitle><h4>배경색 바꾸기</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						// TODO<br />
						alert창에 배경색을 변경 합니다.
					</VCardText>

					<VCardText>
						<!--<div class="demo-space-x">
							<VBtn
								v-on:click="onAutoDismiss"
							>show alert</VBtn>
						</div>-->
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
window.ui.alert(
	'배경색 변경 예제!',
	{
		color: '#ff0000',
	}
);</code>
						</pre>
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
	</div>
</template>

<script lang="ts">
export default {
	name: 'UiAlertDemo',
	components: {},
	props: {},
	data() {
		return {};
	},
	methods: {},
};
</script>
<script setup lang="ts">
import Prism from 'prismjs';
import { ref, onMounted, nextTick } from 'vue';

const callHighlightAll = () => {
	nextTick(() => {
		Prism.highlightAll();
	});
};


const onDefault = () => {
	window.ui.alert('alert 예제 입니다.!');
};

const onTitle = () => {
	window.ui.alert(
		'title 예제 입니다.!',
		{
			title: '제목',
		}
	);
};

const onType = (type: number) => {
	switch(type) {
		case 1:
			window.ui.alert('alert 예제 입니다.!', { type: 'success', });
			break;
		case 2:
			window.ui.alert('alert 예제 입니다.!', { type: 'info', });
			break;
		case 3:
			window.ui.alert('alert 예제 입니다.!', { type: 'warning', });
			break;
		case 4:
			window.ui.alert('alert 예제 입니다.!', { type: 'error', });
			break;
	}
};

const onAutoDismiss = () => {
	window.ui.alert('3초 후 자동 닫음.', { autoDismiss: 3000, });
};


onMounted(() => {
	callHighlightAll();
});
</script>

<style lang='scss' scoped></style>
