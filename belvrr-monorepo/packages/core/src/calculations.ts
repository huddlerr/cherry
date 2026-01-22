// @belvrr/core - Life Statistics Calculations

import type {
  LifeStats,
  CosmicStats,
  BodyStats,
  SocietalStats,
  NaturalStats,
  WeeklyTimeBudget,
  MasteryStats,
  AllStats,
} from './types';
import { LIFE_EXPECTANCY_YEARS, CONSTANTS } from './constants';

// ==========================================
// Core Life Calculations
// ==========================================

export function calculateLifeStats(
  birthdate: string,
  lifeExpectancy: number = LIFE_EXPECTANCY_YEARS
): LifeStats {
  const birth = new Date(birthdate);
  const now = new Date();

  const msLived = now.getTime() - birth.getTime();
  const secondsLived = Math.floor(msLived / 1000);
  const minutesLived = Math.floor(secondsLived / 60);
  const hoursLived = Math.floor(minutesLived / 60);
  const daysLived = Math.floor(hoursLived / 24);
  const weeksLived = Math.floor(daysLived / 7);
  const monthsLived = Math.floor(daysLived / 30.44); // Average days per month
  const yearsLived = daysLived / 365.25;

  const totalWeeks = lifeExpectancy * 52;
  const percentLived = (weeksLived / totalWeeks) * 100;

  return {
    weeksLived,
    totalWeeks,
    daysLived,
    percentLived,
    yearsLived,
    monthsLived,
    hoursLived,
    minutesLived,
    secondsLived,
  };
}

// ==========================================
// Cosmic Perspective Calculations
// ==========================================

export function calculateCosmicStats(daysLived: number): CosmicStats {
  // Earth travels ~940 million km around the Sun per year
  const kmPerDay = CONSTANTS.EARTH_ORBITAL_SPEED_KM_PER_DAY;
  const earthTravelKm = Math.round(daysLived * kmPerDay);

  // Solar system moves ~828,000 km/hour through the Milky Way
  const solarSystemTravelKm = Math.round(daysLived * 24 * CONSTANTS.SOLAR_SYSTEM_SPEED_KM_PER_HOUR);

  // Universe is ~13.8 billion years old
  const yearsLived = daysLived / 365.25;
  const universeAgePercent = (yearsLived / CONSTANTS.UNIVERSE_AGE_YEARS) * 100;

  // Trips around the Sun
  const tripsAroundSun = Math.floor(yearsLived);

  return {
    earthTravelKm,
    solarSystemTravelKm,
    universeAgePercent,
    tripsAroundSun,
  };
}

// ==========================================
// Body Statistics Calculations
// ==========================================

export function calculateBodyStats(daysLived: number): BodyStats {
  // Average heart rate: ~100,000 beats per day
  const heartbeats = Math.round(daysLived * CONSTANTS.HEARTBEATS_PER_DAY);

  // Average breaths: ~20,000 per day
  const breaths = Math.round(daysLived * CONSTANTS.BREATHS_PER_DAY);

  // Average sleep: 8 hours per day
  const sleepHours = Math.round(daysLived * 8);

  // Body replaces most cells every 7-10 years
  const yearsLived = daysLived / 365.25;
  const cellReplacements = Math.floor(yearsLived / 7);

  return {
    heartbeats,
    breaths,
    sleepHours,
    cellReplacements,
  };
}

// ==========================================
// Societal Statistics Calculations
// ==========================================

export function calculateSocietalStats(
  birthdate: string,
  daysLived: number
): SocietalStats {
  const birthYear = new Date(birthdate).getFullYear();

  // Estimate population at birth (simplified linear interpolation)
  const populationAtBirth = estimatePopulationAtYear(birthYear);
  const currentPopulation = CONSTANTS.CURRENT_WORLD_POPULATION;

  // Average person meets ~80,000 people in lifetime
  // Proportional to age
  const yearsLived = daysLived / 365.25;
  const peopleMet = Math.round((yearsLived / 80) * CONSTANTS.LIFETIME_PEOPLE_MET);

  // Global births and deaths since user's birth
  // ~140 million births per year, ~60 million deaths per year
  const birthsWorldwide = Math.round(yearsLived * CONSTANTS.BIRTHS_PER_YEAR);
  const deathsWorldwide = Math.round(yearsLived * CONSTANTS.DEATHS_PER_YEAR);

  return {
    populationAtBirth,
    currentPopulation,
    peopleMet,
    birthsWorldwide,
    deathsWorldwide,
  };
}

function estimatePopulationAtYear(year: number): number {
  // Simplified population estimates
  const populationData: Record<number, number> = {
    1950: 2.5,
    1960: 3.0,
    1970: 3.7,
    1980: 4.4,
    1990: 5.3,
    2000: 6.1,
    2010: 6.9,
    2020: 7.8,
    2025: 8.0,
  };

  // Find closest year
  const years = Object.keys(populationData).map(Number).sort((a, b) => a - b);
  let closestYear = years[0];

  for (const y of years) {
    if (y <= year) closestYear = y;
    else break;
  }

  return populationData[closestYear] || 8.0;
}

// ==========================================
// Natural World Calculations
// ==========================================

export function calculateNaturalStats(daysLived: number): NaturalStats {
  // Lunar cycle is ~29.53 days
  const lunarCycles = Math.round(daysLived / CONSTANTS.LUNAR_CYCLE_DAYS);

  // 4 seasons per year
  const yearsLived = daysLived / 365.25;
  const seasons = Math.round(yearsLived * 4);

  // Giant sequoia can live 3,000+ years
  const sequoiaLifespanPercent = (yearsLived / CONSTANTS.SEQUOIA_LIFESPAN_YEARS) * 100;

  return {
    lunarCycles,
    seasons,
    sequoiaLifespanPercent,
  };
}

// ==========================================
// Weekly Time Budget Calculations
// ==========================================

export function calculateWeeklyTimeBudget(): WeeklyTimeBudget {
  const totalHours = 168; // 24 * 7
  const sleepHours = 56; // 8 * 7
  const workHours = 40;
  const remainingHours = totalHours - sleepHours - workHours;

  const yearlyRemaining = remainingHours * 52;
  const threeYearRemaining = yearlyRemaining * 3;

  return {
    totalHours,
    sleepHours,
    workHours,
    remainingHours,
    yearlyRemaining,
    threeYearRemaining,
  };
}

// ==========================================
// Mastery (10,000 Hour Rule) Calculations
// ==========================================

export function calculateMasteryStats(
  currentAge: number,
  hoursPerWeek: number
): MasteryStats {
  const hoursPerYear = hoursPerWeek * 52;
  const yearsToMastery = 10000 / hoursPerYear;
  const ageAtMastery = currentAge + yearsToMastery;

  return {
    hoursPerWeek,
    yearsToMastery,
    ageAtMastery,
  };
}

// ==========================================
// Combined Stats Calculator
// ==========================================

export function calculateAllStats(
  birthdate: string,
  lifeExpectancy: number = LIFE_EXPECTANCY_YEARS
): AllStats {
  const life = calculateLifeStats(birthdate, lifeExpectancy);

  return {
    life,
    cosmic: calculateCosmicStats(life.daysLived),
    body: calculateBodyStats(life.daysLived),
    societal: calculateSocietalStats(birthdate, life.daysLived),
    natural: calculateNaturalStats(life.daysLived),
    weeklyTime: calculateWeeklyTimeBudget(),
  };
}

// ==========================================
// Utility Functions
// ==========================================

export function getWeekNumber(birthdate: string, targetDate: string): number {
  const birth = new Date(birthdate);
  const target = new Date(targetDate);
  const msLived = target.getTime() - birth.getTime();
  return Math.floor(msLived / (1000 * 60 * 60 * 24 * 7));
}

export function getDateFromWeekNumber(birthdate: string, weekNumber: number): Date {
  const birth = new Date(birthdate);
  const msToAdd = weekNumber * 7 * 24 * 60 * 60 * 1000;
  return new Date(birth.getTime() + msToAdd);
}

export function isValidBirthdate(birthdate: string): boolean {
  const date = new Date(birthdate);
  const now = new Date();

  // Must be a valid date
  if (isNaN(date.getTime())) return false;

  // Must be in the past
  if (date >= now) return false;

  // Must be within reasonable range (0-120 years old)
  const ageInYears = (now.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  if (ageInYears < 0 || ageInYears > 120) return false;

  return true;
}
