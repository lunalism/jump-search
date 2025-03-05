import { MeiliSearch } from 'meilisearch';
import * as dotenv from 'dotenv';

// .env.local 파일에서 환경 변수 로드
dotenv.config({ path: '.env.local' });

const meilisearchHost = process.env.MEILISEARCH_HOST;
const meilisearchKey = process.env.MEILISEARCH_API_KEY;

export const meilisearch = new MeiliSearch({
    host: meilisearchHost,
    apiKey: meilisearchKey,
});