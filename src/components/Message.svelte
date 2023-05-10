<script>
	import moment from "moment";
	import clsx from "clsx";
  
	export let text;
	export let timestamp;
	export let username;
  
	export let isSender = true;
  </script>
  
  <div class={clsx("relative flex pb-1 px-1", isSender ? "justify-end" : "justify-start")}>
	<div class={clsx("relative w-5/6 px-2 break-all rounded text-sm  py-1 ", isSender ? "bg-gray-200": "bg-orange-200")}>
	  {#if !isSender}
		<div class="font-bold text-gray-600">
		  {username}
		</div>
	  {/if}
	  <span>{text}<span>
	  <span style="font-size:10px" class={clsx("absolute mx-2 my-1 break-all text-gray-500  bottom-0 right-0")}>
		{moment(timestamp).format("LT")}
	  <span>
	</div>
  </div>