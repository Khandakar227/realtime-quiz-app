<script lang="ts">
  import { EV_NAMES, QUIZ_STATUS } from "../configs/socket";
  import { quizStatus, socket } from "../stores/socket";
  import { quizData } from '../stores/quiz';
  import { onDestroy, onMount } from "svelte";
  import { getQuizInfo } from "../utils";
  import Countdown from "../components/Countdown.svelte";
  
  console.log($quizData)

  let countdown = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  onMount(async () => {
    quizData.set(await getQuizInfo());
    if(!$socket) return;

    $socket.on(EV_NAMES.BROADCAST, (data)=> {
      quizStatus.set(data.status);
      countdown = data.countdown;
    })
  })

  onDestroy(() => {
    $socket.off(EV_NAMES.BROADCAST);
  });

  $:countdownInSeconds = (countdown?.hours || 0)*60*60 + (countdown?.minutes || 0)*60 + countdown?.seconds || 0;
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
        <Countdown countdown={countdown} className={'text-xl'} />
        <div class="w-full h-3 bg-slate-950 rounded">
          <div
          style={`width: ${(countdownInSeconds && $quizData.duration) ? 100 * ($quizData.duration - countdownInSeconds) / $quizData.duration : 0}%;`}
          class={`h-3 bg-red-600 rounded`}></div>
        </div>
      {/if}
    </div>
{/if}
