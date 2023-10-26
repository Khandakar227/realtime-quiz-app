<script lang="ts">
  import { navigate } from "svelte-routing";
  import { toasts } from "svelte-toasts";

  export let loading = true,
    access = false,
    toastErrorMsg = "",
    to = "/";
  $: {
    if (!loading && !access) {
      navigate(to, { replace: true });
      if (toastErrorMsg) toasts.error(toastErrorMsg);
    }
  }
</script>

{#if loading}
  <div class="text-center p-4">Loading...</div>
{:else}
  <slot />
{/if}
