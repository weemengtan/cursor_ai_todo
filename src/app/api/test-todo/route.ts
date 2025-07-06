import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    console.log('🧪 Test API: Adding todo:', text);
    
    const docRef = await addDoc(collection(db, 'todos'), {
      text: text.trim(),
      completed: false,
      editing: false,
      createdAt: new Date(),
    });

    console.log('✅ Test API: Todo added successfully with ID:', docRef.id);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Test todo added successfully'
    });
  } catch (error) {
    console.error('❌ Test API: Error adding todo:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to add test todo via API'
      },
      { status: 500 }
    );
  }
} 