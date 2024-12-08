<script lang="ts" generics="T extends Record<string, unknown>">
  import * as Form from '$lib/components/ui/form';
  import type { FormPath, SuperForm } from 'sveltekit-superforms';
  import { Switch } from '$comp/ui/switch';
  import { Label } from '$comp/ui/label';

  interface Props {
    // eslint-disable-next-line no-undef
    name: FormPath<T>;
    // eslint-disable-next-line no-undef
    form: SuperForm<T>;
    label: string;
    checked: boolean;
  }
  let { checked = $bindable(), label, form, name }: Props = $props();
</script>

<Form.Field {form} {name}>
  <Form.Control>
    {#snippet children(props)}
      <div class="flex items-center space-x-2">
        <Switch {...props} bind:checked {name} />
        <Label for="in_search_for_job">{label}</Label>
      </div>
    {/snippet}
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>
