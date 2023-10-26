<script>

  import { Link } from "svelte-routing";
  import { currentUser } from "../stores/user";
  import Avatar from "./Avatar.svelte";
  
  $:{console.log($currentUser)}

</script>
<div class="bg-slate-950 shadow-slate-800">
    <nav class="flex justify-between gap-4 items-center px-4 py-2 max-w-6xl mx-auto">
        <div>
            <Link to="/" class="font-medium font-segment text-lg">FRESHER'S QUIZ</Link>
        </div>
        <div class="flex justify-center items-center">
            {#if $currentUser}
                <Avatar/>
            {:else}
                <Link to="/login" class="bg-red-600 rounded-md text-white px-4 py-1 md:py-2">Login</Link>
            {/if}
        </div>
    </nav>
</div>