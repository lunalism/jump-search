import { meilisearch } from '../lib/meilisearch';  // 경로 매핑 설정 확인 (tsconfig-paths 필요)
import data from '../data/sample-search-data.json';

// 환경 변수 직접 설정
process.env.MEILISEARCH_HOST = 'https://ms-280496b26a44-19772.jpn.meilisearch.io';
process.env.MEILISEARCH_API_KEY = 'f542e2e91ed69fccc86afecaa252cdc4299ac3b2';

async function indexData() {
  try {
    await meilisearch.index('search_results').addDocuments(data);
    console.log('100 sample documents indexed successfully');
  } catch (error) {
    console.error('Error indexing data:', error);
  }
}

indexData();