<script lang="ts">
    export let countdown = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
</script>

<div class="flex justify-center items-center text-6xl sm:text-7xl md:text-9xl font-medium py-4 font-segment">
    <span>{countdown.hours < 10 ? "0" + countdown.hours : countdown.hours}</span>
    :<span>{countdown.minutes < 10 ? "0" + countdown.minutes : countdown.minutes}</span>
    :<span>{countdown.seconds < 10 ? "0" + countdown.seconds : countdown.seconds}</span>
  </div>