<script lang="ts">
	import { onMount } from "svelte";
  
	let openai_api_key = 0;
	let message: string = null;
  
	onMount(() => {
	  chrome.storage.sync.get("openai_api_key", (data) => {
		openai_api_key = data.openai_api_key;
	  });
	});
  
	const handleSave = () => {
	  chrome.storage.sync.set({ openai_api_key }).then(() => {
		message = "Updated!";
  
		setTimeout(() => {
		  message = null;
		}, 2000);
	  });
	};
  </script>
  
  
  <div class="max-w-xl mx-auto flex flex-col py-[3%] px-[2%] bg-blue-50 h-screen">
	<h2 class="mb-5">aicombinator options</h2>
	{#if message}
	  <span class="font-bold text-blue-800">{message}</span>
	{/if}
  
	<form on:submit|preventDefault={handleSave} class="flex flex-col gap-4">
	  <div class="flex items-center gap-2 w-full">
		<label for="openai_api_key" class="text-lg font-bold text-gray-700">
		  New Openai API key:
		</label>
		<input
		  type="text"
		  id="openai_api_key"
		  name="openai_api_key"
		  class="border border-gray-300 rounded-md p-2 flex-1"
		  bind:value={openai_api_key}
		/>
	  </div>
	  <!-- <i>Add other configurations here!</i> -->
  
	  <button
		class="w-full bg-blue-500 text-white text-base font-bold py-2 px-4 rounded"
		type="submit"
	  >
		Save
	  </button>
	</form>
  </div>
  