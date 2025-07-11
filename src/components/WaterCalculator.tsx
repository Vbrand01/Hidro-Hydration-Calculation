
import React, { useState } from 'react';
import { Droplets, User, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputField } from './InputField';
import { ActivitySelector } from './ActivitySelector';
import { WaterResult } from './WaterResult';
import { LoadingAnimation } from './LoadingAnimation';
import { useWaterTracking } from '@/hooks/useWaterTracking';

export interface UserData {
  weight: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
  gender: 'male' | 'female';
}

interface WaterCalculatorProps {
  onCalculate?: () => void;
}

const WaterCalculator: React.FC<WaterCalculatorProps> = ({ onCalculate }) => {
  const [userData, setUserData] = useState<UserData>({
    weight: 0,
    age: 0,
    activityLevel: 'moderate',
    gender: 'male'
  });
  
  const [waterAmount, setWaterAmount] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { saveRecord } = useWaterTracking();

  const calculateWater = async () => {
    if (!userData.weight || !userData.age) return;

    setIsLoading(true);
    
    // Simular carregamento para mostrar a animação
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Fórmula base: 35ml por kg de peso corporal
    let baseAmount = userData.weight * 35;
    
    // Ajuste por idade
    if (userData.age > 65) {
      baseAmount *= 0.9;
    } else if (userData.age < 30) {
      baseAmount *= 1.1;
    }
    
    // Ajuste por gênero
    if (userData.gender === 'female') {
      baseAmount *= 0.95;
    }
    
    // Ajuste por nível de atividade
    const activityMultiplier = {
      sedentary: 1,
      light: 1.2,
      moderate: 1.4,
      intense: 1.6
    };
    
    baseAmount *= activityMultiplier[userData.activityLevel];
    
    const finalAmount = Math.round(baseAmount);
    setWaterAmount(finalAmount);
    
    // Salvar a meta calculada
    saveRecord(0, finalAmount);
    
    setIsLoading(false);
    setShowResult(true);
    
    if (onCalculate) {
      onCalculate();
    }
  };

  const resetCalculator = () => {
    setUserData({
      weight: 0,
      age: 0,
      activityLevel: 'moderate',
      gender: 'male'
    });
    setWaterAmount(null);
    setShowResult(false);
    setIsLoading(false);
  };

  const isFormValid = userData.weight > 0 && userData.age > 0;

  if (isLoading) {
    return (
      <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-water-medium/20">
        <LoadingAnimation />
      </Card>
    );
  }

  if (showResult) {
    return (
      <WaterResult
        waterAmount={waterAmount!}
        userData={userData}
        onReset={resetCalculator}
      />
    );
  }

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-water-medium/20 animate-fade-in border border border-zinc-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-water-light to-water-medium rounded-full mb-4 animate-scale-in">
          <Droplets className="h-8 w-8 text-water-dark" />
        </div>
        <h2 className="text-2xl font-light text-gray-800 mb-2">
          Calculadora de Hidratação
        </h2>
        <p className="text-water-dark text-sm">
          Preencha seus dados para descobrir sua meta diária
        </p>
      </div>

      <div className="space-y-6">
        <InputField
          label="Peso (kg)"
          value={userData.weight}
          onChange={(value) => setUserData(prev => ({ ...prev, weight: value }))}
          placeholder="70"
          icon={Weight}
        />

        <InputField
          label="Idade (anos)"
          value={userData.age}
          onChange={(value) => setUserData(prev => ({ ...prev, age: value }))}
          placeholder="25"
          icon={User}
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Gênero
          </label>
          <div className="flex gap-3">
            {(['male', 'female'] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => setUserData(prev => ({ ...prev, gender }))}
                className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 ${
                  userData.gender === gender
                    ? 'bg-water-medium text-white shadow-lg'
                    : 'bg-water-lightest text-water-dark hover:bg-water-light'
                }`}
              >
                {gender === 'male' ? 'Masculino' : 'Feminino'}
              </button>
            ))}
          </div>
        </div>

        <ActivitySelector
          value={userData.activityLevel}
          onChange={(level) => setUserData(prev => ({ ...prev, activityLevel: level }))}
        />

        <Button
          onClick={calculateWater}
          disabled={!isFormValid}
          className="w-full bg-gradient-to-r from-water-medium to-water-dark hover:from-water-dark hover:to-water-medium text-white py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Droplets className="mr-2 h-5 w-5" />
          Calcular Hidratação
        </Button>
      </div>
    </Card>
  );
};

export default WaterCalculator;
