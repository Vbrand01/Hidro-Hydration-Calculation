
import React from 'react';

export const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="relative">
        {/* Animação de ondas de água */}
        <div className="relative w-24 h-24">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-water-medium animate-ping"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
          <div className="absolute inset-4 bg-gradient-to-br from-water-light to-water-medium rounded-full" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-gray-800">
          Calculando sua hidratação ideal...
        </h3>
        <p className="text-sm text-gray-600">
          Analisando seu perfil personalizado
        </p>
      </div>
      
      {/* Barra de progresso animada */}
      <div className="w-48 h-2 bg-water-lightest rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-water-medium to-water-dark rounded-full animate-pulse" 
             style={{
               animation: 'loading-bar 2s ease-in-out infinite'
             }} />
      </div>
    </div>
  );
};
