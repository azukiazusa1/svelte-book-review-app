<script lang="ts">
  import Tailwindcss from './Tailwindcss.svelte';
  import Header from './components/Header.svelte'
  import Router from 'svelte-spa-router'
  import { routes } from './router'
</script>

<Tailwindcss />
<Header />
<main class="pt-16">
  <div class="container mx-auto px-6 my-4">
    <Router {routes} />
  </div>
</main>