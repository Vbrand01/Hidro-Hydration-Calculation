
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { BottomNavigation } from '@/components/BottomNavigation';
import { WaterTracker } from '@/components/WaterTracker';
import WaterCalculator from '@/components/WaterCalculator';

const Index = () => {
  const [showWaterAnimation, setShowWaterAnimation] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

  const handleCalculate = () => {
    console.log('Cálculo realizado, mostrando tracker');
    setShowWaterAnimation(true);
    setShowTracker(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-water-lightest via-white to-water-light pb-20 md:pb-0">
      <Navbar />
      
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start min-h-[calc(100vh-5rem)]">
            <div className="order-2 lg:order-1">
              <HeroSection />
              
              {showTracker && (
                <div className="mt-8 animate-fade-in">
                  <WaterTracker />
                </div>
              )}
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end mb-10 mt-10">
              <div className="w-full max-w-lg">
                <WaterCalculator onCalculate={handleCalculate} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
