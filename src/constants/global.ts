import { config } from 'dotenv';
config();

export const NOTION_KEY = process.env.NOTION_KEY || '';
export const PROJECT_DATABASE_ID = process.env.DATABASE_ID || '';
