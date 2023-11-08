<template>
	<button
		class="ui-btn"
		v-bind:class="classObject"
	>
		<slot/>
	</button>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
	name: 'UiButton',
	data() {
		return {};
	},
});
</script>
<script setup lang="ts">
const props = defineProps({
	disabled: { type: Boolean, required: false, default: false, },
	color: { type: String, required: false, default: 'primary', },
	full: { type: Boolean, required: false, },
	rounded: { type: Boolean, required: false, },
	xsmall: { type: Boolean, required: false, },
	small: { type: Boolean, required: false, },
	default: { type: Boolean, required: false, },
	large: { type: Boolean, required: false, },
	xlarge: { type: Boolean, required: false, },
});

const classObject = computed(() => {
	const colorType = `ui-btn-${props.color}`;
	let obj = {
		'ui-btn-full': props.full===false? false:true,
		[colorType]: true,
	};

	// rounded props
	if (props.rounded) {
		obj = Object.assign(obj, { 'radius-round': true, });
	}
	// button size props
	if (props.xsmall) {
		obj = Object.assign(obj, { 'ui-btn-size-x-small': true, });
	} else if (props.small) {
		obj = Object.assign(obj, { 'ui-btn-size-small': true, });
	} else if (props.default) {
		obj = Object.assign(obj, { 'ui-btn-size-default': true, });
	} else if (props.large) {
		obj = Object.assign(obj, { 'ui-btn-size-large': true, });
	} else if (props.xlarge) {
		obj = Object.assign(obj, { 'ui-btn-size-x-large': true, });
	} else {
		obj = Object.assign(obj, { 'ui-btn-size-default': true, });
	}
	/** button 비활성화 props */
	if (props.disabled) {
		obj = Object.assign(obj, { 'ui-btn-disabled': true, });
	}
	return obj;
});

const onClick = () => {};
</script>

<style lang="scss" scoped>
button {
  appearance: button;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark(buttontext, rgb(170, 170, 170));
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  background-color: -internal-light-dark(rgb(239, 239, 239), rgb(74, 74, 74));
  box-sizing: border-box;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
  border-image: initial;

  &.ui-btn {
    border: 1px solid transparent;
    border-radius: 4px;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: none;
    cursor: pointer;
    padding: 0;
    display: inline-block;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  &.ui-btn-disabled {
    cursor: pointer;
    border-style: none;
    box-shadow: none;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.12) !important;
  }

  &.ui-btn:after {
    content: '';
    position: absolute;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  /* Pseudo elements for icons */
  .ui-btn:before,
  .icon-heart:after,
  .icon-star:after,
  .icon-plus:after,
  .icon-file:before {
    font-family: 'icomoon';
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }
  &.ui-btn:active {
    top: 2px;
  }
  &.ui-btn:hover {
    opacity: 0.9;
  }

  /* Button round */
  &.radius-round {
    border-radius: 4rem !important;
  }

  /* Button width */
  &.ui-btn-full {
    // display: flex;
    // flex: 1 0 auto;
    min-width: 100% !important;
    max-width: auto;
  }

  /* Button Color */
  &.ui-btn-primary {
    color: #fff;
    background-color: #2c86d1;
    border-color: #2c86d1;
  }
  &.ui-btn-secondary {
    color: #fff;
    background-color: #678497;
    border-color: #678497;
  }
  &.ui-btn-info {
    color: #fff;
    background-color: #008bb2;
    border-color: #008bb2;
  }
  &.ui-btn-success {
    color: #fff;
    background-color: #3f923f;
    border-color: #3f923f;
  }
  &.ui-btn-warning {
    color: #22190b;
    background-color: #ffbe50;
    border-color: #ffbe50;
  }
  &.ui-btn-danger {
    color: #fff;
    background-color: #df4b30;
    border-color: #df4b30;
  }
  &.ui-btn-dark {
    color: #fff;
    background-color: #42474e;
    border-color: #42474e;
  }
  &.ui-btn-light {
    color: #5d6069;
    background-color: #f8f9fb;
    border-color: #d4d7dd;
  }
  &.ui-btn-outline-primary {
    color: #1b74bf;
    border-color: #64a0d3;
    background-color: transparent;
    &:hover {
      color: #fff;
      background-color: #2c86d1;
      border-color: #2c86d1;
    }
  }
  &.ui-btn-outline-secondary {
    color: #4e748d;
    border-color: #86a0b2;
    background-color: transparent;
    &:hover {
      color: #fff;
      background-color: #678497;
      border-color: #678497;
    }
  }
  &.ui-btn-outline-info {
    color: #00799b;
    border-color: #52a4bb;
    background-color: transparent;
    &:hover {
      color: #fff;
      background-color: #008bb2;
      border-color: #008bb2;
    }
  }
  &.ui-btn-outline-success {
    color: #2c812c;
    border-color: #6faa6f;
    background-color: transparent;
    &:hover {
      color: #fff;
      background-color: #3f923f;
      border-color: #3f923f;
    }
  }
  &.ui-btn-outline-warning {
    color: #c86800;
    border-color: #e6b461;
    background-color: transparent;
    &:hover {
      color: #22190b;
      background-color: #ffbe50;
      border-color: #ffbe50;
    }
  }
  &.ui-btn-outline-danger {
    color: #d53114;
    border-color: #e2735f;
    background-color: transparent;
    &:hover {
      color: #fff;
      background-color: #df4b30;
      border-color: #df4b30;
    }
  }
  &.ui-btn-outline-dark {
    color: #42474e;
    border-color: #7e8287;
    background-color: transparent;
    &:hover {
      color: #fff;
      background-color: #42474e;
      border-color: #42474e;
    }
  }
  &.ui-btn-outline-light {
    color: #91969b;
    border-color: #d4d7dd;
    background-color: transparent;
    &:hover {
      color: #5d6069;
      background-color: #f8f9fb;
      border-color: #d4d7dd;
    }
  }
  &.ui-btn-light-primary {
    color: #1766a8;
    background-color: #dbebf8;
    border-color: #a0c9eb;
  }
  &.ui-btn-light-secondary {
    color: #4c6778;
    background-color: #e6eaed;
    border-color: #bfc8cf;
  }
  &.ui-btn-light-info {
    color: #00708f;
    background-color: #d7f4fc;
    border-color: #7cd9f4;
  }
  &.ui-btn-light-success {
    color: #2f732f;
    background-color: #e1f1e1;
    border-color: #a7d5a7;
  }
  &.ui-btn-light-warning {
    color: #8d5f13;
    background-color: #fceed7;
    border-color: #f4c67a;
  }
  &.ui-btn-light-danger {
    color: #b0341e;
    background-color: #f9dfda;
    border-color: #eeafa4;
  }
  &.ui-btn-light-dark {
    color: #35393e;
    background-color: #e2e3e4;
    border-color: #aaacaf;
  }
  &.ui-btn-light-light {
    color: #6e7074;
    background-color: #fefeff;
    border-color: #d9d9e6;
  }

  /* Button Size */
  &.ui-btn-size-x-small {
    height: 20px;
    min-width: 36px;
    padding: 0 8.8888888889px;
  }
  &.ui-btn-size-small {
    height: 28px;
    min-width: 50px;
    padding: 0 12.4444444444px;
  }
  &.ui-btn-size-default {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
  }
  &.ui-btn-size-large {
    height: 44px;
    min-width: 78px;
    padding: 0 19.5555555556px;
  }
  &.ui-btn-size-x-large {
    height: 52px;
    min-width: 92px;
    padding: 0 23.1111111111px;
  }

  /* Button 1 */
  &.ui-btn-1 {
    color: #fff;
    background: #226fbe;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
  }

  &.ui-btn-1:active {
    top: 2px;
  }

  /* Button 6a */
  &.ui-btn-1a {
    border: 4px solid #226fbe;
  }

  &.ui-btn-1a:hover {
    opacity: 0.95;
    // background: transparent;
    // color: #226fbe;
  }

  /* Button 6b */
  &.ui-btn-1b {
    border: 4px solid #226fbe;
    border-radius: 4px;
  }

  &.ui-btn-1b:hover {
    opacity: 0.95;
    // background: transparent;
    // color: #226fbe;
  }

  /* Button 6c */
  &.ui-btn-1c {
    border: 4px solid #226fbe;
    border-radius: 60px;
  }

  &.ui-btn-1c:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6d */
  &.ui-btn-1d {
    border: 2px dashed #226fbe;
  }

  &.ui-btn-1d:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6e */
  &.ui-btn-1e {
    border: 2px dashed #226fbe;
    border-radius: 15px;
  }

  &.ui-btn-1e:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6f */
  &.ui-btn-1f {
    border: 2px dashed #226fbe;
    border-radius: 60px;
  }

  &.ui-btn-1f:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6g */
  &.ui-btn-1g {
    border: 2px dotted #226fbe;
  }

  &.ui-btn-1g:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6h */
  &.ui-btn-1h {
    border: 2px dotted #226fbe;
    border-radius: 15px;
  }

  &.ui-btn-1h:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6i */
  &.ui-btn-1i {
    border: 2px dotted #226fbe;
    border-radius: 60px;
  }

  &.ui-btn-1i:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6j */
  &.ui-btn-1j {
    border: 4px double #226fbe;
  }

  &.ui-btn-1j:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6k */
  &.ui-btn-1k {
    border: 4px double #226fbe;
    border-radius: 15px;
  }

  &.ui-btn-1k:hover {
    background: transparent;
    color: #226fbe;
  }

  /* Button 6l */
  &.ui-btn-1l {
    border: 4px double #226fbe;
    border-radius: 60px;
  }

  &.ui-btn-1l:hover {
    background: transparent;
    color: #226fbe;
  }
}

button:disabled {
  color: -internal-light-dark(rgba(16, 16, 16, 0.3), rgb(170, 170, 170));
  background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(19, 1, 1, 0.3));
  border-color: -internal-light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3));
}
</style>
