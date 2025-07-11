
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Droplets, Calendar, TrendingUp, Clock } from 'lucide-react';
import { WaterDropAnimation } from '@/components/WaterDropAnimation';
import { useWaterTracking } from '@/hooks/useWaterTracking';
import { useToast } from '@/hooks/use-toast';

const History = () => {
  const { waterRecords, getWeeklyAverage, getConsecutiveDays, toggleRecordCompleted, dailyEntries } = useWaterTracking();
  const [animatingId, setAnimatingId] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<{[id: string]: number}>({});
  const { toast } = useToast();

  React.useEffect(() => {
    // Inicializa o progresso com a porcentagem real
    const initial: {[id: string]: number} = {};
    waterRecords.forEach(day => {
      initial[day.id] = day.percentage;
    });
    setProgress(initial);
  }, [waterRecords]);

  const handleComplete = (day: any) => {
    setAnimatingId(day.id);
    let start = progress[day.id] ?? day.percentage;
    let end = day.completed ? day.percentage : 100;
    let step = () => {
      if (day.completed) {
        start -= 4;
        if (start <= end) {
          setProgress(p => ({ ...p, [day.id]: end }));
          setTimeout(() => setAnimatingId(null), 800);
          toggleRecordCompleted(day.date);
        } else {
          setProgress(p => ({ ...p, [day.id]: start }));
          setTimeout(step, 16);
        }
      } else {
        start += 4;
        if (start >= end) {
          setProgress(p => ({ ...p, [day.id]: 100 }));
          setTimeout(() => setAnimatingId(null), 1200);
          toggleRecordCompleted(day.date);
          toast({ title: 'Dia concluído!', description: 'Parabéns por atingir sua meta de hidratação!', duration: 2500 });
        } else {
          setProgress(p => ({ ...p, [day.id]: start }));
          setTimeout(step, 16);
        }
      }
    };
    step();
  };

  const weeklyAverage = getWeeklyAverage();
  const consecutiveDays = getConsecutiveDays();
  
  const getBestTime = () => {
    const hours = ['8h', '9h', '10h', '14h', '16h', '19h'];
    return hours[Math.floor(Math.random() * hours.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-water-lightest via-white to-water-light pb-20 md:pb-0">
      <Navbar />
      
      <div className="pt-20 px-6 mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Histórico de Hidratação
            </h1>
            <p className="text-water-dark/80">
              Acompanhe seu progresso diário de consumo de água
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg font-medium text-gray-800">
                  <TrendingUp className="h-5 w-5 mr-2 text-water-dark" />
                  Média Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-light text-water-dark">
                  {getWeeklyAverage() > 0 ? `${getWeeklyAverage()}L` : '--'}
                </div>
                <p className="text-sm text-gray-600">
                  {waterRecords.length > 0 ? 'Últimos 7 dias' : 'Sem dados ainda'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg font-medium text-gray-800">
                  <Calendar className="h-5 w-5 mr-2 text-water-dark" />
                  Dias Consecutivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-light text-water-dark">{getConsecutiveDays()}</div>
                <p className="text-sm text-gray-600">
                  {getConsecutiveDays() > 0 ? 'Mantendo a meta' : 'Começar sequência'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg font-medium text-gray-800">
                  <Clock className="h-5 w-5 mr-2 text-water-dark" />
                  Melhor Horário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-light text-water-dark">{getBestTime()}</div>
                <p className="text-sm text-gray-600">Pico de consumo</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-medium text-gray-800">
                <Droplets className="h-6 w-6 mr-2 text-water-dark" />
                Registro Diário
              </CardTitle>
            </CardHeader>
            <CardContent>
              {waterRecords.length > 0 ? (
                <div className="space-y-4">
                  {waterRecords.slice(0, 10).map((day, index) => {
                    const entry = dailyEntries.find(e => e.date === day.date);
                    return (
                    <div
                      key={day.id}
                      className={`flex flex-col gap-2 p-4 bg-water-lightest rounded-xl animate-fade-in shadow transition-all duration-300 relative overflow-hidden ${day.completed ? 'ring-2 ring-water-medium scale-[1.01] bg-water-light/70' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Marca visual de concluído */}
                      {day.completed && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                          <CheckCircle className="text-water-medium w-16 h-16 animate-scale-in opacity-30" />
                        </div>
                      )}
                      {/* Animação de conclusão */}
                      {animatingId === day.id && !day.completed && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <WaterDropAnimation />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 rounded-full bg-water-light/40 animate-ping" />
                          </div>
                          <CheckCircle className="text-water-medium w-16 h-16 animate-scale-in absolute" />
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br from-water-light to-water-medium rounded-full ${day.completed ? 'opacity-70' : ''}`}>
                          <Droplets className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {new Date(day.date).toLocaleDateString('pt-BR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            {(day.amount / 1000).toFixed(1)}L de {(day.goal / 1000).toFixed(1)}L
                          </div>
                        </div>
                      </div>
                      {/* Entradas do dia */}
                      {entry && entry.entries.length > 0 && (
                        <div className="mt-2 mb-1">
                          <div className="text-xs text-water-dark/80 mb-1">Registros do dia:</div>
                          <div className="flex flex-wrap gap-2">
                            {entry.entries.map((e, i) => (
                              <div key={i} className="px-2 py-1 rounded bg-water-light/60 text-xs text-water-dark/90">
                                {e.time} - {e.amount}ml
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col items-end gap-2 min-w-[90px]">
                        <div className={`text-lg font-medium ${
                          (progress[day.id] ?? day.percentage) >= 100 ? 'text-water-medium' : 
                          (progress[day.id] ?? day.percentage) >= 80 ? 'text-water-dark' : 'text-orange-500'
                        }`}>
                          {(progress[day.id] ?? day.percentage)}%
                        </div>
                        <div className="w-16 h-2 bg-water-light rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              (progress[day.id] ?? day.percentage) >= 100 ? 'bg-water-medium' : 
                              (progress[day.id] ?? day.percentage) >= 80 ? 'bg-water-dark' : 'bg-orange-400'
                            }`}
                            style={{ width: `${Math.min(progress[day.id] ?? day.percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );})}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Droplets className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Nenhum registro ainda.</p>
                  <p className="text-sm">Comece registrando sua hidratação diária!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default History;
