'use client';


import { useEffect, useMemo, useState } from 'react';


import { ArrowDownRight, ChevronDown } from 'lucide-react';


import Link from 'next/link';


import WorkoutCard from './workout-card';


export default function HomePage() {

  const [workouts, setWorkouts] = useState([]);


  const [loading, setLoading] = useState(true);


  const [error, setError] = useState('');

 
  const [sortBy, setSortBy] = useState('duration');


  useEffect(() => {
    async function loadWorkouts() {
      try {
     
        const response = await fetch('/api/fitlog');

        
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        
        const data = await response.json();

        
        setWorkouts(data);
      } catch {
        
        setError('We could not load the workout library right now.');
      } finally {
   
        setLoading(false);
      }
    }

    
    loadWorkouts();
  }, []);

  
  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
     
      if (sortBy === 'calories') {
        return b.caloriesBurned - a.caloriesBurned;
      }

      
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }

      
      return a.duration - b.duration;
    });
  }, [workouts, sortBy]);

  return (
    <main className="page-shell">
     
      <section className="hero" id="top">
        <div className="container-fitlog hero-grid">
          <div className="hero-copy">
           
            <p className="eyebrow">WORKOUT LIBRARY</p>

            
            <h1 className="hero-title display-font">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            
            <p className="hero-subtitle">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

        
            <div style={{ marginTop: 28 }}>
              <Link href="#library" className="primary-button">
                BROWSE WORKOUTS <ArrowDownRight size={17} />
              </Link>
            </div>
          </div>

          
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="/banner.png"
              alt="FitLog workout illustration"/>
          </div>
        </div>
      </section>

    
      <section className="library-section" id="library">
        <div className="container-fitlog">
          <div className="section-top">
            <div>
            
              <h2 className="section-title">THE LIBRARY</h2>

              
              <p className="section-subtitle">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

           
            <div className="sort-row">
              <label htmlFor="sort">Sort By</label>

              <select
                id="sort"
                className="sort-select"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}>
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              
              <ChevronDown className="sort-icon" size={15} />
            </div>
          </div>

          {loading && (
            <div className="loading-box">
              <div>
                <div
                  className="spinner"
                  style={{ margin: '0 auto 14px' }}/>
                <p>Loading workouts…</p>
              </div>
            </div>
          )}

       
          {!loading && error && (
            <div className="error-box">
              <p>{error}</p>
            </div>
          )}

         
          {!loading && !error && (
            <div className="library-grid">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}/>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
