<script lang="ts">
	import axios from 'axios';
	import { Button } from 'carbon-components-svelte';

	const get_embeddings = async () => {
		await axios.post('/get_embeddings').then(() => console.log('embeddings: done'));
	};
</script>

<Button on:click={get_embeddings}>Get ze embeddings</Button>
