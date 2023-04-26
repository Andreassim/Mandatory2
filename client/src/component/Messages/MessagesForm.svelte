<script>
    import toast from "svelte-french-toast";
    import { BASE_URL } from "../../store/globalsStore";
    import { messages } from "../../store/messageStore";

    const handleSubmit = async (e) => {
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
            toast.success(`Created message`, {
                    position: "bottom-center"
            });

            toast.loading(`Updating`, {
                    position: "bottom-center",
                    duration: 1000
            });

            const getMessages = await fetch($BASE_URL + "/messages", {
                credentials: "include"
            });
            
            const json = await getMessages.json();
            $messages = json.data;
            
        }
        catch (errors){
            const response  = await errors.json();
            toast.error(`${errors.status} ${errors.statusText} \n\n ${response.message}`, {
                    position: "bottom-center"
                });
        }
    };
</script>

<form class="w-full" action="{$BASE_URL}/messages" on:submit|preventDefault={handleSubmit}>
    <input class="w-3/5" type="text" name="message" placeholder="new message">
    <button class="w-1/5 bg-blue-800 hover:bg-blue-400 hover:transition">Submit</button>
</form>