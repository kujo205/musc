<script lang="ts" generics="T extends Record<string, unknown>">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import type { FormPath, SuperForm } from 'sveltekit-superforms';
  import type { HTMLInputAttributes } from 'svelte/elements';

  import { cn } from '$lib/utils';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';

  interface Props extends Omit<HTMLInputAttributes, 'name' | 'abort'> {
    name: FormPath<T>;
    form: SuperForm<T> | any;
    label: string;

    isTextarea?: boolean;
  }

  let {
    value = $bindable(),
    form,
    name,
    class: className,
    type = 'text',
    isTextarea = false,
    min,
    max,
    label,
    ...rest
  }: Props = $props();
</script>

<Form.Field {form} {name} class={cn('w-full', className)}>
  <Form.Control>
    {#snippet children({ props })}
      <Form.Label>
        {#snippet children()}
          {label}
        {/snippet}
      </Form.Label>
      {#if isTextarea}
        <Textarea
          {...props}
          minlength={Number(min)}
          maxlength={Number(max)}
          bind:value
          placeholder={rest.placeholder}
        />
      {:else}
        <Input {type} {...rest} {...props} bind:value />
      {/if}
    {/snippet}
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>
