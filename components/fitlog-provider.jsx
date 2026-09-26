'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { toast } from 'sonner';


import { STORAGE_KEYS } from '../lib/constants';


const FitLogContext = createContext(null);


function normalizeWorkout(workout) {
  return {
    ...workout,
    duration: Number(workout?.duration) || 0,
    caloriesBurned: Number(workout?.caloriesBurned) || 0,
    rating: Number(workout?.rating) || 0,
    sets: Number(workout?.sets) || 0,
  };
}


function normalizeList(value) {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeWorkout);
}


function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}


export function FitLogProvider({ children }) {

  const [plan, setPlan] = useState([]);


  const [saved, setSaved] = useState([]);


  const [doneIds, setDoneIds] = useState([]);


  const [ready, setReady] = useState(false);


  useEffect(() => {
    setPlan(normalizeList(readStorage(STORAGE_KEYS.plan, [])));
    setSaved(normalizeList(readStorage(STORAGE_KEYS.saved, [])));
    setDoneIds(readStorage(STORAGE_KEYS.done, []));
    setReady(true);
  }, []);


  useEffect(() => {
    if (ready) {
      localStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(plan));
    }
  }, [plan, ready]);


  useEffect(() => {
    if (ready) {
      localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(saved));
    }
  }, [saved, ready]);


  useEffect(() => {
    if (ready) {
      localStorage.setItem(STORAGE_KEYS.done, JSON.stringify(doneIds));
    }
  }, [doneIds, ready]);


  const addToPlan = (workout) => {
   
    if (plan.some((item) => item.id === workout.id)) {
      toast.warning('This workout is already in today’s plan.');
      return;
    }

    if (plan.length >= 5) {
      toast.warning('Your plan is full. Finish a lift before adding another.');
      return;
    }

   
    setPlan((current) => [...current, workout]);

   
    toast.success('Added to today’s plan');
  };


  const saveForLater = (workout) => {
   
    if (saved.some((item) => item.id === workout.id)) {
      toast.warning('This workout is already saved.');
      return;
    }


    setSaved((current) => [...current, workout]);

   
    toast.success('Saved for later');
  };

  
  const removeFromPlan = (id) => {
  
    setPlan((current) => current.filter((item) => item.id !== id));

    
    setDoneIds((current) => current.filter((item) => item !== id));

  
    toast.info('Workout removed from today’s plan');
  };

 
  const removeFromSaved = (id) => {
    setSaved((current) => current.filter((item) => item.id !== id));
    toast.info('Workout removed from saved items');
  };

  
  const markAsDone = (id) => {
  
    setDoneIds((current) => (
      current.includes(id) ? current : [...current, id]
    ));

    toast.success('Workout marked as done');
  };


  const planMinutes = useMemo(
    () => plan.reduce(
      (sum, item) => sum + (Number(item.duration) || 0),
      0
    ),
    [plan]
  );

  
  const planCalories = useMemo(
    () => plan.reduce(
      (sum, item) => sum + (Number(item.caloriesBurned) || 0),
      0
    ),
    [plan]
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      doneIds,
      ready,
      planMinutes,
      planCalories,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
    }),
    [plan, saved, doneIds, ready, planMinutes, planCalories]
  );

  
  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}


export function useFitLog() {
  return useContext(FitLogContext);
}
