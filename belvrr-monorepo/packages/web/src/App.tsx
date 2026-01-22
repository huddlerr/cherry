import { useState } from 'react';
import { calculateAllStats, getTranslation, formatNumber, formatPercent } from '@belvrr/core';
import type { SupportedLanguage, AllStats } from '@belvrr/core';
import BirthdateInput from './components/BirthdateInput';
import WeekGrid from './components/WeekGrid';
import StatsCard from './components/StatsCard';

function App() {
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [stats, setStats] = useState<AllStats | null>(null);
  const [language] = useState<SupportedLanguage>('en-US');

  const t = getTranslation(language);

  const handleBirthdateSubmit = (date: string) => {
    setBirthdate(date);
    setStats(calculateAllStats(date));
  };

  const handleStartOver = () => {
    setBirthdate(null);
    setStats(null);
  };

  if (!birthdate || !stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {t.pageTitle}
            </h1>
            <p className="text-text-secondary">
              {t.pageSubtitle}
            </p>
          </div>
          <BirthdateInput onSubmit={handleBirthdateSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary">
            {t.pageTitle}
          </h1>
          <button
            onClick={handleStartOver}
            className="text-accent hover:text-accent-hover font-medium"
          >
            {t.startOverButton}
          </button>
        </div>

        {/* Week Grid */}
        <StatsCard title={t.lifeInWeeksTitle}>
          <WeekGrid 
            weeksLived={stats.life.weeksLived} 
            totalWeeks={stats.life.totalWeeks} 
          />
        </StatsCard>

        {/* Life Highlights */}
        <StatsCard title={t.lifeHighlightsTitle}>
          <div className="space-y-3 text-text-secondary">
            <p>
              {t.lifeHighlightsWeeks}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.life.weeksLived, language)}
              </span>{' '}
              {t.lifeHighlightsWeeksEnd}{' '}
              <span className="text-text-primary font-medium">
                {formatPercent(stats.life.percentLived, 1, language)}
              </span>{' '}
              {t.lifeHighlightsPercent}
            </p>
            <p>
              {t.lifeHighlightsDays}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.life.daysLived, language)}
              </span>{' '}
              {t.lifeHighlightsDaysEnd}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.natural.seasons, language)}
              </span>{' '}
              {t.lifeHighlightsSeasonsEnd}
            </p>
            <p>
              {t.lifeHighlightsHeartbeats}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.body.heartbeats, language)}
              </span>{' '}
              {t.lifeHighlightsHeartbeatsEnd}
            </p>
            <p>
              {t.lifeHighlightsBreaths}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.body.breaths, language)}
              </span>{' '}
              {t.lifeHighlightsBreathsMiddle}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.body.sleepHours, language)}
              </span>{' '}
              {t.lifeHighlightsBreathsEnd}
            </p>
          </div>
        </StatsCard>

        {/* Cosmic Perspective */}
        <StatsCard title={t.cosmicPerspectiveTitle}>
          <div className="space-y-3 text-text-secondary">
            <p>
              {t.cosmicEarthTravel}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.cosmic.earthTravelKm, language)}
              </span>{' '}
              {t.cosmicEarthTravelEnd}
            </p>
            <p>
              {t.cosmicSolarSystem}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.cosmic.solarSystemTravelKm, language)}
              </span>{' '}
              {t.cosmicSolarSystemEnd}
            </p>
          </div>
        </StatsCard>

        {/* Weekly Time Budget */}
        <StatsCard title={t.weeklyTimeTitle}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-text-muted">{t.weeklyTimeTotal.split(':')[0]}</div>
                <div className="text-xl font-bold text-text-primary">168</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-text-muted">Sleep (8hrs/day)</div>
                <div className="text-xl font-bold text-text-primary">56</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-text-muted">Work (40hrs/week)</div>
                <div className="text-xl font-bold text-text-primary">40</div>
              </div>
              <div className="bg-accent/10 p-3 rounded">
                <div className="text-accent font-medium">Remaining</div>
                <div className="text-xl font-bold text-accent">72</div>
              </div>
            </div>
            <p className="text-text-secondary text-sm mt-4">
              {t.weeklyTimeContext}
            </p>
            <p className="text-text-secondary text-sm">
              {t.weeklyTimeCompound}
            </p>
          </div>
        </StatsCard>

        {/* Natural World */}
        <StatsCard title={t.naturalWorldTitle}>
          <div className="space-y-3 text-text-secondary">
            <p>
              {t.naturalLunarCycles}{' '}
              <span className="text-text-primary font-medium">
                {formatNumber(stats.natural.lunarCycles, language)}
              </span>{' '}
              {t.naturalLunarMiddle}{' '}
              <span className="text-text-primary font-medium">
                {stats.cosmic.tripsAroundSun}
              </span>{' '}
              {t.naturalLunarEnd}
            </p>
            <p>
              {t.naturalSequoia}{' '}
              <span className="text-text-primary font-medium">
                {stats.natural.sequoiaLifespanPercent.toFixed(2)}%
              </span>{' '}
              {t.naturalSequoiaEnd}
            </p>
            <p className="text-sm italic">
              {t.naturalCells}
            </p>
          </div>
        </StatsCard>

        {/* Footer */}
        <div className="text-center text-text-muted text-sm mt-8 pb-8">
          <p>BELVRR - Life in Weeks</p>
        </div>
      </div>
    </div>
  );
}

export default App;
