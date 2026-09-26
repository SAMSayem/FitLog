'use client';


import Link from 'next/link';


import { ArrowLeft, Bookmark, Plus } from 'lucide-react';


import { useEffect, useState } from 'react';


import { useParams } from 'next/navigation';


import { useFitLog } from '../../../../components/fitlog-provider';


export default function WorkoutDetailsPage() {
  
  const params = useParams();


  const [workout, setWorkout] = useState(null);

 
  const [loading, setLoading] = useState(true);

  
  const [missing, setMissing] = useState(false);

 
  const { addToPlan, saveForLater, plan } = useFitLog();

 
  useEffect(() => {
    async function loadWorkout() {
      try {
      
        const response = await fetch(`/api/fitlog/${params.id}`);

        
        if (response.status === 404) {
          setMissing(true);
          return;
        }

    
        if (!response.ok) {
          throw new Error('Failed to load workout');
        }

      
        const data = await response.json();

        setWorkout(data);
      } catch {
        
        setMissing(true);
      } finally {
        
        setLoading(false);
      }
    }

    
    if (params.id) {
      loadWorkout();
    }
  }, [params.id]);

 
  if (loading) {
    return (
      <main
        className="loading-box"
        style={{
          minHeight: '70vh',
          border: 0,
          background: 'transparent',
        }}>
        <div>
          <div
            className="spinner"
            style={{ margin: '0 auto 14px' }}/>
          <p>Loading workout…</p>
        </div>
      </main>
    );
  }


  if (missing || !workout) {
    return (
      <main className="not-found">
        <div>
          <p className="eyebrow">WORKOUT NOT FOUND</p>
          <h1>404</h1>
          <p>The workout you selected could not be loaded.</p>
          <Link href="/" className="primary-button">
            GO TO LIBRARY
          </Link>
        </div>
      </main>
    );
  }

 
  const alreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  return (
    <main className="detail-page page-shell">
      <div className="container-fitlog">
      
        <Link
          href="/"
          className="small-button"
          style={{ marginBottom: 20 }}>
          <ArrowLeft size={15} /> Back to Library
        </Link>

        <div className="detail-layout">
          
          <div className="detail-visual">
            <img
              src={workout.image}
              alt={workout.name}/>
          </div>

          <div>
           
            <p className="eyebrow">WORKOUT DETAILS</p>
            <h1 className="detail-title">
              {workout.name}
            </h1>

            
            <p className="detail-description">
              {workout.description}
            </p>

           
            <div className="tag-row detail-tags">
              {workout.muscleGroups.map((group) => (
                <span className="tag" key={group}>
                  {group}
                </span>
              ))}
            </div>

            
            <div className="spec-panel">
              {[
                ['EQUIPMENT', workout.equipment],
                ['DIFFICULTY', workout.difficulty],
                ['SETS', workout.sets],
                ['REPS', workout.reps],
                ['DURATION', `${workout.duration} min`],
                ['CALORIES', `${workout.caloriesBurned} kcal`],
                ['RATING', workout.rating],
              ].map(([label, value]) => (
                <div className="spec-row" key={label}>
                  <span className="spec-label">{label}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>

           
            <div className="instructions">
              <h2>INSTRUCTIONS</h2>
              <ol>
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={`${workout.id}-${index}`}>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

     
            <div className="action-row">
              <button
                className="primary-button"
                onClick={() => addToPlan(workout)}
                disabled={alreadyInPlan || plan.length >= 5}
                style={
                  alreadyInPlan || plan.length >= 5
                    ? {
                        opacity: 0.45,
                        cursor: 'not-allowed',
                      }
                    : undefined
                }>
                <Plus size={17} />
                {alreadyInPlan
                  ? 'Already in plan'
                  : "Add to today's plan"}
              </button>

              <button
                className="secondary-button"
                onClick={() => saveForLater(workout)}>
                <Bookmark size={17} />
                Save for later
              </button>
            </div>

           
            {plan.length >= 5 && !alreadyInPlan && (
              <p
                style={{
                  color: '#9ca3af',
                  fontSize: 11,
                  marginTop: 10,
                }} >
                Today&apos;s plan is full (5 lifts).
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
