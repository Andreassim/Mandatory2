<script>
    import { useNavigate } from "svelte-navigator";
    import {BASE_URL} from "../../store/globalsStore.js"
    import {user} from "../../store/userStore.js";
    import toast from "svelte-french-toast";

    const navigate = useNavigate();
   
    const handleSubmit = async (e) =>{
        const ACTION_URL = e.target.action;

        const formData = new FormData(e.target);
        const body = new URLSearchParams();
        for(let field of formData){
            const [key, value] = field;
            // @ts-ignore
            body.append(key, value);
        }

        try{
            const response = await fetch(ACTION_URL, {
                method: 'POST',
                body: body,
                credentials: "include"
            })
            if(!response.ok){
                throw response;
            }

            toast.success(`Logged in`, {
                    position: "bottom-center"
                });

            const data = await response.json();
            $user = data.user;

            toast.loading(`redirecting`, {
                    position: "bottom-center",
                    duration: 1000
                });

            setTimeout(() => {
                navigate("/");
                }, 1000);

        }
        catch (errors){
            console.log(errors);
            const response  = await errors.json();
            toast.error(`${errors.status} ${errors.statusText} \n\n ${response.message}`, {
                    position: "bottom-center"
                });
        }
    };


</script>

<form class="p-5" action="{$BASE_URL}/login" on:submit|preventDefault={handleSubmit}>
    <div class="py-1">
        <label for="email">Email</label>
        <div>
            <input class=" text-xl" type="email" placeholder="email" name="email">
        </div>
    </div>
    <div class="py-1">
        <label for="password">Password</label>
        <div>
            <input class=" text-xl" type="password" placeholder="password" name="password">
        </div>
    </div>
    <div class="py-1">
        <button type="submit" class="h-full w-full bg-blue-800 hover:bg-blue-400 hover:transition">Login</button>
    </div>
</form>
