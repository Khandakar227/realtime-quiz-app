<script lang="ts">
    import { currentUser } from '../stores/user';
</script>

<div class="max-w-6xl mx-auto">
    <h1 class="py-4 text-3xl">Profile</h1>
    <hr>
    {#if !$currentUser}
        <p>Loading...</p>
    {:else}
        <div class="py-12 w-full max-w-md flex flex-col gap-4 justify-center px-4">
            <img class="mx-auto w-full max-w-xs rounded-full shadow shadow-black" src={$currentUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?size=160&seed=${$currentUser.displayName}`} alt="">
            <div class="flex justify-center items-center gap-4">
                <label for="name" class="text-sm">Name:</label>
                <input class="w-full py-2 px-4 rounded-md shadow shadow-black" type="text" name="name" id="name" value={$currentUser.displayName} disabled>
            </div>
            <div class="flex justify-center items-center gap-4">
                <label for="email" class="text-sm">Email:</label>
                <input class="w-full py-2 px-4 rounded-md shadow shadow-black" type="email" name="email" id="email" value={$currentUser.email} disabled>
            </div>

            <div class="flex justify-between md:items-center gap-4 md:flex-row flex-col">
                <p class="text-sm">Email Verified: 
                    <span class={`text-base font-semibold text-start ${$currentUser.emailVerified ? "text-green-400" : "text-red-500"}`}>
                        {$currentUser.emailVerified ? "True" : "False"}
                    </span>
                </p>
                {#if !$currentUser.emailVerified}
                    <button class="p-2 rounded-md bg-red-700">Send email verification link</button>
                {/if}
            </div>

            <div class="text-start">
                <button class="underline underline-offset-4 text-red-400">Reset  password</button>
            </div>
        </div>
    {/if}
</div>