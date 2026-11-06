import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { business, serviceOptions } from '@/config/business';
import {
  buildQuoteMessage,
  buildWhatsappUrl,
  isFilledText,
  isValidWhatsappNumber,
} from '@/lib/whatsapp';

const LOCATION_MIN_LENGTH = 3;

export function QuoteForm() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [serviceTouched, setServiceTouched] = useState(false);
  const [locationTouched, setLocationTouched] = useState(false);

  const isWhatsappConfigured = isValidWhatsappNumber(business.whatsappNumber);
  const isServiceValid = service !== '' && serviceOptions.includes(service);
  const isLocationValid = isFilledText(location, LOCATION_MIN_LENGTH);
  const canSubmit = isWhatsappConfigured && isServiceValid && isLocationValid;

  const showServiceError = serviceTouched && !isServiceValid;
  const showLocationError = locationTouched && !isLocationValid;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServiceTouched(true);
    setLocationTouched(true);
    if (!canSubmit) return;

    const message = buildQuoteMessage(service, location.trim());
    const url = buildWhatsappUrl(business.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const inputBaseClass =
    'w-full rounded-md border bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500';

  return (
    <form
      id="quote-form"
      onSubmit={handleSubmit}
      noValidate
      className="w-full scroll-mt-20 rounded-xl bg-white p-6 shadow-lg sm:p-8"
    >
      <h2 className="text-xl font-bold leading-[1.2] text-gray-900 sm:text-2xl">
        Peça o seu Orçamento GRATUITO hoje
      </h2>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="quote-service" className="sr-only">
            Serviço
          </label>
          <select
            id="quote-service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            onBlur={() => setServiceTouched(true)}
            aria-invalid={showServiceError}
            aria-describedby={showServiceError ? 'quote-service-error' : undefined}
            className={`${inputBaseClass} ${showServiceError ? 'border-gray-900' : 'border-gray-300'}`}
          >
            <option value="">Escolha o Serviço</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showServiceError && (
            <p id="quote-service-error" className="mt-1 text-sm text-gray-900">
              Escolha um serviço para continuar.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-location" className="sr-only">
            Localização
          </label>
          <input
            id="quote-location"
            type="text"
            value={location}
            placeholder="Código Postal / CEP / Localização"
            autoComplete="postal-code"
            onChange={(event) => setLocation(event.target.value)}
            onBlur={() => setLocationTouched(true)}
            aria-invalid={showLocationError}
            aria-describedby={showLocationError ? 'quote-location-error' : undefined}
            className={`${inputBaseClass} ${showLocationError ? 'border-gray-900' : 'border-gray-300'}`}
          />
          {showLocationError && (
            <p id="quote-location-error" className="mt-1 text-sm text-gray-900">
              Indique o código postal, CEP ou localização (mínimo de {LOCATION_MIN_LENGTH} caracteres).
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Solicitar orçamento GRATUITO
        </button>

        {!isWhatsappConfigured && (
          <p role="status" className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800">
            O número de WhatsApp ainda não está configurado. Defina o número do negócio para ativar este botão.
          </p>
        )}
      </div>
    </form>
  );
}
