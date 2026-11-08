import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { business } from '@/config/business';
import { sectionLinks, serviceLinks } from '@/config/navigation';
import { scrollToSection } from '@/lib/scroll';
import { DesktopServicesMenu } from '@/components/layout/DesktopServicesMenu';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      setIsMobileServicesOpen(false);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  }

  function handleNavigate(sectionId: string) {
    closeMenu();
    scrollToSection(sectionId);
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            handleNavigate('hero');
          }}
          className="text-lg font-bold tracking-wide text-gray-900"
        >
          {business.logoText}
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <DesktopServicesMenu />
            </li>
            {sectionLinks.map((link) => (
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
          onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="rounded-md p-2 text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 md:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'grid-rows-[1fr] border-t border-gray-200' : 'grid-rows-[0fr]'
        }`}
      >
        <nav aria-label="Menu móvel" className="min-h-0">
          <ul className="flex flex-col px-4 py-2">
            <li>
              <button
                type="button"
                tabIndex={isMenuOpen ? 0 : -1}
                aria-expanded={isMobileServicesOpen}
                aria-controls="mobile-services-menu"
                onClick={() => setIsMobileServicesOpen((open) => !open)}
                className="flex min-h-[48px] w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
              >
                Serviços
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <ul
                id="mobile-services-menu"
                hidden={!isMobileServicesOpen}
                className="ml-3 flex flex-col border-l border-gray-200 pl-3 pb-2"
              >
                {serviceLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      tabIndex={isMenuOpen ? 0 : -1}
                      onClick={closeMenu}
                      className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            {sectionLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(link.id);
                  }}
                  className="flex min-h-[48px] items-center rounded-md px-3 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
