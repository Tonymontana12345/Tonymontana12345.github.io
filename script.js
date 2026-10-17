const languageToggle = document.getElementById('language-toggle');
const translatedElements = document.querySelectorAll('[data-en]');
const translatedAttributes = document.querySelectorAll('[data-en-aria-label], [data-en-alt]');
const description = document.querySelector('meta[name="description"]');

translatedElements.forEach((element) => {
  element.dataset.ko = element.innerHTML;
});

translatedAttributes.forEach((element) => {
  if (element.hasAttribute('data-en-aria-label')) {
    element.dataset.koAriaLabel = element.getAttribute('aria-label') || '';
  }
  if (element.hasAttribute('data-en-alt')) {
    element.dataset.koAlt = element.getAttribute('alt') || '';
  }
});

function setLanguage(language) {
  const isEnglish = language === 'en';

  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;

  translatedElements.forEach((element) => {
    element.innerHTML = isEnglish ? element.dataset.en : element.dataset.ko;
  });

  translatedAttributes.forEach((element) => {
    if (element.hasAttribute('data-en-aria-label')) {
      element.setAttribute('aria-label', isEnglish ? element.dataset.enAriaLabel : element.dataset.koAriaLabel);
    }
    if (element.hasAttribute('data-en-alt')) {
      element.setAttribute('alt', isEnglish ? element.dataset.enAlt : element.dataset.koAlt);
    }
  });

  languageToggle.textContent = isEnglish ? '한국어' : 'EN';
  languageToggle.setAttribute('aria-label', isEnglish ? '한국어로 보기' : 'View in English');
  languageToggle.setAttribute('aria-pressed', String(isEnglish));

  document.title = isEnglish ? 'Tony Montana | AI & Systems Developer' : 'Tony Montana | AI Developer';
  description.setAttribute(
    'content',
    isEnglish
      ? 'Tony Montana’s AI developer portfolio, featuring 15 years of semiconductor equipment software and middleware experience alongside RAG, AI agent, and edge AI projects.'
      : 'Tony Montana의 AI 개발자 포트폴리오. 15년간의 반도체 장비 SW·미들웨어 경험과 RAG, AI Agent, Edge AI 프로젝트를 소개합니다.'
  );

  localStorage.setItem('portfolio-language', language);
}

languageToggle.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'en' ? 'ko' : 'en');
});

setLanguage(localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'ko');
