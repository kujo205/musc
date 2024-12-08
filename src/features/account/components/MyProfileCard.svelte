<script lang="ts" module>
  interface MyProfileCardProps {
    name: string | null | undefined;
    email: string | null | undefined;
    avatarUrl: string | null | undefined;
  }
</script>

<script lang="ts">
  import * as Card from '$comp/ui/card';

  import * as Avatar from '$comp/ui/avatar';
  import { getInitials } from '$lib/utils';

  let { name, avatarUrl, email }: MyProfileCardProps = $props();
</script>

<Card.Root class="max-w-96 max-sm:w-full max-sm:max-w-full">
  <Card.Content class="grid grid-cols-3 gap-x-2 gap-y-4">
    <span class="text-muted-foreground">Name</span>
    <p class="col-span-2 font-semibold">
      {name}
    </p>

    <span class="text-muted-foreground">Email</span>
    <p class="col-span-2 font-semibold">
      {email}
    </p>

    <p class="text-muted-foreground">Avatar</p>
    <Avatar.Root class="col-span-2">
      <Avatar.Image src={avatarUrl} alt={name} />
      <Avatar.Fallback>{getInitials(name)}</Avatar.Fallback>
    </Avatar.Root>
  </Card.Content>
</Card.Root>
