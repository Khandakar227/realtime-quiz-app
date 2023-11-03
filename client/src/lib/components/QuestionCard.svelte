<script lang="ts">
  //@ts-ignore
  import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte";
  //@ts-ignore
  import FaPenSquare from 'svelte-icons/fa/FaPenSquare.svelte'
  //@ts-ignore
  import FaUpload from 'svelte-icons/fa/FaUpload.svelte'
  import type { QUESTION } from "../utils";

  export let idx: number;
  export let question: QUESTION;

  function onDeleteQuestion(e:Event) {
    const c = confirm("Are you sure you want to delete the question?");
  }
  function onPublish(e:Event) {
    try {
      question.publish = !question.publish;
    } catch (error) {
      
    } finally {

    }
  }

</script>

<div class="bg-slate-950 p-2 my-4 rounded-sm flex gap-2">
  <span>{idx}. </span>
  <div class="w-full">
    <div class="line-clamp-4 question-title">{@html question.title}</div>
    <div class="flex items-center gap-4 pt-2">
      <span>Duration: {question.duration}</span>
      <span>Score: {question.score}</span>
    </div>
    <div class="flex gap-4 justify-end items-center w-full">
      <button on:click={onPublish} class={`text-xs font-semibold text-white py-1 px-2 rounded-sm ${question.publish ? 'bg-orange-500' : 'bg-green-500'}`}>
        {question.publish ? 'Unpublish' : 'Publish'}
      </button>
      <button title="Update" class="w-6 h-6 text-yellow-500">
        <FaPenSquare/>
      </button>
      <button title="Delete" on:click={onDeleteQuestion} class="w-6 h-6 text-red-500">
        <FaTrashAlt/>
      </button>
    </div>
  </div>
</div>
