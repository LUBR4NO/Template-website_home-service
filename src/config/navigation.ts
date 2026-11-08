import { serviceOptions } from '@/config/business';
import { slugify } from '@/lib/slug';

export const serviceLinks = serviceOptions.map((label) => {
  const slug = slugify(label);
  return { id: slug, label, href: `/servicos/${slug}` };
});

export const sectionLinks = [
  { id: 'why-us', label: 'Sobre nós' },
  { id: 'service-areas', label: 'Onde atuamos' },
  { id: 'final-cta', label: 'Contacto' },
] as const;
