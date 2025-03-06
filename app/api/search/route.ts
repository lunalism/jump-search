import { meilisearch } from '../../../lib/meilisearch';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    try {
        const results = await meilisearch.index('search_results').search(query, {
        limit: 10,
        });
        return NextResponse.json({ hits: results.hits });
    } catch (e: unknown) {
        console.error('Search failed:', e);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}