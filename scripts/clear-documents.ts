import { meilisearch } from '../lib/meilisearch';

// 환경 변수 직접 설정
process.env.MEILISEARCH_HOST = 'https://ms-280496b26a44-19772.jpn.meilisearch.io';
process.env.MEILISEARCH_API_KEY = 'f542e2e91ed69fccc86afecaa252cdc4299ac3b2';

async function clearAllDocuments() {
    try {
        await meilisearch.index('search_results').deleteAllDocuments();
        console.log('All documents in search_results deleted successfully');
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
}

clearAllDocuments();