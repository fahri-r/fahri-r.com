import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../constants/global';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
	try {
		const blog = await getCollection('blog');
		return rss({
			title: SITE.title,
			description: SITE.desc,
			site: context.site ?? SITE.website,
			items: blog.map((post) => ({
				title: post.data.title,
				description: post.data.description ?? '',
				pubDate: post.data.date,
				link: `/${post.collection}/${post.id}/`
			}))
		});
	} catch (error) {
		console.error('Error generating RSS feed:', error);
		return new Response('Error generating RSS feed', { status: 500 });
	}
}
