
import React from 'react';
import { Droplets, Heart, Zap, Shield } from 'lucide-react';

export const HeroSection = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Saúde Cardiovascular",
      description: "Melhora a circulação e reduz a pressão arterial"
    },
    {
      icon: Zap,
      title: "Mais Energia",
      description: "Combate a fadiga e aumenta a disposição"
    },
    {
      icon: Shield,
      title: "Sistema Imunológico",
      description: "Fortalece as defesas naturais do corpo"
    }
  ];

  return (
    <div className="flex flex-col justify-center h-full space-y-8 animate-fade-in">
      <div className="space-y-1 mt-20">

        
      <div className="inline-flex items-center px-0 py-2">
          <Droplets className="h-4 w-4 text-water-dark mr-2" />
          <span className="text-sm font-medium text-water-dark">Hidratação Inteligente</span>
        </div>
        <h1 className="text-5xl font-light text-gray-800 leading-tight">
          Descubra a quantidade
          <span className="text-water-dark font-normal"> ideal de água </span>
          para o seu dia
        </h1>
        
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-xl">
          Calcule sua necessidade diária de hidratação baseada no seu perfil pessoal 
          e mantenha-se saudável com a quantidade certa de água.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800">
          Por que a hidratação correta é importante?
        </h3>
        
        <div className="grid gap-4">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-water-lightest rounded-lg">
                <benefit.icon className="h-5 w-5 text-water-dark" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
