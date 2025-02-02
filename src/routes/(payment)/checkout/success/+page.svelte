<script lang="ts">
  import { Button } from '$comp/ui/button';
  import ThankU from '$comp/svgs/ThankU.svelte';
</script>

<div class="flex min-h-[50vh] flex-col items-center justify-center gap-4">
  <ThankU className="max-w-96 w-fit aspect-square max-h-96" />

  <div class="flex flex-col items-center justify-center">
    <h2 class="text-2xl font-semibold">Thank you for your payment!</h2>
    <p class="text-center">Your payment was successful, please proceed to your dashboard.</p>
  </div>

  <Button href="/dashboard">Proceed to dashboard</Button>
</div>
