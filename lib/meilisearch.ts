import { MeiliSearch } from 'meilisearch';

const meilisearchHost = process.env.MEILISEARCH_HOST!;
const meilisearchKey = process.env.MEILISEARCH_API_KEY!;

export const meilisearch = new MeiliSearch({
    host: meilisearchHost,
    apiKey: meilisearchKey,
});