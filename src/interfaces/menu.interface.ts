import type { IconType } from '~/components/shared/icon.astro';

export default interface Menu {
	path: string;
	name: string;
	icon: IconType;
}
