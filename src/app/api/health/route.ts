import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    // Test Firebase connection by trying to read from the todos collection
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todoCount = querySnapshot.size;
    
    return NextResponse.json({
      status: 'healthy',
      firebase: 'connected',
      todoCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        firebase: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 