<script>
    import {Router, Link, Route} from "svelte-navigator";
    import Home from "./pages/Home/Home.svelte";
    import Login from "./pages/Login/Login.svelte";
    import TailwindCss from "./css/TailwindCSS.svelte";
    import {Toaster} from "svelte-french-toast";
</script>

<TailwindCss/>

<main class=" font-mono h-screen">
  <Toaster/>
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="Login">Login</Link>
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

