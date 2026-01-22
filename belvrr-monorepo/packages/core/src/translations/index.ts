// @belvrr/core - Translations Index

import type { SupportedLanguage, TranslationKeys, Translations } from '../types';
import { enUS } from './en-US';

// Spanish translations (placeholder - same as English for now)
const esES: TranslationKeys = {
  ...enUS,
  pageTitle: 'La vida en semanas',
  pageSubtitle: 'Una visualización simple para reflexionar sobre el paso del tiempo',
  birthDateQuestion: 'Ingresa una fecha de nacimiento',
  visualizeButton: 'Visualiza tu tiempo',
  startOverButton: 'Empezar de nuevo',
  lifeInWeeksTitle: 'Tu vida en semanas',
  legendPast: 'Pasado',
  legendPresent: 'Presente',
  legendFuture: 'Futuro',
  signIn: 'Iniciar sesión',
  signOut: 'Cerrar sesión',
  signInWithGoogle: 'Iniciar sesión con Google',
  signInWithApple: 'Iniciar sesión con Apple',
};

// Chinese translations (placeholder - same as English for now)
const zhCN: TranslationKeys = {
  ...enUS,
  pageTitle: '生命周历',
  pageSubtitle: '一个简单的可视化工具，帮助你反思时间的流逝',
  birthDateQuestion: '输入出生日期',
  visualizeButton: '可视化你的时间',
  startOverButton: '重新开始',
  lifeInWeeksTitle: '你的生命周历',
  legendPast: '过去',
  legendPresent: '现在',
  legendFuture: '未来',
  signIn: '登录',
  signOut: '退出',
  signInWithGoogle: '使用 Google 登录',
  signInWithApple: '使用 Apple 登录',
};

export const translations: Translations = {
  'en-US': enUS,
  'es-ES': esES,
  'zh-CN': zhCN,
};

export function getTranslation(
  language: SupportedLanguage = 'en-US'
): TranslationKeys {
  return translations[language] || translations['en-US'];
}

export function t(
  key: keyof TranslationKeys,
  language: SupportedLanguage = 'en-US'
): string {
  const translation = getTranslation(language);
  return translation[key] || key;
}

export { enUS, esES, zhCN };
