<script lang="ts">
  import { toasts } from "svelte-toasts";
  import { resetPassword } from "../firebase/auth";

  let email = "", loading = false;
  export let showPasswordResetForm = false;
  
  function onSubmit(e: Event) {
    if (!email) return;
    loading = true;
    resetPassword(email).then(() => {
      toasts.success("Password reset link was sent");
      loading = false;
      close();
    }).catch(err => {
      console.log(err);
      loading = false;
      toasts.error("Error occured");
    });
  }
  function close() {
    showPasswordResetForm = false;
  }
</script>

{#if showPasswordResetForm}
<div
  class="bg-white bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center"
>
  <div
    class="cursor-default outline-none absolute top-0 left-0 h-screen w-screen"
    role="button"
    tabindex="0"
    on:keydown={() =>{}}
    aria-label="Close"
    on:click={close}
    />
  <form
    on:submit|preventDefault={onSubmit}
    class="p-4 rounded-md max-w-xs bg-gray-800 shadow z-10"
  >
    <input
      class="outline-none bg-gray-800 w-full p-4 rounded-md shadow shadow-black mb-4"
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      bind:value={email}
    />
    <button class="p-2 w-full rounded-md bg-red-600"
      >{loading ?  "Sending...": "SEND PASSWORD RESET LINK"}</button
    >
  </form>
</div>
{/if}
