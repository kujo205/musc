<script lang="ts" module>
  interface MySubscriptionPlanProps {
    plan: 'free' | 'paid';
    // obtainedAtISOString: string;
  }
</script>

<script lang="ts">
  import * as Card from '$comp/ui/card/index.js';
  import { Button } from '$comp/ui/button/index.js';
  import { Calendar } from 'lucide-svelte';

  import { Badge } from '$comp/ui/badge/index.js';

  let { plan }: MySubscriptionPlanProps = $props();
</script>

<Card.Root class="max-w-96 max-sm:w-full max-sm:max-w-full">
  <Card.Header>
    <Card.Title class="flex items-center gap-2 text-lg"
      >Subscription plan
      <Badge variant="green">{plan}</Badge>
    </Card.Title>
    <!-- TODO: change with real data later on -->
    <Card.Description>1 free export left</Card.Description>
  </Card.Header>
  <Card.Content>
    <Button class="self-end" variant="default">Upgrade</Button>
  </Card.Content>
  <Card.Footer class="flex justify-between">
    <Card.Description class="flex items-center gap-1">
      <Calendar size={14} />

      Obtained at dummy date here
      <!--{new Date(obtainedAtISOString).toLocaleDateString()}-->
    </Card.Description>
  </Card.Footer>
</Card.Root>
