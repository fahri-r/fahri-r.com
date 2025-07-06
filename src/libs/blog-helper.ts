import type { Heading1, Heading2, Heading3, RichText } from '~/interfaces/notion/block.interface';

const REQUEST_TIMEOUT_MS = 10000;

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
