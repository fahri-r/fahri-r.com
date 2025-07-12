import type {
	Block,
	Heading1,
	Heading2,
	Heading3,
	RichText,
	Column
} from '~/interfaces/notion/block.interface';
import { pathJoin } from './utils';

const REQUEST_TIMEOUT_MS = 10000;
const BASE_PATH = '';

export const filePath = (url: URL): string => {
	const [dir, filename] = url.pathname.split('/').slice(-2);
	return pathJoin(BASE_PATH, `/notion/${dir}/${filename}`);
};

export const buildURLToHTMLMap = async (urls: URL[]): Promise<{ [key: string]: string }> => {
	const htmls: string[] = await Promise.all(
		urls.map(async (url: URL) => {
			const controller = new AbortController();
			const timeout = setTimeout(() => {
				controller.abort();
			}, REQUEST_TIMEOUT_MS);

			return fetch(url.toString(), { signal: controller.signal })
				.then((res) => {
					return res.text();
				})
				.catch(() => {
					console.log('Request was aborted');
					return '';
				})
				.finally(() => {
					clearTimeout(timeout);
				});
		})
	);

	return urls.reduce((acc: { [key: string]: string }, url, i) => {
		if (htmls[i]) {
			acc[url.toString()] = htmls[i];
		}
		return acc;
	}, {});
};

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

export const isTweetURL = (url: URL): boolean => {
	if (
		url.hostname !== 'twitter.com' &&
		url.hostname !== 'www.twitter.com' &&
		url.hostname !== 'x.com' &&
		url.hostname !== 'www.x.com'
	) {
		return false;
	}
	return /\/[^/]+\/status\/[\d]+/.test(url.pathname);
};

export const isTikTokURL = (url: URL): boolean => {
	if (url.hostname !== 'tiktok.com' && url.hostname !== 'www.tiktok.com') {
		return false;
	}
	return /\/[^/]+\/video\/[\d]+/.test(url.pathname);
};

export const isInstagramURL = (url: URL): boolean => {
	if (url.hostname !== 'instagram.com' && url.hostname !== 'www.instagram.com') {
		return false;
	}
	return /\/p\/[^/]+/.test(url.pathname);
};

export const isPinterestURL = (url: URL): boolean => {
	if (
		url.hostname !== 'pinterest.com' &&
		url.hostname !== 'www.pinterest.com' &&
		url.hostname !== 'pinterest.jp' &&
		url.hostname !== 'www.pinterest.jp'
	) {
		return false;
	}
	return /\/pin\/[\d]+/.test(url.pathname);
};

export const isCodePenURL = (url: URL): boolean => {
	if (url.hostname !== 'codepen.io' && url.hostname !== 'www.codepen.io') {
		return false;
	}
	return /\/[^/]+\/pen\/[^/]+/.test(url.pathname);
};

export const isShortAmazonURL = (url: URL): boolean => {
	if (url.hostname === 'amzn.to' || url.hostname === 'www.amzn.to') {
		return true;
	}
	return false;
};

export const isFullAmazonURL = (url: URL): boolean => {
	if (
		url.hostname === 'amazon.com' ||
		url.hostname === 'www.amazon.com' ||
		url.hostname === 'amazon.co.jp' ||
		url.hostname === 'www.amazon.co.jp'
	) {
		return true;
	}
	return false;
};

export const isAmazonURL = (url: URL): boolean => {
	return isShortAmazonURL(url) || isFullAmazonURL(url);
};

export const isYouTubeURL = (url: URL): boolean => {
	if (['www.youtube.com', 'youtube.com', 'youtu.be'].includes(url.hostname)) {
		return true;
	}
	return false;
};

// Supported URL
//
// - https://youtu.be/0zM3nApSvMg
// - https://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
// - https://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
// - https://www.youtube.com/watch?v=0zM3nApSvMg
// - https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
// - https://www.youtube.com/embed/0zM3nApSvMg?rel=0
// - https://youtube.com/live/uOLwqWlpKbA
export const parseYouTubeVideoId = (url: URL): string => {
	if (!isYouTubeURL(url)) return '';

	if (url.hostname === 'youtu.be') {
		return url.pathname.split('/')[1];
	} else if (url.pathname === '/watch') {
		return url.searchParams.get('v') || '';
	} else {
		const elements = url.pathname.split('/');

		if (elements.length < 2) return '';

		if (elements[1] === 'v' || elements[1] === 'embed' || elements[1] === 'live') {
			return elements[2];
		}
	}

	return '';
};
