"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function FirebaseDebug() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const [envVars, setEnvVars] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Check environment variables
    const vars = {
      apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    setEnvVars(vars);

    // Test Firebase connection
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'healthy') {
          setStatus('connected');
        } else {
          setStatus('error');
          setError(data.error || 'Unknown error');
        }
      })
      .catch(err => {
        setStatus('error');
        setError(err.message);
      });
  }, []);

  const testAddTodo = async () => {
    try {
      const response = await fetch('/api/test-todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'Test todo from debug component' }),
      });
      
      if (response.ok) {
        alert('Test todo added successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to add test todo: ${error.error}`);
      }
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔥 Firebase Debug Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Environment Variables Status */}
        <div>
          <h4 className="font-medium mb-2">Environment Variables:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                {value ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <span className={value ? 'text-green-700' : 'text-red-700'}>
                  {key}: {value ? 'SET' : 'MISSING'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Status */}
        <div>
          <h4 className="font-medium mb-2">Connection Status:</h4>
          <div className="flex items-center gap-2">
            {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'connected' && <CheckCircle className="w-4 h-4 text-green-500" />}
            {status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
            <span className={status === 'connected' ? 'text-green-700' : status === 'error' ? 'text-red-700' : 'text-gray-700'}>
              {status === 'loading' && 'Checking connection...'}
              {status === 'connected' && 'Connected to Firebase'}
              {status === 'error' && `Error: ${error}`}
            </span>
          </div>
        </div>

        {/* Test Actions */}
        <div className="flex gap-2">
          <Button onClick={testAddTodo} size="sm">
            Test Add Todo
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            size="sm" 
            variant="outline"
          >
            Refresh Page
          </Button>
        </div>

        {/* Instructions */}
        {Object.values(envVars).some(v => !v) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-yellow-800 text-sm">
              <strong>Missing Environment Variables:</strong> Please add the missing Firebase configuration 
              variables to your Replit Secrets or .env.local file. See FIREBASE_SETUP.md for instructions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 