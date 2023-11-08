<template>
	<section id="hero">
		<h1 class="tagline text-h3 font-weight-bold">
			<span class="accent">Frontend boilerplate (Vue3)</span><br />
			example
		</h1>
		<p class="mt-3">
			frontend boilerplate 소스를 사용하여 다양한 Frontend 기능을 예제로 보여주기 위한 페이지 입니다.
		</p>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {};
	},
});
</script>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
#hero {
	padding: 64px 32px;
  text-align: center;
}
html:not(.dark) .accent, .dark .tagline {
    background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
