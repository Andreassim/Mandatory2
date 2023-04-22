<script>
    import LoginForm from "../../component/LoginForm/LoginForm.svelte";
    import SignupForm from "../../component/SignupForm/SignupForm.svelte";
    const forms = [LoginForm, SignupForm];

    let viewportComponent = null;
    let currentForm = 0;

    function toggleSignUp(){
        currentForm = 1
    
    };
    function toggleLogin(){
        currentForm = 0
    
    };

    function updateViewportComponent() {
		viewportComponent = forms[currentForm]
	}
	updateViewportComponent()

</script>

<div class="border-2 rounded-md">
    <div class="grid grid-cols-10">
        <div class="col-span-5 py-2 h-100 w-100 border-r hover:bg-slate-500 {currentForm === 0 ? 'bg-slate-500' : ''}" on:click={toggleLogin} on:keydown={toggleLogin}>
            <h1>Login</h1>
        </div>
        <div class="col-span-5 py-2 h-100 w-100 border-l hover:bg-slate-500 {currentForm === 1 ? 'bg-slate-500' : ''}" on:click={toggleSignUp} on:keydown={toggleSignUp}>
            <h1>Sign up</h1>        
        </div>
    </div>
    <div>
        {#if viewportComponent == forms[currentForm] }
            <LoginForm/>
            {:else}
            <SignupForm/>
        {/if}
    </div>
</div>
