import { business, heroCopy } from '@/config/business';
import { QuoteForm } from '@/components/hero/QuoteForm';

export function Hero() {
  const backgroundStyle = business.heroBackgroundImage
    ? { backgroundImage: `url("${business.heroBackgroundImage}")` }
    : undefined;

  return (
    <section id="hero" className="relative isolate scroll-mt-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gray-500 bg-cover bg-center"
        style={backgroundStyle}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gray-900/60" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="text-left text-white">
          <h1 className="text-3xl font-bold leading-[1.2] sm:text-4xl lg:text-5xl">{heroCopy.headline}</h1>
          <p className="mt-4 max-w-xl text-base leading-normal text-gray-100 sm:text-lg">{heroCopy.body}</p>
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
