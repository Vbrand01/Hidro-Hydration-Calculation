
import { useState, useEffect } from 'react';

export interface WaterRecord {
  id: string;
  date: string;
  amount: number;
  goal: number;
  percentage: number;
  timestamp: number;
  completed?: boolean; // Novo campo para marcar como concluído manualmente
}

export interface DailyEntry {
  date: string;
  entries: { time: string; amount: number }[];
  totalAmount: number;
  goal: number;
}

export const useWaterTracking = () => {
  const [waterRecords, setWaterRecords] = useState<WaterRecord[]>([]);
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(2800);

  useEffect(() => {
    console.log('Carregando dados do localStorage...');
    const savedRecords = localStorage.getItem('waterRecords');
    const savedEntries = localStorage.getItem('dailyEntries');
    const savedGoal = localStorage.getItem('dailyGoal');

    if (savedRecords) {
      console.log('Records encontrados:', JSON.parse(savedRecords));
      setWaterRecords(JSON.parse(savedRecords));
    }
    if (savedEntries) {
      console.log('Entries encontradas:', JSON.parse(savedEntries));
      setDailyEntries(JSON.parse(savedEntries));
    }
    if (savedGoal) {
      console.log('Goal encontrada:', JSON.parse(savedGoal));
      setDailyGoal(JSON.parse(savedGoal));
    }
  }, []);

  const saveRecord = (amount: number, goal: number) => {
    const today = new Date().toISOString().split('T')[0];
    const prev = waterRecords.find(r => r.date === today);
    const newRecord: WaterRecord = {
      id: Date.now().toString(),
      date: today,
      amount,
      goal,
      percentage: Math.round((amount / goal) * 100),
      timestamp: Date.now(),
      completed: prev?.completed || false,
    };
    const updatedRecords = [newRecord, ...waterRecords.filter(r => r.date !== today)];
    setWaterRecords(updatedRecords);
    localStorage.setItem('waterRecords', JSON.stringify(updatedRecords));
    setDailyGoal(goal);
    localStorage.setItem('dailyGoal', JSON.stringify(goal));
  };

  const addWaterEntry = (amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const existingEntry = dailyEntries.find(entry => entry.date === today);
    const prev = waterRecords.find(r => r.date === today);
    if (existingEntry) {
      const updatedEntry = {
        ...existingEntry,
        entries: [...existingEntry.entries, { time: now, amount }],
        totalAmount: existingEntry.totalAmount + amount,
      };
      const updatedEntries = dailyEntries.map(entry => 
        entry.date === today ? updatedEntry : entry
      );
      setDailyEntries(updatedEntries);
      localStorage.setItem('dailyEntries', JSON.stringify(updatedEntries));
      // Update records
      const updatedRecord: WaterRecord = {
        id: today,
        date: today,
        amount: updatedEntry.totalAmount,
        goal: dailyGoal,
        percentage: Math.round((updatedEntry.totalAmount / dailyGoal) * 100),
        timestamp: Date.now(),
        completed: prev?.completed || false,
      };
      const updatedRecords = [updatedRecord, ...waterRecords.filter(r => r.date !== today)];
      setWaterRecords(updatedRecords);
      localStorage.setItem('waterRecords', JSON.stringify(updatedRecords));
    } else {
      const newEntry: DailyEntry = {
        date: today,
        entries: [{ time: now, amount }],
        totalAmount: amount,
        goal: dailyGoal,
      };
      const updatedEntries = [newEntry, ...dailyEntries];
      setDailyEntries(updatedEntries);
      localStorage.setItem('dailyEntries', JSON.stringify(updatedEntries));
      // Create new record
      const newRecord: WaterRecord = {
        id: today,
        date: today,
        amount,
        goal: dailyGoal,
        percentage: Math.round((amount / dailyGoal) * 100),
        timestamp: Date.now(),
        completed: prev?.completed || false,
      };
      const updatedRecords = [newRecord, ...waterRecords.filter(r => r.date !== today)];
      setWaterRecords(updatedRecords);
      localStorage.setItem('waterRecords', JSON.stringify(updatedRecords));
    }
  };

  const getTodayEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyEntries.find(entry => entry.date === today);
  };

  const getWeeklyAverage = () => {
    if (waterRecords.length === 0) return 0;
    const last7Days = waterRecords.slice(0, 7);
    const total = last7Days.reduce((sum, record) => sum + record.amount, 0);
    return Math.round((total / last7Days.length) / 1000 * 10) / 10;
  };

  const getConsecutiveDays = () => {
    let consecutive = 0;
    const sortedRecords = [...waterRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (const record of sortedRecords) {
      if (record.percentage >= 80) {
        consecutive++;
      } else {
        break;
      }
    }
    
    return consecutive;
  };

  // Função para marcar/desmarcar um registro como concluído manualmente
  const toggleRecordCompleted = (date: string) => {
    const updatedRecords = waterRecords.map(record =>
      record.date === date ? { ...record, completed: !record.completed } : record
    );
    setWaterRecords(updatedRecords);
    localStorage.setItem('waterRecords', JSON.stringify(updatedRecords));
  };

  return {
    waterRecords,
    dailyEntries,
    dailyGoal,
    saveRecord,
    addWaterEntry,
    getTodayEntry,
    getWeeklyAverage,
    getConsecutiveDays,
    toggleRecordCompleted, // exporta a nova função
  };
};
