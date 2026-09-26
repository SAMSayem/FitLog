
import { NextResponse } from 'next/server';


import { API_URL } from '../../../../../lib/constants';


export async function GET(request, { params }) {
 
  const { id } = await params;

  try {
   
    const response = await fetch(`${API_URL}/${id}`, {
      cache: 'no-store',
    });

    
    if (response.status === 404) {
      return NextResponse.json(
        { message: 'Workout not found' },
        { status: 404 }
      );
    }

   
    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch workout' },
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
