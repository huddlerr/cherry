// @belvrr/core - Formatting Utilities

import type { SupportedLanguage } from './types';

// ==========================================
// Number Formatting
// ==========================================

/**
 * Format a number with locale-specific thousands separators
 */
export function formatNumber(
  num: number,
  locale: SupportedLanguage = 'en-US'
): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format a large number with abbreviation (K, M, B, T)
 */
export function formatLargeNumber(
  num: number,
  locale: SupportedLanguage = 'en-US'
): string {
  const abbreviations = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  for (const { value, symbol } of abbreviations) {
    if (Math.abs(num) >= value) {
      const formatted = (num / value).toFixed(1);
      // Remove trailing .0
      const clean = formatted.endsWith('.0')
        ? formatted.slice(0, -2)
        : formatted;
      return `${clean}${symbol}`;
    }
  }

  return formatNumber(num, locale);
}

/**
 * Format a percentage with specified decimal places
 */
export function formatPercent(
  num: number,
  decimals: number = 2,
  locale: SupportedLanguage = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num / 100);
}

/**
 * Format a very small percentage (scientific notation range)
 */
export function formatTinyPercent(num: number, decimals: number = 10): string {
  return num.toFixed(decimals) + '%';
}

// ==========================================
// Date Formatting
// ==========================================

/**
 * Format a date for display
 */
export function formatDate(
  date: Date | string,
  locale: SupportedLanguage = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
    dateObj
  );
}

/**
 * Format a date as relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(
  date: Date | string,
  locale: SupportedLanguage = 'en-US'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return rtf.format(-diffMinutes, 'minute');
    }
    return rtf.format(-diffHours, 'hour');
  }

  if (diffDays < 7) {
    return rtf.format(-diffDays, 'day');
  }

  if (diffDays < 30) {
    return rtf.format(-Math.floor(diffDays / 7), 'week');
  }

  if (diffDays < 365) {
    return rtf.format(-Math.floor(diffDays / 30), 'month');
  }

  return rtf.format(-Math.floor(diffDays / 365), 'year');
}

// ==========================================
// Time Formatting
// ==========================================

/**
 * Format hours into a readable string (e.g., "1,234 hours" or "2.5 years")
 */
export function formatHours(
  hours: number,
  locale: SupportedLanguage = 'en-US'
): string {
  if (hours < 24) {
    return `${formatNumber(hours, locale)} hours`;
  }

  if (hours < 168) {
    // Less than a week
    const days = Math.round(hours / 24 * 10) / 10;
    return `${formatNumber(days, locale)} days`;
  }

  if (hours < 8760) {
    // Less than a year
    const weeks = Math.round(hours / 168 * 10) / 10;
    return `${formatNumber(weeks, locale)} weeks`;
  }

  const years = Math.round(hours / 8760 * 10) / 10;
  return `${formatNumber(years, locale)} years`;
}

/**
 * Format duration in human-readable format
 */
export function formatDuration(
  seconds: number,
  locale: SupportedLanguage = 'en-US'
): string {
  const units = [
    { value: 31536000, label: 'year' },
    { value: 2592000, label: 'month' },
    { value: 604800, label: 'week' },
    { value: 86400, label: 'day' },
    { value: 3600, label: 'hour' },
    { value: 60, label: 'minute' },
    { value: 1, label: 'second' },
  ];

  for (const { value, label } of units) {
    if (seconds >= value) {
      const count = Math.floor(seconds / value);
      const plural = count !== 1 ? 's' : '';
      return `${formatNumber(count, locale)} ${label}${plural}`;
    }
  }

  return '0 seconds';
}

// ==========================================
// Distance Formatting
// ==========================================

/**
 * Format distance in kilometers with appropriate units
 */
export function formatDistance(
  km: number,
  locale: SupportedLanguage = 'en-US'
): string {
  if (km >= 1e12) {
    return `${formatLargeNumber(km, locale)} km`;
  }

  if (km >= 1e9) {
    const billion = km / 1e9;
    return `${billion.toFixed(1)} billion km`;
  }

  if (km >= 1e6) {
    const million = km / 1e6;
    return `${million.toFixed(1)} million km`;
  }

  return `${formatNumber(Math.round(km), locale)} km`;
}

// ==========================================
// Age Formatting
// ==========================================

/**
 * Format age in years and months
 */
export function formatAge(
  yearsDecimal: number,
  locale: SupportedLanguage = 'en-US'
): string {
  const years = Math.floor(yearsDecimal);
  const months = Math.round((yearsDecimal - years) * 12);

  if (months === 0 || months === 12) {
    return `${formatNumber(years + (months === 12 ? 1 : 0), locale)} years`;
  }

  return `${formatNumber(years, locale)} years, ${months} months`;
}

/**
 * Calculate and format age from birthdate
 */
export function getAgeFromBirthdate(
  birthdate: string,
  locale: SupportedLanguage = 'en-US'
): string {
  const birth = new Date(birthdate);
  const now = new Date();
  const yearsDecimal =
    (now.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return formatAge(yearsDecimal, locale);
}
