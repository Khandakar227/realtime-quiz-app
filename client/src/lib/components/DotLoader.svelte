<script lang="ts">
    let className="";
    export {className as class};
</script>

<div class={`loader ${className}`}></div>
<style>
    .loader {
      width: 25px;
      aspect-ratio: 4;
      background: radial-gradient(circle closest-side,#fff 90%,#0000) 0/calc(100%/3) 100% space;
      clip-path: inset(0 100% 0 0);
      animation: l1 1s steps(4) infinite;
    }
    @keyframes l1 {to{clip-path: inset(0 -34% 0 0)}}
</style>