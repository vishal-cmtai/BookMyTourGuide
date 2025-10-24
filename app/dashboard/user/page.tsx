'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

export default function UserDashboard() {
  const { user, isAuthenticated, loading, getCurrentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) {
        try {
          await getCurrentUser();
        } catch (error) {
          // Redirect to login handled by useAuth
        }
      }
    };

    initAuth();
  }, [isAuthenticated, getCurrentUser]);

  useEffect(() => {
    if (user && user.role !== 'user') {
      router.push('/login');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Tourist Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-foreground">Welcome, {user?.name}</span>
              <Button onClick={logout} variant="destructive" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-foreground">Browse Tours</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Discover amazing tours and experiences
                </p>
                <div className="mt-3">
                  <Button className="text-primary hover:text-primary/80" variant="ghost">
                    View Tours →
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-foreground">Find Guides</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect with local tour guides
                </p>
                <div className="mt-3">
                  <Button className="text-primary hover:text-primary/80" variant="ghost">
                    Browse Guides →
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-foreground">My Bookings</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  View your tour bookings and history
                </p>
                <div className="mt-3">
                  <Button className="text-primary hover:text-primary/80" variant="ghost">
                    View Bookings →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
