'use client';


import Link from 'next/link';


import { Check, Clock3, Flame, Star, X } from 'lucide-react';

import { Suspense, useEffect, useState } from 'react';


import { useSearchParams } from 'next/navigation';


import { useFitLog } from '../../../components/fitlog-provider';

function MyPlanContent() {
  
  const [loading, setLoading] = useState(true);

  
  const searchParams = useSearchParams();

  
  const tab = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';


  const {
    plan,
    saved,
    doneIds,
    ready,
    planMinutes,
    planCalories,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitLog();


  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        await fetch('/api/fitlog', { cache: 'no-store' });
      } finally {
       
        if (active) setLoading(false);
      }
    }

    loadWorkouts();

   
    return () => {
      active = false;
    };
  }, []);

  
  const items = tab === 'plan' ? plan : saved;

  return (
    <main className="plan-page page-shell">
      <div className="container-fitlog">
    
        <div className="plan-header">
          <div>
            <p className="eyebrow">DAILY LOG</p>
            <h1 className="section-title">MY PLAN</h1>
            <p className="section-subtitle">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <Link href="/" className="small-button">
            Browse workouts
          </Link>
        </div>

        
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Exercises</div>
            <div className="metric-value">{plan.length}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Minutes</div>
            <div className="metric-value">{planMinutes}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Calories</div>
            <div className="metric-value">{planCalories}</div>
          </div>
        </div>

       
        <div className="tabs-row">
          <Link
            href="/my-plan?tab=plan"
            className={`tab-button ${tab === 'plan' ? 'active' : ''}`}>
            Today&apos;s Plan
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className={`tab-button ${tab === 'saved' ? 'active' : ''}`}>
            Saved
          </Link>
        </div>

     
        {loading || !ready ? (
          <div className="loading-box">
            <div>
              <div
                className="spinner"
                style={{ margin: '0 auto 14px' }} />
              <p>Loading workouts…</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          
          <div className="empty-box">
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                {tab === 'saved' ? 'SAVED' : 'MY PLAN'}
              </p>

              <h2
                className="section-title"
                style={{ fontSize: 27 }}>
                NOTHING HERE YET
              </h2>

              <p
                style={{
                  maxWidth: 360,
                  margin: '10px auto 18px',
                }}>
                Browse the library and add a lift to get today moving.
              </p>

              <Link href="/" className="primary-button">
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          
          <div className="plan-list">
            {items.map((workout) => {
            
              const done = doneIds.includes(workout.id);

              return (
                <article
                  className="plan-item"
                  key={`${tab}-${workout.id}`}>
                  
                  <img
                    className="plan-thumb"
                    src={workout.image}
                    alt={workout.name} />

                  <div>
                  
                    <h2 className="plan-item-title">
                      {workout.name}
                    </h2>
                    <p className="plan-item-equipment">
                      {workout.equipment}
                    </p>

                    
                    <div className="stats-row">
                      <span className="stat">
                        <Clock3 /> {Number(workout.duration) || 0} min
                      </span>

                      <span className="stat">
                        <Flame /> {Number(workout.caloriesBurned) || 0} kcal
                      </span>

                      <span className="stat">
                        <Star /> {Number(workout.rating) || 0}
                      </span>
                    </div>

                   
                    {done && (
                      <div className="done-label">
                        DONE FOR TODAY
                      </div>
                    )}
                  </div>

                 
                  <div className="plan-actions">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="small-button">
                      View Details
                    </Link>

                   
                    {tab === 'plan' && (
                      <button
                        className={`small-button ${done ? 'done-button' : ''}`}
                        onClick={() => markAsDone(workout.id)}
                        disabled={done}>
                        <Check size={14} />
                        {done ? 'Done' : 'Mark as Done'}
                      </button>
                    )}

                    
                    <button
                      className="small-button danger-button"
                      onClick={() => (
                        tab === 'plan'
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      )}
                      aria-label={`Remove ${workout.name}`}>
                      <X size={14} /> Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}


export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <main className="plan-page page-shell">
          <div className="container-fitlog loading-box">
            <div>
              <div
                className="spinner"
                style={{ margin: '0 auto 14px' }}/>
              <p>Loading workouts…</p>
            </div>
          </div>
        </main>
      }>
      <MyPlanContent />
    </Suspense>
  );
}
