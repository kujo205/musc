<script lang="ts">
  import { Button } from '$comp/ui/button';
  import Error from '$comp/svgs/Error.svelte';
</script>

<div class="flex min-h-[50vh] flex-col items-center justify-center gap-4">
  <Error className="max-w-96 w-fit aspect-square max-h-96" />

  <div class="flex flex-col items-center justify-center">
    <h2 class="mb-2 text-2xl font-semibold">What a misfortune</h2>
    <p class="text-center">
      Due to some circumstances, we were unable to conduct a payment, please contact the support.
    </p>
  </div>

  <Button href="mailto:m.krivokhata@gmail.com">Consult support</Button>
</div>
