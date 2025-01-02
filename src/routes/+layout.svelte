<script lang="ts">
  import '../app.css';
  import { type LayoutData } from './$types';
  import { Toaster } from '$lib/components/ui/sonner';

  import Header from '$features/header-footer/Header.svelte';
  import Footer from '$features/header-footer/Footer.svelte';
  import type { Snippet } from 'svelte';
  import Modal from '$comp/custom/Modal.svelte';

  let {
    children,
    data
  }: {
    children: Snippet;
    data: LayoutData;
  } = $props();
</script>

<Toaster richColors={true} />

<Modal />

<svelte:head>
  <title>Musc</title>
  <meta name="description" content="Musc - share and sink your liked Youtube Music with ease" />
</svelte:head>

<Header authorized={data.authorized} />
<div class="mx-4 md:mx-16">
  <main class="mb-24 mt-8">
    {@render children()}
  </main>
  <Footer />
</div>
