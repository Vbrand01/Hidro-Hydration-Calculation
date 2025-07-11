
import React, { useState } from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWaterTracking } from '@/hooks/useWaterTracking';

export const WaterTracker = () => {
  const [amount, setAmount] = useState(250);
  const { addWaterEntry, getTodayEntry, dailyGoal } = useWaterTracking();
  
  const todayEntry = getTodayEntry();
  const todayTotal = todayEntry?.totalAmount || 0;
  const percentage = Math.round((todayTotal / dailyGoal) * 100);

  const handleAddWater = () => {
    addWaterEntry(amount);
  };

  const quickAmounts = [150, 250, 350, 500];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-medium text-gray-800">
          <Droplets className="h-6 w-6 mr-2 text-water-dark" />
          Registro Diário
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress do dia */}
        <div className="text-center">
          <div className="text-3xl font-light text-water-dark mb-2">
            {(todayTotal / 1000).toFixed(1)}L
          </div>
          <div className="text-gray-600 mb-4">
            de {(dailyGoal / 1000).toFixed(1)}L ({percentage}%)
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 100 ? 'bg-emerald-300' : 
                percentage >= 80 ? 'bg-water-medium' : 'bg-water-dark'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Seleção de quantidade */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Quantidade (ml)
          </label>
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAmount(Math.max(50, amount - 50))}
              className="rounded-full"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-2xl font-medium text-water-dark min-w-[80px] text-center">
              {amount}ml
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAmount(Math.min(1000, amount + 50))}
              className="rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quantidades rápidas */}
        <div className="grid grid-cols-2 gap-2">
          {quickAmounts.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant={amount === quickAmount ? "default" : "outline"}
              onClick={() => setAmount(quickAmount)}
              className="py-2"
            >
              {quickAmount}ml
            </Button>
          ))}
        </div>

        {/* Botão adicionar */}
        <Button
          onClick={handleAddWater}
          className="w-full bg-gradient-to-r from-water-medium to-water-dark hover:from-water-dark hover:to-water-medium text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <Droplets className="mr-2 h-5 w-5" />
          Adicionar Água
        </Button>

        {/* Entradas do dia */}
        {todayEntry && todayEntry.entries.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Hoje:</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {todayEntry.entries.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-water-lightest p-2 rounded-lg text-sm"
                >
                  <span>{entry.time}</span>
                  <span className="font-medium">{entry.amount}ml</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
