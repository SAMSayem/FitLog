
import Link from 'next/link';


export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        
        <p className="eyebrow">FITLOG</p>

        
        <h1>404</h1>

    
        <p>The workout page you are looking for does not exist.</p>

       
        <Link href="/" className="primary-button">
          GO TO WORKOUTS
        </Link>
      </div>
    </main>
  );
}
