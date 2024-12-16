<script lang="ts" module>
  interface CopyBtnProps {
    text: string;
    tooltipText?: string;
  }
</script>

<script lang="ts">
  import { copyTextToClipboard } from '$lib/utils';
  import { Button } from '$comp/ui/button';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$comp/ui/tooltip';
  import { cn } from '$lib/utils';
  import { Check, Copy } from 'lucide-svelte';
  const { text, tooltipText = 'Click to copy' }: CopyBtnProps = $props();

  let copied = $state(false);

  async function handleCopy() {
    try {
      await copyTextToClipboard(text);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
</script>

<TooltipProvider delayDuration={0}>
  <Tooltip>
    <TooltipTrigger>
      <Button
        data-testid="copy-btn"
        variant="outline"
        size="icon"
        class="!p-2 disabled:opacity-100"
        onclick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        disabled={copied}
      >
        <div class={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
          <Check className="stroke-emerald-500" size={16} strokeWidth={2} aria-hidden="true" />
        </div>
        <div
          class={cn(
            'absolute transition-all',
            copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          )}
        >
          <Copy size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </Button>
    </TooltipTrigger>
    <TooltipContent class="px-2 py-1 text-xs">{tooltipText}</TooltipContent>
  </Tooltip>
</TooltipProvider>
