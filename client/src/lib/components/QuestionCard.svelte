<script lang="ts">
  import type { QUESTION } from "../utils";

    export let idx:number;
    export let question:QUESTION;
</script>

<div class="bg-slate-950 p-4 my-4 rounded-sm">
    <div class="line-clamp-4 question-title">{idx}. {@html question.title}</div>
    <p>Duration: {question.duration}</p>
    <p>Score: {question.score}</p>
</div>