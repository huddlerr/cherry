// @belvrr/core - Type definitions

// ==========================================
// Life Statistics Types
// ==========================================

export interface LifeStats {
  weeksLived: number;
  totalWeeks: number;
  daysLived: number;
  percentLived: number;
  yearsLived: number;
  monthsLived: number;
  hoursLived: number;
  minutesLived: number;
  secondsLived: number;
}

export interface CosmicStats {
  earthTravelKm: number;
  solarSystemTravelKm: number;
  universeAgePercent: number;
  tripsAroundSun: number;
}

export interface BodyStats {
  heartbeats: number;
  breaths: number;
  sleepHours: number;
  cellReplacements: number;
}

export interface SocietalStats {
  populationAtBirth: number;
  currentPopulation: number;
  peopleMet: number;
  birthsWorldwide: number;
  deathsWorldwide: number;
}

export interface NaturalStats {
  lunarCycles: number;
  seasons: number;
  sequoiaLifespanPercent: number;
}

export interface WeeklyTimeBudget {
  totalHours: number;
  sleepHours: number;
  workHours: number;
  remainingHours: number;
  yearlyRemaining: number;
  threeYearRemaining: number;
}

export interface MasteryStats {
  hoursPerWeek: number;
  yearsToMastery: number;
  ageAtMastery: number;
}

export interface AllStats {
  life: LifeStats;
  cosmic: CosmicStats;
  body: BodyStats;
  societal: SocietalStats;
  natural: NaturalStats;
  weeklyTime: WeeklyTimeBudget;
}

// ==========================================
// User & Auth Types
// ==========================================

export type UserRole = 'admin' | 'user';

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  birthdate: string | null;
  createdAt: number;
  updatedAt: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: SupportedLanguage;
  theme: 'light' | 'dark' | 'system';
  lifeExpectancy: number;
  notifications: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthActions {
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

// ==========================================
// Milestone Types (Future Feature)
// ==========================================

export interface Milestone {
  id: string;
  userId: string;
  title: string;
  description?: string;
  date: string;
  weekNumber: number;
  color: string;
  icon?: string;
  isPublic: boolean;
  createdAt: number;
  updatedAt: number;
}

// ==========================================
// App Configuration Types
// ==========================================

export interface AppConfig {
  version: string;
  featureFlags: FeatureFlags;
  maintenance: MaintenanceConfig;
}

export interface FeatureFlags {
  enableAuth: boolean;
  enableMilestones: boolean;
  enableSharing: boolean;
  enableDarkMode: boolean;
  enableMultiLanguage: boolean;
}

export interface MaintenanceConfig {
  isEnabled: boolean;
  message: string;
  estimatedEndTime?: number;
}

// ==========================================
// Internationalization Types
// ==========================================

export type SupportedLanguage = 'en-US' | 'es-ES' | 'zh-CN';

export interface TranslationKeys {
  // Page
  pageTitle: string;
  pageSubtitle: string;
  
  // Input
  birthDateQuestion: string;
  visualizeButton: string;
  startOverButton: string;
  
  // Week Grid
  lifeInWeeksTitle: string;
  weekHoverPast: string;
  weekHoverCurrent: string;
  weekHoverFuture: string;
  legendPast: string;
  legendPresent: string;
  legendFuture: string;
  
  // Life Highlights
  lifeHighlightsTitle: string;
  lifeHighlightsWeeks: string;
  lifeHighlightsWeeksEnd: string;
  lifeHighlightsPercent: string;
  lifeHighlightsDays: string;
  lifeHighlightsDaysEnd: string;
  lifeHighlightsSeasonsEnd: string;
  lifeHighlightsHeartbeats: string;
  lifeHighlightsHeartbeatsEnd: string;
  lifeHighlightsBreaths: string;
  lifeHighlightsBreathsMiddle: string;
  lifeHighlightsBreathsEnd: string;
  
  // Societal Context
  societalContextTitle: string;
  societalPopulation: string;
  societalPopulationEnd: string;
  societalPopulationFinal: string;
  societalMeetings: string;
  societalMeetingsMiddle: string;
  societalMeetingsEnd: string;
  societalBirthsDeaths: string;
  societalBirthsMiddle: string;
  societalDeathsEnd: string;
  
  // Cosmic Perspective
  cosmicPerspectiveTitle: string;
  cosmicEarthTravel: string;
  cosmicEarthTravelEnd: string;
  cosmicUniverse: string;
  cosmicUniverseMiddle: string;
  cosmicUniverseMiddle2: string;
  cosmicUniverseEnd: string;
  cosmicSolarSystem: string;
  cosmicSolarSystemEnd: string;
  
  // Natural World
  naturalWorldTitle: string;
  naturalLunarCycles: string;
  naturalLunarMiddle: string;
  naturalLunarEnd: string;
  naturalSequoia: string;
  naturalSequoiaEnd: string;
  naturalCells: string;
  
  // Weekly Time
  weeklyTimeTitle: string;
  weeklyTimeTotal: string;
  weeklyTimeSleep: string;
  weeklyTimeWork: string;
  weeklyTimeRemaining: string;
  weeklyTimeContext: string;
  weeklyTimeCompound: string;
  
  // Mastery
  masteryTitle: string;
  masteryIntro: string;
  masteryContext: string;
  masteryContextEnd: string;
  
  // Opportunity
  opportunityTitle: string;
  incomeStreamsTitle: string;
  incomeStream1: string;
  incomeStream2: string;
  incomeStream3: string;
  incomeStream4: string;
  incomeStream5: string;
  incomeFooter: string;
  
  // Auth (Placeholder)
  signIn: string;
  signOut: string;
  signInWithGoogle: string;
  signInWithApple: string;
  welcomeBack: string;
  createAccount: string;
}

export type Translations = Record<SupportedLanguage, TranslationKeys>;

// ==========================================
// Component Props Types
// ==========================================

export interface WeekGridProps {
  weeksLived: number;
  totalWeeks: number;
  milestones?: Milestone[];
  onWeekClick?: (weekNumber: number) => void;
}

export interface StatsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface BirthdateInputProps {
  onSubmit: (birthdate: string) => void;
  initialValue?: string;
}
