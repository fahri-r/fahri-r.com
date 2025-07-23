import { config } from 'dotenv';
config();

export const NOTION_KEY = process.env.NOTION_KEY || '';
export const PROJECT_DATABASE_ID = process.env.PROJECT_DATABASE_ID || '';
export const BLOG_DATABASE_ID = process.env.BLOG_DATABASE_ID || '';

export const SITE = {
	website: 'https://fahri-r.com/', // replace this with your deployed domain
	author: 'Fahri Ramadhan',
	profile: 'https://fahri-r.com/',
	desc: 'Building scalable solutions and sharing tech insights. Explore my code, tutorials, and thoughts on modern software development.',
	title: 'Fahri Ramadhan - Personal Website',
	ogImage: 'og-image.jpeg',
	dir: 'ltr', // "rtl" | "auto"
	lang: 'en', // html lang code. Set this empty and default will be "en"
	timezone: 'Asia/Jakarta' // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
