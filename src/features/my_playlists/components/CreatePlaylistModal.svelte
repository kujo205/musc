<script lang="ts" module>
  import { type SuperValidated, type Infer } from 'sveltekit-superforms';
  import type { TCredentialSchema } from '$features/account/schemas';

  interface Props {
    form: SuperValidated<Infer<TCredentialSchema>>;
    expiresAt?: Date | null;
  }
</script>

<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog';

  import { cn } from '$lib/utils';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { form }: Props = $props();
  // import InputField from '$comp/form_fields/InputField.svelte';
</script>

<Dialog.Root>
  <Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }), 'ml-2')}>Create</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create playlist</Dialog.Title>
      <Dialog.Description>
        Create new playlist of your favorite songs. Give it a name and description.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <!--      <InputField name="name" label="Name" />-->
    </div>
    <Dialog.Footer>
      <Button type="submit">Save changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!--<script>-->
<!--  import { superForm } from 'sveltekit-superforms';-->
<!--  import { zodClient } from 'sveltekit-superforms/adapters';-->
<!--  import { credentialsSchema } from '$features/account/schemas';-->
<!--  import InputField from '$comp/form_fields/InputField.svelte';-->
<!--  import * as Card from '$comp/ui/card/index.js';-->
<!--  import { Button } from '$comp/ui/button/index.js';-->
<!--  import { invalidateAll } from '$app/navigation';-->

<!--  let { form: f, expiresAt }: Props = $props();-->

<!--  const form = superForm(f, {-->
<!--    validators: zodClient(credentialsSchema),-->
<!--    onUpdated: ({ form: f }) => {-->
<!--      if (f.valid) {-->
<!--        invalidateAll();-->
<!--      }-->
<!--    }-->
<!--  });-->

<!--  let { form: formData, enhance } = form;-->
<!--</script>-->

<!--<form-->
<!--  method="POST"-->
<!--  use:enhance-->
<!--  action="?/update_credentials"-->
<!--  class="min-w-72 max-sm:w-full max-sm:max-w-full"-->
<!--&gt;-->
<!--  <Card.Root class="">-->
<!--    <Card.Header>-->
<!--      <Card.Title class="flex items-center gap-2 text-lg">Credentials</Card.Title>-->

<!--      <InputField-->
<!--        bind:value={$formData.set_cookie}-->
<!--        type="password"-->
<!--        name="set_cookie"-->
<!--        {form}-->
<!--        label="Response Set-Cookie header"-->
<!--      />-->

<!--      <InputField-->
<!--        bind:value={$formData.cookie}-->
<!--        type="password"-->
<!--        name="cookie"-->
<!--        {form}-->
<!--        label="Request Cookie header"-->
<!--      />-->
<!--    </Card.Header>-->

<!--    <Card.Footer class="flex justify-between gap-8">-->
<!--      <span class="text-xs text-muted-foreground">-->
<!--        {#if expiresAt}-->
<!--          Expires in {daysLeft(expiresAt)} days-->
<!--        {/if}-->
<!--      </span>-->
<!--      <Button variant="secondary" type="submit">Save</Button>-->
<!--    </Card.Footer>-->
<!--  </Card.Root>-->
<!--</form>-->
