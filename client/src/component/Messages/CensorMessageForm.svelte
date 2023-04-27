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
            const response = await fetch(ACTION_URL + "/" + formData.get("id"), {
                method: 'PATCH',
                body: body,
                credentials: "include"
            })
            if(!response.ok){
                throw response;
            }
            toast.success(`Message updated`, {
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
<div class="py-5">
    <h1>Censor messages. They do not have to be displayed in your list</h1>
    <form class="w-full" action="{$BASE_URL}/messages" on:submit|preventDefault={handleSubmit}>
        <input class="w-1/5" type="number" name="id" placeholder="message id">
        <label for="is_censored">Censor</label>
        <input type="checkbox" name="is_censored" placeholder="message id">
        <button class="w-1/5 bg-red-800 hover:bg-red-400 hover:transition">CENSOR &#x26A0</button>
    </form>
</div>