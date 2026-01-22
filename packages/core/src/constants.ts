// @belvrr/core - Constants

// ==========================================
// Life Expectancy
// ==========================================

export const LIFE_EXPECTANCY_YEARS = 80;
export const LIFE_EXPECTANCY_WEEKS = LIFE_EXPECTANCY_YEARS * 52;

// ==========================================
// Cosmic Constants
// ==========================================

export const CONSTANTS = {
  // Earth's orbital speed: ~107,000 km/hour = ~2,571,000 km/day
  EARTH_ORBITAL_SPEED_KM_PER_DAY: 2_571_000,

  // Solar system speed through Milky Way: ~828,000 km/hour
  SOLAR_SYSTEM_SPEED_KM_PER_HOUR: 828_000,

  // Universe age: ~13.8 billion years
  UNIVERSE_AGE_YEARS: 13_800_000_000,

  // Observable universe diameter: ~93 billion light-years
  OBSERVABLE_UNIVERSE_DIAMETER_LY: 93_000_000_000,

  // Lunar cycle: 29.53 days
  LUNAR_CYCLE_DAYS: 29.53,

  // Giant sequoia lifespan: ~3,000 years
  SEQUOIA_LIFESPAN_YEARS: 3_000,

  // Human body
  HEARTBEATS_PER_DAY: 100_000,
  BREATHS_PER_DAY: 20_000,
  SLEEP_HOURS_PER_DAY: 8,

  // Population
  CURRENT_WORLD_POPULATION: 8_000_000_000, // 8 billion
  BIRTHS_PER_YEAR: 140_000_000, // ~140 million
  DEATHS_PER_YEAR: 60_000_000, // ~60 million
  LIFETIME_PEOPLE_MET: 80_000,

  // Mastery
  MASTERY_HOURS: 10_000,
} as const;

// ==========================================
// Week Grid Constants
// ==========================================

export const WEEK_GRID = {
  WEEKS_PER_YEAR: 52,
  TOTAL_YEARS: LIFE_EXPECTANCY_YEARS,
  TOTAL_WEEKS: LIFE_EXPECTANCY_WEEKS,
  ROWS: LIFE_EXPECTANCY_YEARS,
  COLS: 52,
} as const;

// ==========================================
// Color Palette
// ==========================================

export const COLORS = {
  // Background
  background: '#f9fafb',
  cardBackground: '#ffffff',

  // Text
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',

  // Week Grid
  pastWeek: '#e5e7eb',
  currentWeek: '#f97316', // Orange accent
  futureWeek: '#f3f4f6',

  // Accent
  accent: '#f97316',
  accentHover: '#ea580c',

  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
} as const;

// ==========================================
// Spacing (Tailwind-compatible)
// ==========================================

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

// ==========================================
// Typography
// ==========================================

export const TYPOGRAPHY = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// ==========================================
// Mastery Time Commitments
// ==========================================

export const MASTERY_COMMITMENTS = [
  { hoursPerWeek: 1, label: '1 hour/week' },
  { hoursPerWeek: 5, label: '5 hours/week' },
  { hoursPerWeek: 10, label: '10 hours/week' },
  { hoursPerWeek: 20, label: '20 hours/week' },
  { hoursPerWeek: 40, label: '40 hours/week (full-time)' },
] as const;

// ==========================================
// Income Streams ($100k/year breakdown)
// ==========================================

export const INCOME_STREAMS = [
  { description: '215 customers at $39/month', monthly: 39, customers: 215 },
  { description: '40 clients/quarter at $625 each', quarterly: 625, clients: 40 },
  { description: '10 sales/day at $27 each', daily: 27, sales: 10 },
  { description: '10 hours/week at $195/hour', hourlyRate: 195, hoursPerWeek: 10 },
  { description: '2 sales/day at $135 each', daily: 135, sales: 2 },
] as const;

// ==========================================
// Feature Flags (Default Values)
// ==========================================

export const DEFAULT_FEATURE_FLAGS = {
  enableAuth: false, // V1 ships without auth
  enableMilestones: false,
  enableSharing: false,
  enableDarkMode: false,
  enableMultiLanguage: true,
} as const;

// ==========================================
// Supported Languages
// ==========================================

export const SUPPORTED_LANGUAGES = ['en-US', 'es-ES', 'zh-CN'] as const;
export const DEFAULT_LANGUAGE = 'en-US';
