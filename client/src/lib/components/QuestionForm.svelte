<script lang="ts">
  import { toasts } from "svelte-toasts";
  import TitleInput from "../components/TitleInput.svelte";
  import { currentUser } from "../stores/user";
  import { addNewQuestion } from "../utils";

  let questionloading = false;

  const QUESTION_TYPE = [
    { label: "Multiple choice", value: "multiple" },
    { label: "Single choice", value: "single" },
  ];
  let option_count: number;
  let options: {
    [key: number]: { id: number; value: string; correct: boolean };
  } = {};

  type NO_OPTION_QUESTION = {
    title: string;
    duration: number | null;
    score: number | null;
    publish: boolean,
    type: "multiple" | "single" | "";
  };

  let question: NO_OPTION_QUESTION = {
    title: "",
    duration: null,
    score: null,
    publish: true,
    type: "",
  };

  async function addQuestion(e: Event) {
    console.log({ ...question, options });
    if (!question.title || question.title.length <= 8) {
      console.log("Title length must be >= 10");
      toasts.error("Title length must be >= 10");
    }
    try {
      questionloading = true;
      const token = await $currentUser?.getIdToken();
      await addNewQuestion({ ...question, options }, token as string);
      toasts.success("Question addded");
      (e.target as HTMLFormElement).reset();
      question.title = "";
      question.type = "";
    } catch (error) {
      console.log(error);
      toasts.error((error as Error).message);
    } finally {
      questionloading = false;
    }
  }

  function onTypeChange() {
    for (let key in options) options[key].correct = false;
  }

  function setOption(e: Event, id: number) {
    const value = (e.target as HTMLInputElement).value as string;
    options[id] = { ...options[id], id, value };
  }

  function setCorrectOption(e: Event, id: number) {
    const correct = (e.target as HTMLInputElement).checked;
    const type = (e.target as HTMLInputElement).type;
    if (type == "radio") {
      for (let key in options) options[key].correct = false;
      options[id].correct = correct;
    } else {
      options[id].correct = correct;
    }
  }
</script>


<form class="p-2" on:submit|preventDefault={addQuestion}>
  <TitleInput bind:value={question.title} />
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
  <label for="publish" class="my-4">
    <input type="checkbox" name="publish" id="publish" bind:checked={question.publish}>
    Publish
  </label>
  <select
    name="type"
    id="type"
    class="my-2 w-full p-2 outline-none bg-gray-800"
    on:change={onTypeChange}
    bind:value={question.type}
  >
    <option value="" selected disabled>Select question type</option>
    {#each QUESTION_TYPE as _type}
      <option value={_type.value}>{_type.label}</option>
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
    disabled={!question.type}
  />
  {#if option_count}
    <div class="pr-2">
      {#each Array(option_count).fill("") as _, i (i)}
        <div class="py-2">
          <label for={"option " + (i + 1)}>Option {i + 1}</label>
          <div class="flex items-center justify-between gap-2">
            <input
              on:input={(e) => setOption(e, i + 1)}
              type="text"
              name={"option " + (i + 1)}
              id={"option " + (i + 1)}
              class="my-2 w-full p-2 outline-none bg-gray-800"
            />
            {#if question.type == "multiple"}
              <input
                on:change={(e) => setCorrectOption(e, i + 1)}
                type="checkbox"
                name="correct_option"
                id="correct_option"
                value={i}
                class="w-4 h-4"
              />
            {:else}
              <input
                on:change={(e) => setCorrectOption(e, i + 1)}
                type="radio"
                name="correct_option"
                id="correct_option"
                value={i}
                class="w-4 h-4"
              />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
  <div class="text-right">
    <button disabled={questionloading} class="my-2 px-4 py-2 bg-blue-800"
      >{questionloading ? "Loading" : "Submit"}</button
    >
  </div>
</form>
