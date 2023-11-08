import type { IconProps, IconSet } from 'vuetify';
import { h } from 'vue';

// 생성한 SVG 아이콘 컴포넌트를 import한다.
import TestIcon from '@/plugins/vuetify/customSVGs/TestIcon.vue';

// 가져온 SVG컴포넌트를 customSvgNameToComponent 오브젝트에 추가한다.
const customSvgNameToComponent: any = {
	TestIcon,
};

const customSVGs: IconSet = {
	component: (props: IconProps) => {
		return h(customSvgNameToComponent[ (props.icon as string) ]);
	},
};

export { customSVGs /* aliases */ };
