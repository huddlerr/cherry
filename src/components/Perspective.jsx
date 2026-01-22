import { useState } from 'react';

export default function Perspective() {
  const [step, setStep] = useState(1);
  const [birthdate, setBirthdate] = useState('');
  const [stats, setStats] = useState(null);
  const [showHoverData, setShowHoverData] = useState(false);
  const [hoverWeek, setHoverWeek] = useState(null);

  const calculateStats = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const age = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 365.25));

    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((today - birthDate) / msInWeek);

    const totalWeeks = 4160;
    const weeksRemaining = totalWeeks - weeksLived;
    const percentageLived = Math.round((weeksLived / totalWeeks) * 100);

    const msInDay = 1000 * 60 * 60 * 24;
    const daysLived = Math.floor((today - birthDate) / msInDay);

    const hoursSlept = Math.floor(daysLived * 8);
    const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
    const breaths = Math.floor(daysLived * 24 * 60 * 16);
    const seasons = Math.floor(daysLived / 91.25);

    return {
      weeksLived,
      totalWeeks,
      weeksRemaining,
      percentageLived,
      daysLived,
      hoursSlept,
      heartbeats,
      breaths,
      seasons,
      birthYear,
      age
    };
  };

  const getPopulationAtYear = (year) => {
    const populationData = {
      1950: 2.5, 1960: 3.0, 1970: 3.7, 1980: 4.4,
      1990: 5.3, 2000: 6.1, 2010: 6.9, 2020: 7.8, 2025: 8.1
    };

    const years = Object.keys(populationData).map(Number);
    const closestYear = years.reduce((prev, curr) =>
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    );

    return Math.round(populationData[closestYear] * 1000000000);
  };

  const getAverageBirthsPerDay = () => 385000;
  const getAverageDeathsPerDay = () => 166000;

  const handleSubmit = () => {
    setStats(calculateStats(birthdate));
    setStep(2);
  };

  const getFormattedNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const renderWeekGrid = () => {
    if (!stats) return null;

    const rows = [];
    const weeksPerRow = 52;
    const totalRows = Math.ceil(stats.totalWeeks / weeksPerRow);

    for (let row = 0; row < totalRows; row++) {
      const weekCells = [];
      for (let col = 0; col < weeksPerRow; col++) {
        const weekNumber = row * weeksPerRow + col;
        if (weekNumber < stats.totalWeeks) {
          const isPast = weekNumber < stats.weeksLived;
          const isCurrent = weekNumber === stats.weeksLived;

          const cellStyle = {
            width: '8px',
            height: '8px',
            margin: '2px',
            borderRadius: '2px',
            transition: 'all 0.2s',
            backgroundColor: isPast ? '#1f2937' : isCurrent ? '#3b82f6' : '#e5e7eb',
            animation: isCurrent ? 'pulse 2s infinite' : 'none',
          };

          weekCells.push(
            <div
              key={weekNumber}
              style={cellStyle}
              onMouseEnter={() => {
                setHoverWeek(weekNumber);
                setShowHoverData(true);
              }}
              onMouseLeave={() => setShowHoverData(false)}
            />
          );
        }
      }

      rows.push(
        <div key={row} style={{ display: 'flex' }}>
          {weekCells}
        </div>
      );
    }

    return (
      <div style={{ marginTop: '32px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '16px', color: '#1f2937' }}>Your life in weeks</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {rows}
        </div>

        {showHoverData && (
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#4b5563' }}>
            Week {hoverWeek + 1}:
            {hoverWeek < stats.weeksLived ?
              ' A week from your past' :
              hoverWeek === stats.weeksLived ?
              ' Your current week' :
              ' A week in your potential future'}
          </div>
        )}

        <div style={{ display: 'flex', marginTop: '24px', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#1f2937', marginRight: '8px' }}></div>
            <span style={{ color: '#4b5563' }}>Past</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', marginRight: '8px' }}></div>
            <span style={{ color: '#4b5563' }}>Present</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#e5e7eb', marginRight: '8px' }}></div>
            <span style={{ color: '#4b5563' }}>Future</span>
          </div>
        </div>
      </div>
    );
  };

  const StatsCard = ({ title, children }) => (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '16px', color: '#1f2937' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
    </div>
  );

  const StatText = ({ children }) => (
    <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '24px' }}>{children}</p>
  );

  const Highlight = ({ children }) => (
    <span style={{ color: '#1f2937', fontWeight: '600' }}>{children}</span>
  );

  const renderStats = () => {
    if (!stats) return null;

    return (
      <div style={{ marginTop: '32px' }}>
        {/* Life Highlights */}
        <StatsCard title="Life highlights">
          <StatText>
            You've lived <Highlight>{getFormattedNumber(stats.weeksLived)}</Highlight> weeks, which is <Highlight>{stats.percentageLived}%</Highlight> of a full life.
          </StatText>
          <StatText>
            That's <Highlight>{getFormattedNumber(stats.daysLived)}</Highlight> days of experience and approximately <Highlight>{getFormattedNumber(stats.seasons)}</Highlight> seasons observed.
          </StatText>
          <StatText>
            Your heart has beaten approximately <Highlight>{getFormattedNumber(stats.heartbeats)}</Highlight> times.
          </StatText>
          <StatText>
            You've taken around <Highlight>{getFormattedNumber(stats.breaths)}</Highlight> breaths and slept about <Highlight>{getFormattedNumber(stats.hoursSlept)}</Highlight> hours.
          </StatText>
        </StatsCard>

        {/* Societal Context */}
        <StatsCard title="Societal context">
          <StatText>
            During your lifetime, humanity's population has grown from {stats.birthYear ? <Highlight>{getFormattedNumber(getPopulationAtYear(stats.birthYear))}</Highlight> : ""} to over <Highlight>8</Highlight> billion people.
          </StatText>
          <StatText>
            The average person will meet around <Highlight>80,000</Highlight> people in their lifetime. You've likely already met approximately <Highlight>{getFormattedNumber(Math.round(80000 * (stats.percentageLived/100)))}</Highlight> individuals.
          </StatText>
          <StatText>
            Since your birth, humanity has collectively experienced approximately <Highlight>{getFormattedNumber(Math.round(stats.daysLived * getAverageBirthsPerDay()))}</Highlight> births and <Highlight>{getFormattedNumber(Math.round(stats.daysLived * getAverageDeathsPerDay()))}</Highlight> deaths.
          </StatText>
        </StatsCard>

        {/* Cosmic Perspective */}
        <StatsCard title="Cosmic perspective">
          <StatText>
            Since your birth, Earth has traveled approximately <Highlight>{getFormattedNumber(Math.round(stats.daysLived * 1.6 * 1000000))}</Highlight> kilometers through space around the Sun.
          </StatText>
          <StatText>
            The observable universe is about <Highlight>93</Highlight> billion light-years across, meaning light takes <Highlight>93</Highlight> billion years to cross it. Your entire lifespan is just <Highlight>{(80/13800000000 * 100).toFixed(10)}%</Highlight> of the universe's age.
          </StatText>
          <StatText>
            During your lifetime, our solar system has moved about <Highlight>{getFormattedNumber(Math.round(stats.daysLived * 24 * 828000))}</Highlight> kilometers through the Milky Way galaxy.
          </StatText>
        </StatsCard>

        {/* Natural World */}
        <StatsCard title="Natural world">
          <StatText>
            You've experienced approximately <Highlight>{getFormattedNumber(Math.round(stats.daysLived / 29.53))}</Highlight> lunar cycles and <Highlight>{getFormattedNumber(Math.floor(stats.daysLived / 365.25))}</Highlight> trips around the Sun.
          </StatText>
          <StatText>
            A giant sequoia tree can live over 3,000 years. Your current age is <Highlight>{((stats.daysLived / 365.25) / 3000 * 100).toFixed(2)}%</Highlight> of its potential lifespan.
          </StatText>
          <StatText>
            During your lifetime, your body has replaced most of its cells several times. You are not made of the same atoms you were born with.
          </StatText>
        </StatsCard>

        {/* Weekly Time Budget */}
        <StatsCard title="Your weekly time budget">
          <StatText><Highlight>Total hours in a week: 168</Highlight></StatText>
          <StatText>Sleep (8hrs/day): 56 hours</StatText>
          <StatText>Work (40hrs/week): 40 hours</StatText>
          <StatText><Highlight>Remaining: 72 hours</Highlight></StatText>
          <StatText style={{ paddingTop: '8px' }}>
            People complain about a 40-hour workweek. But you have 72 waking hours left every week. That's nearly double your work time.
          </StatText>
          <StatText>
            That's 3,744 hours per year. In 3 years: 11,232 hours of potential.
          </StatText>
        </StatsCard>

        {/* Path to Mastery */}
        <StatsCard title="Path to mastery">
          <StatText>The 10,000 hour rule with different weekly commitments:</StatText>
          <StatText>5 hours/week = <Highlight>Mastery in 38 years</Highlight></StatText>
          <StatText>10 hours/week = <Highlight>Mastery in 19 years</Highlight></StatText>
          <StatText>20 hours/week = <Highlight>Mastery in 9.6 years</Highlight></StatText>
          <StatText>40 hours/week = <Highlight>Mastery in 4.8 years</Highlight></StatText>
          <StatText style={{ paddingTop: '8px' }}>
            At age <Highlight>{stats.age + 10}</Highlight>, you'll have 10,000 hours. Someone starting at 30 won't reach it until <Highlight>40</Highlight>.
          </StatText>
        </StatsCard>

        {/* Opportunity Math */}
        <StatsCard title="What's possible">
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>$100,000/year is:</h3>
            <StatText>• 215 customers at $39/month</StatText>
            <StatText>• 40 clients/quarter at $625 each</StatText>
            <StatText>• 10 sales/day at $27 each</StatText>
            <StatText>• 10 hours/week at $195/hour</StatText>
            <StatText>• 2 sales/day at $135 each</StatText>
            <StatText style={{ paddingTop: '12px', fontStyle: 'italic' }}>All difficult. All doable.</StatText>
          </div>

          <div style={{ paddingTop: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>1 hour per day for 1 year:</h3>
            <StatText>• 365 hours of practice</StatText>
            <StatText>• ~73 books read (at 5hrs/book)</StatText>
            <StatText>• A new language at conversational level</StatText>
            <StatText>• Professional-grade skill in most crafts</StatText>
          </div>

          <div style={{ paddingTop: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>30 minutes per day:</h3>
            <StatText>• 182.5 hours/year of movement</StatText>
            <StatText>• Marathon-ready in 16 weeks</StatText>
            <StatText>• Transform your body in 12 weeks</StatText>
            <StatText>• Build a decade-long habit</StatText>
          </div>
        </StatsCard>
      </div>
    );
  };

  const handleReset = () => {
    setBirthdate('');
    setStats(null);
    setStep(1);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '24px', paddingTop: '64px' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
      <div style={{ maxWidth: '448px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '400', color: '#1f2937', marginBottom: '8px' }}>Perspective</h1>
        <p style={{ color: '#4b5563', marginBottom: '32px' }}>Visualize your time and potential</p>

        {step === 1 ? (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '16px', color: '#1f2937' }}>Enter your birthdate</h2>
            <div>
              <input
                type="date"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  color: '#1f2937',
                  fontSize: '16px'
                }}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: birthdate ? 'pointer' : 'not-allowed',
                  opacity: birthdate ? 1 : 0.5,
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
                disabled={!birthdate}
                onMouseOver={(e) => birthdate && (e.target.style.backgroundColor = '#374151')}
                onMouseOut={(e) => e.target.style.backgroundColor = '#1f2937'}
              >
                See Your Perspective
              </button>
            </div>
          </div>
        ) : (
          <>
            {renderWeekGrid()}
            {renderStats()}
            <button
              onClick={handleReset}
              style={{
                marginTop: '32px',
                width: '100%',
                backgroundColor: '#e5e7eb',
                color: '#1f2937',
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d1d5db'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e5e7eb'}
            >
              Start over
            </button>
          </>
        )}
      </div>
    </div>
  );
}
