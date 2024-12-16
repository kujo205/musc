<script>
  import Logo from '$comp/ui/logo';
  import { Button } from '$comp/ui/button';
</script>

<footer class="flex w-full justify-between py-8 max-md:flex-col max-md:items-center">
  <span class="inline-flex items-center justify-center gap-2">
    <Logo />
    <span> by SpaceCrammers </span>
  </span>
  <span>
    Having trouble?
    <Button target="_blank" variant="link" href="mailto:m.krivokhata@gmail.com">Contact us</Button>
  </span>
</footer>
