<script>
    import {Router, Link, Route} from "svelte-navigator";
    import Home from "./pages/Home/Home.svelte";
    import Login from "./pages/Login/Login.svelte";
    import TailwindCss from "./css/TailwindCSS.svelte";
    import {Toaster} from "svelte-french-toast";
    import {user} from "./store/userStore";
    import {BASE_URL} from "./store/globalsStore.js";
    import Logout from "./component/Logout/Logout.svelte";
    </script>

<TailwindCss/>

<main class=" font-mono h-screen">
  <Toaster/>
  <Router>
    <nav>
      <Link to="/">Home</Link>
      {#if (!$user)}
        <Link to="Login">Login</Link>
      {:else}
        <Logout/>
      {/if}
    </nav>
    <div class="h-full">
      <Route path="/">
        <Home/>
      </Route>
      <Route path="/Login">
        <Login/>
      </Route>
    </div>
  </Router>
</main>

