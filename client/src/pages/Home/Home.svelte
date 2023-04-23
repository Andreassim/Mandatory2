<script>
    import {user} from "../../store/userStore";
</script>


<h1>
    This is home
    <div>
        {#if ($user)}
        Hello user # {$user.id}
        {/if}
    </div>
</h1>