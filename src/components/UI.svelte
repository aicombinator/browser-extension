<script lang="ts">
	import yaml from "yaml";
	import { tick, createEventDispatcher } from "svelte";
	import isHotkey from "is-hotkey";
	import MessageView from "./Message.svelte";

	export let chat = ``;
	export let username = `user-1`;
	export let data = {};

	let message;
	let messages = [];
	let messageContainerRef;
	let dispatch = createEventDispatcher();

	function handleKeydown(event) {
	  if (isHotkey("enter", event)) {
	    handleSend();
	  }
	}

	class Message {
      text: string;
	  username: string;
	  timestamp: number;
	  
	  constructor({ text, username, timestamp}: {text: string, username: string, timestamp?: number}) {
	    this.text = text;
	    this.username = username;
	    this.timestamp = timestamp || Date.now();
	  }
	}

	function pushMessage(str: string) {
	  const message = new Message({ text: str, username });
	  messages = [...messages, message];
	  updateChat();
	}

	function parseMessages(str) {
	  const parsed = yaml.parse(str) || [];

	  if (parsed && parsed.messages) {
	    data = parsed.data || data;
	    return parsed.messages.map(message => new Message(message));
	  } else {
	    return [];
	  }
	}

	function updateChat() {
	  chat = yaml.stringify({ messages, data });
	}

	function scrollToEnd() {
	  if (messageContainerRef) {
	    messageContainerRef.scrollTop = messageContainerRef.scrollHeight;
	  }
	}

	async function handleSend() {
	  if (message) {
	    pushMessage(message);
	    message = "";
	    await tick();
	    scrollToEnd();
	  }
	}

	$: console.log(data, messages, chat);
	$: messages = parseMessages(chat);
</script>

<div class="w-96 h-64 rounded border-2 border-orange-500 border-radius flex flex-col justify-between">
	<div class="bg-orange-500 border-b px-4 py-1">
		<span class="text-white font-bold">aicombinator</span>
	</div>
	<div bind:this={messageContainerRef} class="flex-grow overflow-auto w-full h-full py-1">
		<div style="min-height: 100%;" class="w-full chat-messages overflow-auto flex flex-col justify-end">
			{#each messages as message}
				<MessageView {...message}/>
			{/each}
		</div>
	</div>

	<div class="chat-input h-8 flex mb-2">
		<span class="flex-grow mx-1">
			<input placeholder="type..." on:keydown={handleKeydown} bind:value={message} class="border border-orange-500 rounded-lg px-2 w-full h-full"/>
		</span>

		<button on:click={handleSend} class="rounded-lg bg-orange-500 shadow flex px-3 items-center mx-1 justify-center">
			<span class="text-white font-bold">send<span>
		<button>

	</div>
</div>