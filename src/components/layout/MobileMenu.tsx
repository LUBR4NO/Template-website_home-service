import { useState } from 'react';
import { ChevronDown, Phone, X } from 'lucide-react';
import { business, serviceOptions } from '@/config/business';
import { serviceAreaPlaceholders } from '@/config/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface SubItem {
  label: string;
  sectionId: string;
}

const serviceSubItems: SubItem[] = serviceOptions.map((label) => ({ label, sectionId: 'services' }));
const areaSubItems: SubItem[] = serviceAreaPlaceholders.map((label) => ({ label, sectionId: 'service-areas' }));

const itemButtonClass =
  'flex w-full items-center justify-between px-4 py-4 text-left text-base font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400';

const subItemButtonClass =
  'block w-full py-4 pl-8 pr-4 text-left text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400';

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<'services' | 'areas' | null>(null);

  function toggleAccordion(key: 'services' | 'areas') {
    setOpenAccordion((current) => (current === key ? null : key));
  }

  const hasPhone = business.phoneNumber.length > 0;
  const phoneLabel = business.phoneDisplay || business.phoneNumber || '(xx) xxxxx-xxxx';

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-[60] flex flex-col bg-gray-900 text-white transition-[opacity,visibility] duration-300 ease-in-out ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="text-lg font-bold tracking-wide text-white focus:outline-none focus-visible:underline"
        >
          {business.logoText}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="rounded-md p-2 text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Menu móvel" className="flex-1 overflow-y-auto">
        <ul>
          <li className="border-b border-gray-700">
            <MenuAccordion
              label="Serviços"
              panelId="mobile-menu-services"
              isOpen={openAccordion === 'services'}
              onToggle={() => toggleAccordion('services')}
              items={serviceSubItems}
              onNavigate={onNavigate}
            />
          </li>
          <li className="border-b border-gray-700">
            <button type="button" onClick={() => onNavigate('why-us')} className={itemButtonClass}>
              Sobre
            </button>
          </li>
          <li className="border-b border-gray-700">
            <MenuAccordion
              label="Onde Trabalhamos"
              panelId="mobile-menu-areas"
              isOpen={openAccordion === 'areas'}
              onToggle={() => toggleAccordion('areas')}
              items={areaSubItems}
              onNavigate={onNavigate}
            />
          </li>
          <li className="border-b border-gray-700">
            <button type="button" onClick={() => onNavigate('final-cta')} className={itemButtonClass}>
              Contactos
            </button>
          </li>
        </ul>
      </nav>

      <div className="shrink-0">
        {hasPhone ? (
          <a
            href={`tel:${business.phoneNumber}`}
            className="flex w-full items-center justify-center gap-2 bg-gray-700 px-4 py-5 text-base font-bold text-white transition-colors hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span>{phoneLabel}</span>
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 bg-gray-700 px-4 py-5 text-base font-bold text-white opacity-60"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span>{phoneLabel}</span>
          </span>
        )}
      </div>
    </div>
  );
}

interface MenuAccordionProps {
  label: string;
  panelId: string;
  isOpen: boolean;
  onToggle: () => void;
  items: SubItem[];
  onNavigate: (sectionId: string) => void;
}

function MenuAccordion({ label, panelId, isOpen, onToggle, items, onNavigate }: MenuAccordionProps) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={itemButtonClass}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        className={`overflow-hidden transition-[max-height,visibility] duration-300 ease-in-out ${
          isOpen ? 'visible max-h-96' : 'invisible max-h-0'
        }`}
      >
        <ul>
          {items.map((item) => (
            <li key={item.label} className="border-t border-gray-700">
              <button type="button" onClick={() => onNavigate(item.sectionId)} className={subItemButtonClass}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
