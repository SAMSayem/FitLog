
import Link from 'next/link';


import { Clock3, Flame, Star } from 'lucide-react';


export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="workout-card">
     
      <div className="workout-card-image-wrap">
        <img
          className="workout-card-image"
          src={workout.image}
          alt={workout.name}/>
      </div>

      <div className="workout-card-body">
        
        <div className="tag-row">
          {workout.muscleGroups.map((group) => (
            <span className="tag" key={group}>
              {group}
            </span>
          ))}
        </div>

     
        <h3 className="workout-card-title">
          {workout.name}
        </h3>

    
        <p className="equipment-line">
          {workout.equipment}
        </p>

       
        <div className="stats-row">
          <span className="stat">
            <Clock3 /> {workout.duration} min
          </span>

          <span className="stat">
            <Flame /> {workout.caloriesBurned} kcal
          </span>

          <span className="stat">
            <Star /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
