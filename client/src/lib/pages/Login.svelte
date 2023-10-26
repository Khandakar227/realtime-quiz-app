<script lang="ts">
    // @ts-nocheck
  import InputWithIcon from "../components/InputWithIcon.svelte";
  import FaUser from "svelte-icons/fa/FaUser.svelte";
  import FaLock from 'svelte-icons/fa/FaLock.svelte'
  import { Link, navigate } from "svelte-routing";
  import { signIn } from "../firebase/auth";
  import DotLoader from "../components/DotLoader.svelte";
  import { getMsgFromFirebaseErrorCode } from "../firebase/firebaseError";
  import ForgotPassword from "../components/ForgotPassword.svelte";

  let error="", loading = false, showPasswordResetForm = false;

  const loginInputs = [
    { type: "email", name: "email", placeholder: "Email", required: true },
    { type: "password", name: "password", placeholder: "Password", required: true },
  ];

  const onSubmit = async (e:Event) => {
    try {
      loading = true;
      const f = (e.target as HTMLFormElement)
      const formData = new FormData(f)
      const data = Object.fromEntries(formData);
      await signIn(data.email, data.password); 
      navigate("/");
    } catch (err) {
      error = getMsgFromFirebaseErrorCode(err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="pt-24 p-4 max-w-lg mx-auto min-h-rest">
    <h2 class="text-2xl font-medium pb-4 text-center">Login</h2>
  <form class="p-4 rounded-md bg-slate-700 border border-slate-800" on:submit|preventDefault={onSubmit}>
    <InputWithIcon {...loginInputs[0]}>
      <span class="h-5 w-5"><FaUser /></span>
    </InputWithIcon>
    <InputWithIcon {...loginInputs[1]}>
        <span class="h-5 w-5"><FaLock /></span>
    </InputWithIcon>
    <p class="py-1 text-red-500">{error}</p>
    <button class="flex justify-center items-center w-full py-2 bg-red-600"> 
      {#if loading} <DotLoader class="h-7"/> {:else} Login {/if}
    </button>
  </form>
  <div class="sm:flex justify-between items-center">
    <p class="pt-4">Haven't registered? <Link to="/register" class="text-red-500 underline">Register</Link></p>
    <button class="pt-4 border-b" on:click={() => showPasswordResetForm = true}>Forgot password?</button>
  </div>
</div>
<ForgotPassword bind:showPasswordResetForm={showPasswordResetForm}/>