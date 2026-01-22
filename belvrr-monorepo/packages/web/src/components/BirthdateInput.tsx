import { useState } from 'react';
import { isValidBirthdate } from '@belvrr/core';

interface BirthdateInputProps {
  onSubmit: (birthdate: string) => void;
  initialValue?: string;
}

export default function BirthdateInput({ onSubmit, initialValue = '' }: BirthdateInputProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value) {
      setError('Please enter a birthdate');
      return;
    }

    if (!isValidBirthdate(value)) {
      setError('Please enter a valid birthdate');
      return;
    }

    setError(null);
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="birthdate" 
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          Enter a birthdate
        </label>
        <input
          type="date"
          id="birthdate"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-text-primary"
          max={new Date().toISOString().split('T')[0]}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Visualize your time
      </button>
    </form>
  );
}
