import type { Heading1, Heading2, Heading3, RichText } from '~/interfaces/notion/block.interface';

export const buildHeadingId = (heading: Heading1 | Heading2 | Heading3) => {
	return heading.richTexts
		.map((richText: RichText) => {
			if (!richText.text) {
				return '';
			}
			return richText.text.content;
		})
		.join()
		.trim();
};
