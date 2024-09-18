<script lang="ts">
  import { EV_NAMES, QUIZ_STATUS } from "../configs/socket";
  import { quizStatus, socket } from "../stores/socket";
  import { quizData } from '../stores/quiz';
  
  console.log($quizData)
</script>

{#if $quizStatus == QUIZ_STATUS.LOADING}
  Loading...
{:else if $quizStatus == QUIZ_STATUS.ENDED}
  <p class="py-12 px-4 font-semibold text-center">Quiz is over</p>
{:else if $quizStatus == QUIZ_STATUS.NOT_STARTED}
  <p class="py-12 px-4 font-semibold text-center">Quiz hasn't started yet</p>
  {:else if $quizStatus == QUIZ_STATUS.STARTED}
    <div class="w-full mx-auto max-w-6xl py-8 px-2">
      {#if $quizData}
        <div class="w-full h-3 bg-slate-950 rounded">
          <div
          style={`width: ${$quizData.max_duration ? 100 * $quizData.countdown / $quizData.max_duration : 0}%;`}
          class={`h-3 bg-red-600 rounded ${$quizData.countdown == $quizData.max_duration  ? "" : "transition-all duration-1000 ease-linear"}`}></div>
        </div>
      {/if}
    </div>
{/if}
