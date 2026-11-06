import { Hero } from '@/components/hero/Hero';
import { PlaceholderSection } from '@/components/sections/PlaceholderSection';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ActionBar } from '@/components/layout/ActionBar';

const homepageSections = [
  {
    id: 'services',
    title: 'Serviços',
    description: 'Área reservada para os principais serviços residenciais e os problemas que resolvem.',
  },
  {
    id: 'trust',
    title: 'Confiança',
    description: 'Área reservada para provas de credibilidade e confiança.',
  },
  {
    id: 'why-us',
    title: 'Porquê nós',
    description: 'Área reservada para os diferenciadores reais da empresa.',
  },
  {
    id: 'service-areas',
    title: 'Áreas de atuação',
    description: 'Área reservada para as localidades servidas.',
  },
  {
    id: 'process',
    title: 'Como funciona',
    description: 'Área reservada para explicar como o serviço funciona, passo a passo.',
  },
  {
    id: 'faq',
    title: 'Perguntas frequentes',
    description: 'Área reservada para as perguntas mais frequentes dos clientes.',
  },
  {
    id: 'final-cta',
    title: 'Fale connosco',
    description: 'Área reservada para a ação final de contacto ou marcação.',
  },
] as const;

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <ActionBar />
      <SiteHeader />
      <main>
        <Hero />
        {homepageSections.map((section) => (
          <PlaceholderSection key={section.id} id={section.id} title={section.title} description={section.description} />
        ))}
      </main>
    </div>
  );
}
