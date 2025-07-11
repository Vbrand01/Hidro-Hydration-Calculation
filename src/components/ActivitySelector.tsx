
import React from 'react';
import { Activity, Coffee, Zap, Flame } from 'lucide-react';

interface ActivitySelectorProps {
  value: 'sedentary' | 'light' | 'moderate' | 'intense';
  onChange: (level: 'sedentary' | 'light' | 'moderate' | 'intense') => void;
}

const activityLevels = [
  {
    level: 'sedentary' as const,
    label: 'Sedentário',
    description: 'Pouco ou nenhum exercício',
    icon: Coffee
  },
  {
    level: 'light' as const,
    label: 'Leve',
    description: 'Exercício leve 1-3 dias/semana',
    icon: Activity
  },
  {
    level: 'moderate' as const,
    label: 'Moderado',
    description: 'Exercício moderado 3-5 dias/semana',
    icon: Zap
  },
  {
    level: 'intense' as const,
    label: 'Intenso',
    description: 'Exercício intenso 6-7 dias/semana',
    icon: Flame
  }
];

export const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Nível de Atividade Física
      </label>
      <div className="grid grid-cols-2 gap-3">
        {activityLevels.map(({ level, label, description, icon: Icon }) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`p-4 rounded-xl transition-all duration-300 text-left ${
              value === level
                ? 'bg-water-medium text-white shadow-lg transform scale-[1.02]'
                : 'bg-water-lightest text-water-dark hover:bg-water-light hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-center mb-2">
              <Icon className="h-4 w-4 mr-2" />
              <span className="font-medium text-sm">{label}</span>
            </div>
            <p className={`text-xs ${value === level ? 'text-white/80' : 'text-water-dark/80'}`}>
              {description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
