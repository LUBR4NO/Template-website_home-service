import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { business } from '@/config/business';
import { navigationLinks } from '@/config/navigation';
import { scrollToSection } from '@/lib/scroll';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  function handleNavigate(sectionId: string) {
    setIsMenuOpen(false);
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
          onClick={() => setIsMenuOpen((open) => !open)}
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
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(link.id);
                  }}
                  className="block rounded-md px-3 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
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
