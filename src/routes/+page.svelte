<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import type { PageData } from './$types';

  let data: PageData = $props();

  function signWithGoogle() {
    signIn('google');
  }
  function logOut() {
    signOut();
  }
</script>

<h1>Welcome to Musc</h1>
<Button onclick={signWithGoogle}>Sign in</Button>
<Button onclick={logOut}>Sign out</Button>
<pre>
  {JSON.stringify(data, null, 2)}
</pre>
