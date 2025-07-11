
import React from 'react';
import { Droplets, RotateCcw, CheckCircle, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserData } from './WaterCalculator';
import { WaterDropAnimation } from './WaterDropAnimation';

interface WaterResultProps {
  waterAmount: number;
  userData: UserData;
  onReset: () => void;
}

export const WaterResult: React.FC<WaterResultProps> = ({
  waterAmount,
  userData,
  onReset
}) => {
  const liters = (waterAmount / 1000).toFixed(1);
  const glasses = Math.ceil(waterAmount / 250); // Assumindo copos de 250ml

  const activityLabels = {
    sedentary: 'Sedentário',
    light: 'Leve',
    moderate: 'Moderado',
    intense: 'Intenso'
  };

  return (
    <Card className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl shadow-water-medium/20 animate-slide-up">
      <WaterDropAnimation />
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-water-light to-water-medium rounded-full mb-6 animate-scale-in">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl font-light text-gray-800 mb-3">
          Sua Meta Diária
        </h2>
        <div className="text-5xl font-light text-water-dark mb-2">
          {liters}L
        </div>
        <p className="text-water-dark/80 text-sm">
          Aproximadamente {glasses} copos de água
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-4 bg-water-lightest rounded-xl">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-water-dark mr-3" />
            <span className="text-sm text-gray-700">Baseado no seu perfil</span>
          </div>
          <span className="text-sm font-medium text-water-dark">
            {userData.weight}kg • {userData.age} anos
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-water-lightest rounded-xl">
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-water-dark mr-3" />
            <span className="text-sm text-gray-700">Nível de atividade</span>
          </div>
          <span className="text-sm font-medium text-water-dark">
            {activityLabels[userData.activityLevel]}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-water-lightest rounded-xl">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-water-dark mr-3" />
            <span className="text-sm text-gray-700">Distribua ao longo do dia</span>
          </div>
          <span className="text-sm font-medium text-water-dark">
            {Math.round(waterAmount / 8)}ml por hora
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-water-light/30 to-water-medium/30 rounded-xl p-6 mb-6">
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-water-dark" />
          Dicas para manter-se hidratado
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Beba um copo de água ao acordar</li>
          <li>• Mantenha uma garrafa sempre por perto</li>
          <li>• Aumente a ingestão em dias quentes</li>
          <li>• Monitore a cor da sua urina</li>
        </ul>
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        className="w-full py-4 border-water-medium text-water-dark hover:bg-water-light transition-all duration-300 rounded-xl"
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Calcular Novamente
      </Button>
    </Card>
  );
};
