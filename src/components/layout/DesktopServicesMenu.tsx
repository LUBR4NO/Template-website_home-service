import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { serviceLinks } from '@/config/navigation';

export function DesktopServicesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="desktop-services-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-1 rounded-md py-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus-visible:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-500"
      >
        Serviços
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <ul
        id="desktop-services-menu"
        hidden={!isOpen}
        className="absolute left-0 top-full z-50 mt-3 min-w-[240px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
      >
        {serviceLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
