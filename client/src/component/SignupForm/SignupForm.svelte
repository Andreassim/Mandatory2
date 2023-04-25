<script>
    import {BASE_URL} from "../../store/globalsStore.js"
    import toast from "svelte-french-toast";
  
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
                body: body
            })

            if(!response.ok){
                throw response;
            }
            toast.success(`User created`, {
                position: "bottom-center"
                });

            //TODO Login user or move to login

        }
        catch (err){
            let body = await err.json();
            toast.error(`${err.status} ${err.statusText} \n\n ${body.message}`, {
                    position: "bottom-center"
                });
        }
    };
</script>

<form class="p-5" action="{$BASE_URL}/users" on:submit|preventDefault={handleSubmit} >
    <div class="py-1">
        <label for="email">Email</label>
        <div>
            <input class=" text-xl" type="email" placeholder="email" name="email" required>
        </div>
    </div>
    <div class="py-1">
        <label for="password">Password</label>
        <div>
            <input class=" text-xl" type="password" placeholder="password" name="password" required>
        </div>
    </div>
    <div>
        <label for="terms" class=" text-sm">Accept terms of service</label>
        <input type="checkbox" name="terms">
    </div>
    <div class="py-1">
        <button class="h-full w-full bg-blue-800 hover:bg-blue-400 hover:transition">Sign up</button>
    </div>
</form>
