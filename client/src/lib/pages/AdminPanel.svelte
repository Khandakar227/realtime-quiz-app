<script lang="ts">
  import { onMount } from "svelte";
  import TitleInput from "../components/TitleInput.svelte";
  import { addNewQuestion, getAdmins, getQuestions, setQuizDatetime, type QUESTION } from "../utils";
  import { currentUser } from '../stores/user';
  import DotLoader from "../components/DotLoader.svelte";
  import { navigate } from "svelte-routing";
  import { toasts } from "svelte-toasts";
  import SocketConnectionButton from "../components/SocketConnectionButton.svelte";
  import QuestionCard from "../components/QuestionCard.svelte";

  let adminEmails: string[] = [],
    questions: QUESTION [] = [],
    mountloading = true,
    questionloading = false;

  const QUESTION_TYPE = [{label: "Multiple choice", value: "multiple"}, {label: "Single choice", value: "single"}];
  let option_count: number;
  let options: {
    [key: number]: { id: number; value: string; correct: boolean };
  } = {};

  type NO_OPTION_QUESTION = {
    title: string;
    duration: number | null;
    score: number | null;
    type: "multiple" | "single" | "";
  };

  let question: NO_OPTION_QUESTION = {
    title: "",
    duration: null,
    score: null,
    type: "",
  };

  onMount(async () => {
    try {
      adminEmails = await getAdmins();
      console.log(adminEmails)
      if(!adminEmails.includes($currentUser?.email as string)) navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    } finally {
      mountloading = false;
    }
  });

  async function saveQuizDateTime(e: Event) {
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      const timestamp = (new Date(data.start_datetime as string)).getTime();
      // await setQuizDatetime(timestamp);
    } catch (error) {
      console.log(error);
      toasts.error((error as Error).message);
    }
  }


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
    } finally {questionloading = false;}
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

  async function viewQuestion(e:Event) {
    const buttonText = (e.target as HTMLButtonElement).textContent;
    try {
      (e.target as HTMLButtonElement).textContent = "Loading";
      const token = await $currentUser?.getIdToken();
      const _qs = await getQuestions(token as string);
      questions = _qs;
      console.log(questions);
    } catch (error) {
      console.log(error);
      toasts.error((error as Error).message);
    } finally {
      (e.target as HTMLButtonElement).textContent = buttonText;
    }
  }

</script>

{#if mountloading}
  <div class="text-center mx-auto">
    <DotLoader class="text-center mx-auto"/>
  </div>
{:else}
  <div class="mx-auto max-w-6xl">
    <h2 class="text-3xl font-bold py-4 px-2">Admin Panel</h2>
    <hr />
  </div>
  
  <div class="pt-8 px-4 text-end mx-auto max-w-6xl">
    <SocketConnectionButton/>
  </div>

  <main class="flex gap-4 flex-col md:flex-row mx-auto max-w-6xl">

    <section class="p-4 mx-auto">
      <div
        class="max-w-xs md:min-w-[320px] mt-12 p-2 rounded-md shadow shadow-black bg-slate-950"
      >
        <h4 class="font-semibold text-xl pb-2">Quiz time and date</h4>
        <form
          class="p-2 rounded-md max-w-xs"
          on:submit|preventDefault={saveQuizDateTime}
        >
          <label class="text-sm block" for="start_datetime">Start date and time:</label>
          <input
            class="w-full outline-none shadow shadow-black p-2 rounded-md text-black max-w-xs"
            type="datetime-local"
            name="start_datetime"
            id="start_datetime"
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
            <button disabled={questionloading} class="my-2 px-4 py-2 bg-blue-800">{questionloading ? 'Loading' : 'Submit'}</button>
          </div>
        </form>
      </div>

      <div class="py-8">
        <button on:click={viewQuestion} class="px-4 py-2 bg-green-600">View all questions</button>
        <div class="pt-8">
          {#each questions as question, i (i)}
            <QuestionCard {question} idx={i+1} />
          {/each}
        </div>
      </div>
    </section>
  </main>
{/if}
