import { config } from 'dotenv';
config();

export const NOTION_KEY = process.env.NOTION_KEY || '';
export const PROJECT_DATABASE_ID = process.env.PROJECT_DATABASE_ID || '';
export const BLOG_DATABASE_ID = process.env.BLOG_DATABASE_ID || '';
