import type { ReactNode } from 'react';

interface PlaceholderSectionProps {
  id: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PlaceholderSection({ id, title, description, children }: PlaceholderSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 id={`${id}-title`} className="text-2xl font-bold leading-[1.2] text-gray-900 md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-normal text-gray-600">{description}</p>
        {children}
      </div>
    </section>
  );
}
