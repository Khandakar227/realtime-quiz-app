<script lang="ts">
    import { quizStatus, socket } from '../stores/socket'
    import { EV_NAMES, QUIZ_STATUS } from "../configs/socket";
    import Countdown from "../components/Countdown.svelte";
    import { onDestroy, onMount } from 'svelte';
    import { Link } from 'svelte-routing';
  
    let countdown = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
    onMount(() => {
      if(!$socket) return;

      $socket.on(EV_NAMES.BROADCAST, (data)=> {
        quizStatus.set(data.status);
        countdown = data.countdown;
      })
    })
    
    onDestroy(() => {
      $socket.off(EV_NAMES.BROADCAST);
    });
  </script>
  
  <main class="min-h-rest grid justify-center items-center">
    {#if $quizStatus == QUIZ_STATUS.LOADING}
      <p class="text-center p-4">Loading...</p>
    {:else}
      <div>
        {#if $quizStatus === QUIZ_STATUS.NOT_STARTED}
          <p class="font-medium text-xl md:text-3xl text-center">Quiz will start in:</p>
          <Countdown countdown={countdown} />
        {:else if $quizStatus == QUIZ_STATUS.STARTED}
        <p class="font-medium text-xl md:text-3xl text-center">Quiz has started:</p>
        <Countdown countdown={countdown} />
        <div class="text-center py-5">
          <Link to="/quiz" class="mx-auto p-4 rounded bg-red-600 text-white font-medium">Go to Quiz</Link>
        </div>
        {:else if $quizStatus == QUIZ_STATUS.ENDED}
          <p class="font-medium text-xl md:text-3xl text-center">Quiz is over</p>
        {/if}
      </div>
    {/if}
  </main>
  