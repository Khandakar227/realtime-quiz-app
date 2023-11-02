<script lang="ts">
    import { onMount } from 'svelte';
    import {socket} from '../stores/socket'

    let status = 'Disconnected';
    
    onMount(() => {
        status = $socket.connected ? 'Connected' : 'Disconnected';
    })

    function toggleConnection() {
        if (status == 'Connected') {
            $socket.disconnect();
            status = 'Disconnected';
        } else {
            $socket.connect();
            status = 'Connected';
        }
    }
</script>

<button on:click={toggleConnection} class="px-4 py-2 bg-lime-500">{status == 'Connected' ? "Disconnect" : "Connect"}</button>