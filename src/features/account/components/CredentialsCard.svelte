<script lang="ts" module>
  import { type SuperValidated, type Infer } from 'sveltekit-superforms';
  import type { TCredentialSchema } from '$features/account/schemas';
  import { daysLeft } from '$lib/utils';

  interface Props {
    form: SuperValidated<Infer<TCredentialSchema>>;
    expiresAt?: Date | null;
  }
</script>

<script>
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { credentialsSchema } from '$features/account/schemas';
  import InputField from '$comp/form_fields/InputField.svelte';
  import * as Card from '$comp/ui/card/index.js';
  import { Button } from '$comp/ui/button/index.js';
  import { invalidateAll } from '$app/navigation';

  let { form: f, expiresAt }: Props = $props();

  const form = superForm(f, {
    validators: zodClient(credentialsSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        invalidateAll();
      }
    }
  });

  let { form: formData, enhance } = form;
</script>

<form
  method="POST"
  use:enhance
  action="?/update_credentials"
  class="min-w-72 max-sm:w-full max-sm:max-w-full"
>
  <Card.Root class="">
    <Card.Header>
      <Card.Title class="flex items-center gap-2 text-lg">Credentials</Card.Title>

      <InputField
        bind:value={$formData.set_cookie}
        type="password"
        name="set_cookie"
        {form}
        label="Response Set-Cookie header"
      />

      <InputField
        bind:value={$formData.cookie}
        type="password"
        name="cookie"
        {form}
        label="Request Cookie header"
      />
    </Card.Header>

    <Card.Footer class="flex justify-between gap-8">
      <span class="text-xs text-muted-foreground">
        {#if expiresAt}
          Expires in {daysLeft(expiresAt)} days
        {/if}
      </span>
      <Button variant="secondary" type="submit">Save</Button>
    </Card.Footer>
  </Card.Root>
</form>
