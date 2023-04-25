<script>
    import toast from "svelte-french-toast";
    import {user} from "../../store/userStore.js";
    import { BASE_URL } from "../../store/globalsStore.js";
    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    const handleLogout = async () => {

        const ACTION_URL = $BASE_URL + "/logout";
        const response = await fetch(ACTION_URL);
        const json = await response.json();

        toast.success(json.message, {
            position: "bottom-center"
        });

        $user = null;

        toast.loading(`redirecting`, {
                position: "bottom-center",
                duration: 500
        });

        setTimeout(() => {
                navigate("/");
                }, 200);

    };
</script>

<a href={'#'} on:click={handleLogout}>
    Logout
</a>
