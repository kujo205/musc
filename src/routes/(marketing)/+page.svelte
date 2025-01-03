<script lang="ts">
  import { Button } from '$comp/ui/button';
  import PlanCard from '$features/marketing/components/PlanCard.svelte';
  // import type { PageData } from './$types';
  import {
    Github,
    ArrowRight,
    Megaphone,
    Music,
    Share,
    UserX,
    TrendingUp,
    UsersRound
  } from 'lucide-svelte';
  import { Badge } from '$comp/ui/badge';
  import FeatureCard from '$features/marketing/components/FeatureCard.svelte';
  import PersonWithMobileSvg from '$features/marketing/svgs/PersonWithMobileSvg.svelte';
  import FunnyMusicFaceSvg from '$features/marketing/svgs/FunnyMusicFaceSvg.svelte';
  import CreditCardSvg from '$features/marketing/svgs/CreditCardSvg.svelte';

  const features = [
    {
      icon: Music,
      title: 'Public Music',
      description: 'Keep your favorite music public'
    },
    {
      icon: Share,
      title: 'Share Music',
      description: 'Share your favorite music with your friends'
    },
    {
      icon: UserX,
      title: 'No subscriptions',
      description: 'Subscribtions suck, pay once and enjoy forever'
    },
    {
      icon: TrendingUp,
      title: 'Up to date',
      description: 'Your playlists would be maintaned and kept up to day'
    },

    {
      icon: UsersRound,
      title: 'Community power',
      description: 'Browse an extensive library of public playlists'
    }
  ];
</script>

<section class="mt-16 flex justify-center gap-4 max-md:flex-col">
  <div class="flex flex-col justify-center gap-8">
    <Badge variant="secondary" class="gap-2 self-start">
      <Megaphone size={12} />
      We are in public beta!</Badge
    >
    <!--    from-indigo-400 to-indigo-950 bg-clip-text-->
    <h1
      class="w-fit animate-gradient bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.500),theme(colors.indigo.950),theme(colors.indigo.500),theme(colors.indigo.400))] bg-[length:200%_auto] bg-clip-text text-6xl font-extrabold text-transparent"
    >
      Musc
    </h1>
    <p class="max-w-[500px] text-slate-400">
      A simple way to keep your liked Youtube music public to share with your friends
    </p>
    <div class="flex gap-2">
      <Button href="/#section-pricing" variant="rainbow"
        >Try it out
        <ArrowRight class="transition-all group-hover:translate-x-1" />
      </Button>
      <Button variant="link" href="https://github.com/kujo205/musc" target="_blank">
        <Github size={32} />
        Github
      </Button>
    </div>
  </div>
  <div>
    <PersonWithMobileSvg className="max-md:max-w-64 max-w-96 max-h-96" />
  </div>
</section>

<section class="mx-auto mt-24 flex max-w-screen-lg flex-col justify-center gap-4 max-md:mt-12">
  <h1 class="text-3xl font-semibold">Features</h1>
  <div class="flex flex-wrap justify-center gap-16">
    <FunnyMusicFaceSvg className="max-w-96 max-h-96" />
  </div>
  <div class="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
    {#each features as feat}
      <FeatureCard icon={feat.icon} title={feat.title} description={feat.description} />
    {/each}
  </div>
</section>

<section
  class="mx-auto mt-24 flex max-w-screen-lg flex-col justify-center gap-4 max-md:mt-12"
></section>

<section id="section-pricing" class="mx-auto mt-16 max-w-screen-lg flex-col max-md:mt-12">
  <h1 class="text-3xl font-semibold">Pricing</h1>
  <CreditCardSvg className="max-w-96 max-md:max-w-80 max-h-96 mx-auto" />

  <div class="flex flex-1 justify-center gap-16 max-md:flex-col">
    <PlanCard
      btnTestId="sign-up-basic"
      planCookieValue="basic"
      name="Basic"
      description="Basic plan, lets you keep your exported music albums synced, you pay only once"
      price="10$"
      features={[
        'Everything in Free',
        'Unlimited music exports',
        'Exported music album syncing',
        'Advanced album management tools'
      ]}
      isOutlined={true}
    >
      {#snippet tagSnippet()}
        <Badge variant="indigo">Most Popular</Badge>
      {/snippet}
    </PlanCard>
    <PlanCard
      btnTestId="sign-up-free"
      planCookieValue="free"
      name="Starter"
      description="Designed for those willing to try out the service"
      price="Free"
      features={['Up to 3 free music exports', 'Browse Community Libraries']}
    />
  </div>
</section>
