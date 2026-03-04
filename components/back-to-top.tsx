'use client';

import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground shadow-sm transition-colors hover:bg-brand-cyan hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
      <span>Back to top</span>
    </button>
  );
}

