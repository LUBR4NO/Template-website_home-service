export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${sectionId}`);
}
