import { useEffect, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { business, serviceOptions } from '@/config/business';
import { navigationLinks } from '@/config/navigation';
import { scrollToSection } from '@/lib/scroll';

type AccordionId = 'services' | 'areas';

const areaOptions = ['Área 1', 'Área 2', 'Área 3', 'Área 4'];

const hasPhone = business.phoneNumber.length > 0;
const phoneLabel = business.phoneDisplay || business.phoneNumber || '(xx) xxxxx-xxxx';

interface BrandLogoProps {
  onClick: () => void;
}

function BrandLogo({ onClick }: BrandLogoProps) {
  return (
    <a
      href="#hero"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
      className="shrink-0"
    >
      {business.logoImage ? (
        <img
          src={business.logoImage}
          alt={business.name}
          className="block h-auto w-auto max-h-12 max-w-[160px] object-contain"
        />
      ) : (
        <span className="text-lg font-bold tracking-wide text-gray-900">{business.logoText}</span>
      )}
    </a>
  );
}

interface DrawerAccordionProps {
  label: string;
  panelId: string;
  isOpen: boolean;
  onToggle: () => void;
  options: readonly string[];
  sectionId: string;
  onNavigate: (sectionId: string) => void;
}

function DrawerAccordion({ label, panelId, isOpen, onToggle, options, sectionId, onNavigate }: DrawerAccordionProps) {
  return (
    <li className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500"
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        className={`overflow-hidden transition-[max-height,visibility] duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'invisible max-h-0'
        }`}
      >
        <ul>
          {options.map((option) => (
            <li key={option}>
              <a
                href={`#${sectionId}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(sectionId);
                }}
                className="block px-6 py-3 text-sm text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500"
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<AccordionId | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  function toggleMenu() {
    setOpenAccordion(null);
    setIsMenuOpen((open) => !open);
  }

  function handleNavigate(sectionId: string) {
    setIsMenuOpen(false);
    scrollToSection(sectionId);
  }

  function toggleAccordion(id: AccordionId) {
    setOpenAccordion((current) => (current === id ? null : id));
  }

  const drawerClass = `absolute inset-x-0 top-0 z-50 flex flex-col bg-white transition-[max-height,visibility] duration-300 ease-in-out md:hidden ${
    isMenuOpen ? 'max-h-[85vh] overflow-y-auto border-b border-gray-200 shadow-lg' : 'invisible max-h-0 overflow-hidden'
  }`;

  const linkItemClass =
    'block px-4 py-4 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500';

  return (
    <header className="relative border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <BrandLogo onClick={() => handleNavigate('hero')} />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(link.id);
                  }}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus-visible:text-gray-900 focus-visible:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="rounded-md p-2 text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 md:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-menu" className={drawerClass} aria-hidden={!isMenuOpen}>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <BrandLogo onClick={() => handleNavigate('hero')} />
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar menu"
            className="rounded-md p-2 text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Menu móvel" className="border-t border-gray-200">
          <ul>
            <DrawerAccordion
              label="Serviços"
              panelId="mobile-menu-services"
              isOpen={openAccordion === 'services'}
              onToggle={() => toggleAccordion('services')}
              options={serviceOptions}
              sectionId="services"
              onNavigate={handleNavigate}
            />
            <li className="border-b border-gray-200">
              <a
                href="#why-us"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate('why-us');
                }}
                className={linkItemClass}
              >
                Sobre
              </a>
            </li>
            <DrawerAccordion
              label="Onde Trabalhamos"
              panelId="mobile-menu-areas"
              isOpen={openAccordion === 'areas'}
              onToggle={() => toggleAccordion('areas')}
              options={areaOptions}
              sectionId="service-areas"
              onNavigate={handleNavigate}
            />
            <li className="border-b border-gray-200">
              <a
                href="#final-cta"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate('final-cta');
                }}
                className={linkItemClass}
              >
                Contactos
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          {hasPhone ? (
            <a
              href={`tel:${business.phoneNumber}`}
              className="flex w-full items-center justify-center gap-2 bg-gray-100 px-4 py-4 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>{phoneLabel}</span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 bg-gray-100 px-4 py-4 text-base font-semibold text-gray-900 opacity-50"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>{phoneLabel}</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
