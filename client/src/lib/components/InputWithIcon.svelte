<script lang="ts">
    //@ts-nocheck
    import FaEye from 'svelte-icons/fa/FaEye.svelte'
    import FaEyeSlash from 'svelte-icons/fa/FaEyeSlash.svelte'

    export let value = "";
    let show = false;

    const togglePasswordView = () => {
        show = !show;
    }
</script>

<div class="flex py-3 group">
    <div class="group-focus-within:bg-blue-800 bg-gray-900 flex justify-center items-center p-4">
        <slot/>
    </div>
    {#if $$props.type == 'password' && !show}
        <input bind:value={value} class="w-full p-2 outline-none bg-gray-800" {...$$props}/>
    {:else}
        <input bind:value={value} class="w-full p-2 outline-none bg-gray-800" {...$$props} type="text"/>
    {/if}
    {#if $$props.type == 'password'}
        <button type="button" on:click={togglePasswordView} class="bg-gray-800 w-10 px-2">
            {#if show}
                <FaEyeSlash/>
            {:else}
                <FaEye/>
            {/if}
        </button>
    {/if}
</div>