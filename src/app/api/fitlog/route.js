
import { NextResponse } from 'next/server';


import { API_URL } from '../../../../lib/constants';


export async function GET() {
  try {
    
    const response = await fetch(API_URL, { cache: 'no-store' });

   
    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch workouts' },
        { status: response.status }
      );
    }

    
    const data = await response.json();

    return NextResponse.json(data);
  } catch {
   
    return NextResponse.json(
      { message: 'Unable to connect to FitLog API' },
      { status: 500 }
    );
  }
}
