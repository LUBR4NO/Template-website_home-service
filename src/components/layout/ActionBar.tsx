import { Phone } from 'lucide-react';
import { business } from '@/config/business';
import { scrollToSection } from '@/lib/scroll';

export function ActionBar() {
  const hasPhone = business.phoneNumber.length > 0;

  return (
    <div className="sticky top-0 z-50 border-b border-gray-300 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => scrollToSection('quote-form')}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        >
          Solicitar orçamento GRATUITO
        </button>
        {hasPhone && (
          <a
            href={`tel:${business.phoneNumber}`}
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{business.phoneDisplay || business.phoneNumber}</span>
          </a>
        )}
      </div>
    </div>
  );
}
