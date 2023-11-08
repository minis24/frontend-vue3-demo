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
						버튼을 누르면 Dialog창이 뜹니다.
					</VCardText>

					<VCardText>
						<VBtn
							class="bg-info"	
							v-on:click="onDefault"
						>open dialog</VBtn>
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
window.ui.dialog('dialog 기본 예제 입니다.!');</code>
						</pre>
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
		<VRow>
			<VCol
				md="12"
				cols="12"
			>
				<VCard>
					<VCardItem>
						<VCardTitle><h4>Fullscreen 예제</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						버튼을 누르면 Dialog창이 화면 전체에 띄워 집니다. Fullscreen모드는 모바일 장치에서 더 적합할 수 있습니다.
					</VCardText>

					<VCardText>
						<VBtn
							class="bg-info"	
							v-on:click="onFullscreen"
						>open Fullscreen dialog</VBtn>
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
window.ui.dialog('Fullscreen Dialog 예제 입니다.', {
	title: 'Fullscreen',
	fullscreen: true,
});</code>
						</pre>
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
		<VRow>
			<VCol
				md="12"
				cols="12"
			>
				<VCard>
					<VCardItem>
						<VCardTitle><h4>Component content 예제</h4></VCardTitle>
					</VCardItem>

					<VCardText>
						UI Dialog창을 열고 내부 Content를 Vue Component로 로드해서 보여준다.
					</VCardText>

					<VCardText>
						<VBtn
							class="bg-info"	
							v-on:click="onComponentDialog"
						>open Inner Component dialog</VBtn>
					</VCardText>
					<VDivider />
					<VCardItem>
						<VCardTitle>Inner Component code</VCardTitle>
					</VCardItem>
					<VCardText>
						<pre>
							<code
								class="language-html"
							>
&lt;!-- InnerComponent.vue --&gt;
&lt;template&gt;
	&lt;v-card class="pa-5"&gt;
		&lt;v-row
			style="display: block;flex:none;"&gt;
			&lt;v-col cols="12"&gt;
				InnerComponent&lt;br /&gt;
				&lt;v-text-field
					bg-color="#fff"
					label="textfield예제"
					placeholder="textfield예제"
				/&gt;
			&lt;/v-col&gt;
		&lt;/v-row&gt;
	&lt;/v-card&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
export default {
	name: 'InnerComponent',
};
&lt;/script&gt;</code>
						</pre>
					</VCardText>
					<VCardItem>
						<VCardTitle>javascript code</VCardTitle>
					</VCardItem>
					<VCardText>
						<pre>
							<code
								class="language-javascript"
							>
import InnerComponent from '@/domains/../../InnerComponent.vue';

window.ui.dialog(InnerComponent, {
	title: '내부 Component 예제',
	fullscreen: true,
});</code>
						</pre>
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
	</div>
</template>

<script lang="ts">
export default {
	name: 'UiDialogDemo',
};
</script>
<script setup lang="ts">
import Prism from 'prismjs';
import { onMounted, nextTick } from 'vue';
import InnerComponent from '@/domains/ui-demo/components/InnerComponent.vue';

const callHighlightAll = () => {
	nextTick(() => {
		Prism.highlightAll();
	});
};

const onDefault = () => {
	window.ui.dialog('dialog 기본 예제 입니다.!');
};
const onFullscreen = () => {
	window.ui.dialog('Fullscreen Dialog 예제 입니다.', {
		title: 'Fullscreen',
		fullscreen: true,
	});
};
const onComponentDialog = () => {
	window.ui.dialog(InnerComponent, {
		title: '내부 Component 예제',
		fullscreen: true,
	});
};

onMounted(() => {
	callHighlightAll();
});
</script>

<style lang='scss' scoped></style>
