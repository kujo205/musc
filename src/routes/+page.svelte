<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { signIn } from '$lib/auth-client';
</script>

<h1>Welcome to Musc</h1>

<Button onclick={signIn}>Sign in</Button>
