import { Calendar, Phone } from 'lucide-react';
import { business } from '@/config/business';
import { scrollToSection } from '@/lib/scroll';

const columnBase =
  'flex flex-1 flex-col items-center justify-center gap-1 px-2 py-3 text-center text-xs font-bold uppercase leading-tight tracking-wide text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500';

export function ActionBar() {
  const hasPhone = business.phoneNumber.length > 0;
  const phoneLabel = business.phoneDisplay || business.phoneNumber || '(xx) xxxxx-xxxx';

  return (
    <div className="sticky top-0 z-50 h-[72px] border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-6xl">
        <button
          type="button"
          onClick={() => scrollToSection('quote-form')}
          className={`${columnBase} hover:bg-gray-50`}
        >
          <Calendar className="h-5 w-5" aria-hidden="true" />
          <span>Pedir orçamento gratuito</span>
        </button>

        <div className="my-0 w-px self-stretch bg-gray-200" aria-hidden="true" />

        {hasPhone ? (
          <a href={`tel:${business.phoneNumber}`} className={`${columnBase} hover:bg-gray-50`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span>{phoneLabel}</span>
          </a>
        ) : (
          <span aria-disabled="true" className={`${columnBase} cursor-not-allowed opacity-50`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span>{phoneLabel}</span>
          </span>
        )}
      </div>
    </div>
  );
}
