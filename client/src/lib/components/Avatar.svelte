<script lang="ts">
  import { Link } from 'svelte-routing';
  import { logOut } from '../firebase/auth';
  import {currentUser} from '../stores/user';
    
    let show = false;

    function showOptions() {
        show = !show;
    }

    function closeOptions() {
        show = false;
    }

    function onLogOut() {
        const c = confirm("Are you sure you want to log out now?")
        if(c) logOut();
    }
</script>

{#if $currentUser}
    <div class="relative">
        <button on:click={showOptions}>
            <img
                class="h-8 w-8 rounded-2xl shadow hover:scale-105 transition-all"
                src={$currentUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?size=40&seed=${$currentUser.displayName}`}
                alt={$currentUser.displayName}>
        </button>

        {#if show}
            <div
            role="button"
            tabindex="0"
            on:keydown={() =>{}}
            aria-label="Close"
            class="fixed top-0 left-0 h-screen w-screen"
            on:click={closeOptions}
            />
            <div class="absolute right-0 shadow rounded-md bg-slate-800 p-4 min-w-[150px]">
                <Link to="/profile" class="w-full p-2">Profile</Link>
                <hr />
                <button class="w-full p-2 text-start" on:click={onLogOut}>Log out</button>
            </div>
        {/if}
    </div>
{/if}