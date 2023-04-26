<script>
    import CensorMessageForm from "../../component/Messages/CensorMessageForm.svelte";
import MessagesForm from "../../component/Messages/MessagesForm.svelte";
import MessagesTable from "../../component/Messages/MessagesTable.svelte";
    import Messages from "../../component/Messages/MessagesTable.svelte";
    import { BASE_URL } from "../../store/globalsStore";
    import {user} from "../../store/userStore";

</script>


<div class="border-2 rounded-md h-min">
    <div class="p-5 w-100">
        <h1>
            Howdy 
        </h1>
        <div>
            {#if ($user)}
            Welcome user # {$user.id}
            <MessagesTable/>
            <MessagesForm/>
                {#if ($user.is_admin)}
                    You are the admin
                    <CensorMessageForm/>
                {/if}
            {:else}
            Login to display your messages
            {/if}
        </div>
    </div>
</div>