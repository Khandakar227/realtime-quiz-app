<script lang="ts">
    // @ts-nocheck
  import InputWithIcon from "../components/InputWithIcon.svelte";
  import FaUser from "svelte-icons/fa/FaUser.svelte";
  import FaLock from 'svelte-icons/fa/FaLock.svelte';
  import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte'
  import FaIdCard from 'svelte-icons/fa/FaIdCard.svelte';
  import { Link } from "svelte-routing";
  import { sendEmailVerificationLink, signUp } from "../firebase/auth";
  import {toasts} from "svelte-toasts"
  import DotLoader from "../components/DotLoader.svelte";
  import { getMsgFromFirebaseErrorCode } from "../firebase/firebaseError";

  let password="", confirm_password="", username="", student_id="", error="", loading = false;
  
  $:{
    username = username.replace(/[^a-zA-Z0-9 ]/g, '')
  }
  $:{
    student_id = student_id.replace(/[^0-9]/g, '')
  }

  const loginInputs = [
    { type: "text", name: "name", placeholder: "Name", pattern:"^[a-zA-Z0-9_ ]+$", required: true },
    { type: "text", name: "student_id", placeholder: "Student  ID", pattern:"^[a-zA-Z0-9_ ]+$", required: true },
    { type: "email", name: "email", placeholder: "Email", required: true },
    { type: "password", name: "password", placeholder: "Password", required: true },
    { type: "password", name: "password", placeholder: "Confirm Password", required: true },
  ];


  const onSubmit = async (e:Event) => {
    try {
      loading = true;
      const f = (e.target as HTMLFormElement)
      const formData = new FormData(f)
      const data = Object.fromEntries(formData);
      await signUp(`${data.name} ${data.student_id}`, data.email, data.password);
      await sendEmailVerificationLink();

      toasts.add({
      title: 'Registration done',
      description: 'A verification link has been sent. Please check your email to complete the registration process.',
      duration: 0, // 0 or negative to avoid auto-remove
      placement: 'top-center',
      type: 'warning',
			showProgress: true,
      theme: 'dark',
      });
    } catch (err) {
      error = getMsgFromFirebaseErrorCode(err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="py-16 px-4 max-w-lg mx-auto min-h-rest">
    <h2 class="text-2xl font-medium pb-4 text-center">Register</h2>
  <form class="p-4 rounded-md bg-slate-700 border border-slate-800" on:submit|preventDefault={onSubmit}>
    <InputWithIcon {...loginInputs[0]} bind:value={username}>
      <span class="h-5 w-5"><FaUser /></span>
    </InputWithIcon>
    <InputWithIcon {...loginInputs[1]} bind:value={student_id}>
        <span class="h-5 w-5"><FaIdCard /></span>
    </InputWithIcon>
    <InputWithIcon {...loginInputs[2]}>
        <span class="h-5 w-5"><FaEnvelope /></span>
    </InputWithIcon>
    <InputWithIcon {...loginInputs[3]} bind:value={password}>
        <span class="h-5 w-5"><FaLock /></span>
    </InputWithIcon>
    <InputWithIcon {...loginInputs[4]}  bind:value={confirm_password}>
        <span class="h-5 w-5"><FaLock /></span>
    </InputWithIcon>
    <p class="py-1 text-red-500">{error}</p>
    <button class="flex justify-center items-center w-full py-2 bg-red-600 disabled:brightness-50" disabled={!password || password != confirm_password || loading}>
      {#if loading}
      <DotLoader class="h-7"/>
      {:else}
      Login
      {/if}
    </button>
  </form>
  <p class="pt-4 text-end">Already registered? <Link to="/login" class="text-red-500 underline">Login</Link></p>
</div>
