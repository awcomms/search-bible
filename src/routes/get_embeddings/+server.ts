import { openai } from '$lib/openai';
import { json, type RequestHandler } from '@sveltejs/kit';
import bible from '$lib/bible.json';
import fs from 'fs';

const model = 'text-embedding-ada-002';

export const POST = (async () => {
	const with_embeddings = await Promise.all(
		bible.slice(0, 1).map(async (verse) => ({
			...verse,
			embedding: await openai
				.createEmbedding({ model, input: JSON.stringify(verse) })
				.then((res) => {
					console.log(res.statusText);
					return res.data.data[0].embedding;
				})
		}))
	);
	fs.writeFileSync('bible_with_embeddings.json', JSON.stringify(with_embeddings));
	return new Response(null, { status: 200 });
}) satisfies RequestHandler;
