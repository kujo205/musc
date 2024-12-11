<script lang="ts">
  import type { PageData } from './$types';
  import MyProfileCard from '$features/account/components/MyProfileCard.svelte';
  import MySubscriptionPlan from '$features/account/components/MySubscriptionPlanCard.svelte';
  import CredentialsCard from '$features/account/components/CredentialsCard.svelte';
  import Steps from '$comp/custom/Steps.svelte';
  import { Button } from '$comp/ui/button';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let user = $derived(data.info.user);
</script>

<main class="flex flex-col gap-8">
  <section class="flex flex-col gap-8">
    <h2 class="text-xl font-semibold">User's information</h2>
    <div class="flex flex-wrap gap-6">
      <MySubscriptionPlan plan="free" />
      <MyProfileCard name={user.name} email={user.email} avatarUrl={user.image} />
      <CredentialsCard form={data.form} expiresAt={data?.expiresAt} />
    </div>
  </section>

  <section class="flex flex-col gap-8">
    <h2 class="text-xl font-semibold">Credentials configuration</h2>
    <Steps className="flex flex-col gap-8">
      <div>
        <h3 class="step">Open a new browser window in incognito mode from your laptop</h3>
        <img alt="step1" class="aspect-video h-56 object-cover" src="/credentials/step1.png" />
      </div>

      <div>
        <h3 class="step">
          Go to <Button
            target="_blank"
            class="px-1 text-lg text-indigo-500"
            href="https://music.youtube.com/"
            variant="link">music.youtube.com</Button
          > and enter your account
        </h3>
      </div>

      <div>
        <h3 class="step">Right click with your mouse button and select "Inspect"</h3>
        <img alt="step3" class="aspect-video h-56 object-cover" src="/credentials/step3.png" />
      </div>

      <div>
        <h3 class="step">Choose "network" tab and enter "browse" in the search bar</h3>
        <img alt="step4" class="aspect-video h-56 object-cover" src="/credentials/step4.png" />
      </div>

      <div>
        <h3 class="step">
          Move across the yt music app a little bit until you see browse requests in your network
          tab, hit one of the requests and choose "Headers" tab
        </h3>
        <img alt="step5" class="aspect-video h-56 object-cover" src="/credentials/step5.png" />
      </div>

      <div>
        <h3 class="step">Copy "Set-Cookie" header</h3>
        <p>Open "Response Headers" and find "Set-Cookie" header, copy the value to the clipboard</p>
        <img alt="step6.png" class="aspect-video h-56 object-cover" src="/credentials/step6.png" />
      </div>

      <div>
        <h3 class="step">Paste this value into "Set-Cookie field on the platform</h3>
        <img alt="step7.png" class="aspect-video h-56 object-cover" src="/credentials/step7.png" />
      </div>

      <div>
        <h3 class="step">
          Going back to the browser, select "Request headers", scroll until you see "Cookie" header
          and copy all the value from the start to the end
        </h3>
        <img alt="step8" class="aspect-video h-56" src="/credentials/step8.png" />
      </div>

      <div>
        <h3 class="step">Paste this value into "Cookie field on the platform</h3>
        <img alt="step9.png" class="aspect-video h-56 object-cover" src="/credentials/step9.png" />
      </div>
      <h3 class="step">
        Hit "Save" button, that's it, now you can enjoy our services following
        <Button variant="link" href="/dashboard/my_playlists" class="px-1 text-lg text-indigo-500"
          >this page</Button
        >
      </h3>
    </Steps>
  </section>
</main>
