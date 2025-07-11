
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder: string;
  icon: LucideIcon;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-water-dark" />
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-water-lightest border-0 rounded-xl focus:ring-2 focus:ring-water-medium focus:outline-none transition-all duration-300 text-gray-800 placeholder-water-dark/60"
        />
      </div>
    </div>
  );
};
