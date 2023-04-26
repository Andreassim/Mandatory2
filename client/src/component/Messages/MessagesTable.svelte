<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../store/globalsStore";
    import {messages} from "../../store/messageStore.js"

    $messages = [];
    onMount(async () => {
        const response = await fetch($BASE_URL + "/messages", {
            credentials: "include"
        });
        const json = await response.json();
        $messages = json.data;
        console.log($messages);
    });

</script>

<table class="text-left">
    <thead>
        <th>#</th>
        <th>Message</th>
    </thead>
    <tbody>
        {#each $messages as message}
        <tr>
            <td>{message.id}</td>
            <td>{message.message}</td>
        </tr>
        {/each}
    </tbody>
</table>