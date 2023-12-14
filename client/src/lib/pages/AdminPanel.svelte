<script lang="ts">
  import { onMount } from "svelte";
  import { getAdmins, getQuestions, setQuizDatetime, type QUESTION, type QUIZ_INFO, getQuizInfo } from "../utils";
  import { currentUser } from '../stores/user';
  import DotLoader from "../components/DotLoader.svelte";
  import { navigate } from "svelte-routing";
  import { toasts } from "svelte-toasts";
  import SocketConnectionButton from "../components/SocketConnectionButton.svelte";
  import QuestionCard from "../components/QuestionCard.svelte";
  import QuestionForm from "../components/QuestionForm.svelte";

  let adminEmails: string[] = [],
    questions: QUESTION [] = [],
    mountloading = true;

  let quizInfo = { quiz_time: '' };
  
  onMount(async () => {
    try {
      adminEmails = await getAdmins();
      console.log(adminEmails)
      if(!adminEmails.includes($currentUser?.email as string)) navigate("/", { replace: true });
      const quizData = await getQuizInfo();
      console.log(quizData);

      if(quizData && quizData.quiz_time) quizInfo.quiz_time = (new Date(quizData.quiz_time)).toISOString().slice(0, 16);

    } catch (e) {
      console.log(e);
    } finally {
      mountloading = false;
    }
  });

  async function saveQuizDateTime(e: Event) {
    try {
      const token = await $currentUser?.getIdToken();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      const timestamp = (new Date(data.start_datetime as string)).getTime();
      
      await setQuizDatetime({ quiz_time: timestamp }, token as string );
      await setQuizDatetime({ quiz_time: timestamp }, token as string );
      
      toasts.success("Updated")
    } catch (error) {
      console.log(error);
      toasts.error((error as Error).message);
    }
  }

  async function viewQuestion(e:Event) {
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
      (e.target as HTMLButtonElement).textContent = "Refresh";
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
            value={quizInfo.quiz_time}
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
        <QuestionForm />
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
