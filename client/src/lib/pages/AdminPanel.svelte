<script lang="ts">
  const QUESTION_TYPE = ["Multiple choice", "Single choice"];
  let option_count:number;

  type QUESTION = {
    title: string;
    duration: number | null;
    score: number | null;
    type: string;
  };

  let question:QUESTION = {
    title: "",
    duration: null,
    score: null,
    type: "",
  };

  function saveQuizDateTime(e: Event) {}
  function addQuestion(e: Event) {}
</script>

<div class="mx-auto max-w-6xl">
  <h2 class="text-3xl font-bold py-4 px-2">Admin Panel</h2>
  <hr />
</div>
<main class="flex gap-4 mx-auto max-w-6xl">
  <section class="p-4 mx-auto">
    <div
      class="max-w-xs md:min-w-[320px] mt-12 p-2 rounded-md shadow shadow-black bg-slate-950"
    >
      <h4 class="font-semibold text-xl pb-2">Quiz time and date</h4>
      <form
        class="p-2 rounded-md max-w-xs"
        on:submit|preventDefault={saveQuizDateTime}
      >
        <label class="text-sm block" for="start_date">Start date:</label>
        <input
          class="w-full outline-none shadow shadow-black p-2 rounded-md text-black max-w-xs"
          type="date"
          name="start_date"
          id="start_date"
        />

        <label class="text-sm pt-4 block" for="start_time">Start time:</label>
        <input
          class="w-full outline-none shadow shadow-black p-2 rounded-md text-black max-w-xs"
          type="time"
          name="start_time"
          id="start_date"
        />
        <button class="mt-4 px-4 py-2 bg-red-600 rounded-md"> Save </button>
      </form>
    </div>

    <div class="max-w-xs py-10">
      <button class="my-4 w-full py-2 px-4 bg-orange-600"
        >Delete Leaderboard</button
      >
      <button class="my-4 w-full py-2 px-4 bg-red-600">
        Clear All Submissions
      </button>
    </div>
  </section>

  <section class="w-full p-4 mx-auto flex-auto">
    <div class="w-full mt-12 p-2 rounded-md shadow shadow-black bg-slate-950">
      <h4 class="font-semibold text-xl pb-2">Add question</h4>
      <form class="p-2" on:submit|preventDefault={addQuestion}>
        <textarea
          name="title"
          id="title"
          placeholder="Title"
          class="min-h-[6rem] my-2 w-full p-2 outline-none bg-gray-800"
          bind:value={question.title}
        />
        <input
          type="number"
          name="duration"
          id="duration"
          placeholder="Duration in seconds"
          min="1"
          class="my-2 w-full p-2 outline-none bg-gray-800"
          bind:value={question.duration}
        />
        <input
          type="number"
          name="score"
          id="score"
          placeholder="Score"
          min="0"
          class="my-2 w-full p-2 outline-none bg-gray-800"
          bind:value={question.score}
        />
        <select
          name="type"
          id="type"
          class="my-2 w-full p-2 outline-none bg-gray-800"
          bind:value={question.type}
        >
          <option value="" selected disabled>Select question type</option>
          {#each QUESTION_TYPE as _type}
            <option value={_type}>{_type}</option>
          {/each}
        </select>
        <input
          bind:value={option_count}
          type="number"
          name="option_count"
          id="option_count"
          placeholder="Number of options"
          min="2"
          max="5"
          class="my-2 w-full p-2 outline-none bg-gray-800"
        />
        {#if option_count}
            <div class="pr-2">
            {#each Array(option_count).fill("") as _, i (i)}
                <div class="py-2">
                <label for={"option " + (i + 1)}>Option {i + 1}</label>
                <div class="flex items-center justify-between gap-2">
                    <input
                        type="text"
                        name={"option " + (i + 1)}
                        id={"option " + (i + 1)}
                        class="my-2 w-full p-2 outline-none bg-gray-800"
                    />
                    {#if question.type == 'Multiple choice'}
                        <input type="checkbox" name="correct_option" id="correct_option" value={i} class="w-4 h-4">
                    {:else}
                        <input type="radio" name="correct_option" id="correct_option" value={i} class="w-4 h-4">
                    {/if}
                </div>
                </div>
            {/each}
            </div>
        {/if}
        <div class="text-right">
            <button class="my-2 px-4 py-2 bg-blue-800">Submit</button>
        </div>
      </form>
    </div>
   
    <div class="py-8">
        <button class="px-4 py-2 bg-green-600">View all questions</button>
    </div>
  </section>
</main>
