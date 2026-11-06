// Single place to configure business details for the prototype.
// Leave whatsappNumber or phoneNumber empty until real numbers are available.
// Use international format with digits only, e.g. "351912345678" (Portugal) or "5511912345678" (Brazil).

export const business = {
  name: 'Sua Empresa',
  logoText: 'SUA MARCA',
  phoneNumber: '',
  phoneDisplay: '',
  whatsappNumber: '',
  heroBackgroundImage: '',
};

export const serviceOptions: readonly string[] = [
  'Canalização',
  'Eletricidade',
  'Limpeza',
  'Pintura',
  'Climatização',
  'Desentupimentos',
];

export const heroCopy = {
  headline: 'Título principal: o que a sua empresa faz e onde atua',
  body: 'Texto de apoio: descreva o problema do cliente, a sua área de atuação e o principal benefício do seu serviço.',
};
