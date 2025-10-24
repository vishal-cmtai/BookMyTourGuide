'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/useAuth';
import { GuideProfile, GuideProfileFormData } from "@/types/auth"

export default function GuideDashboard() {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error,
    guideProfile,
    getCurrentUser, 
    logout, 
    getGuideProfile, 
    updateGuideProfile,
    clearUserError
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<GuideProfileFormData>({
    name: '',
    mobile: '',
    dob: '',
    state: '',
    country: '',
    age: 0,
    languages: [],
    experience: '',
    specializations: [],
    availability: [],
    hourlyRate: 0,
    description: '',
  });
  const [files, setFiles] = useState<{ photo?: File; license?: File }>({});

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
    const loadGuideProfile = async () => {
      if (user?.role === 'guide') {
        try {
          await getGuideProfile();
        } catch (error) {
          // Error handled by useAuth hook
        }
      }
    };

    if (user) {
      loadGuideProfile();
    }
  }, [user, getGuideProfile]);

  useEffect(() => {
    if (guideProfile) {
      setFormData({
        name: guideProfile.name || '',
        mobile: guideProfile.mobile || '',
        dob: guideProfile.dob ? guideProfile.dob.split('T')[0] : '',
        state: guideProfile.state || '',
        country: guideProfile.country || '',
        age: guideProfile.age || 0,
        languages: guideProfile.languages || [],
        experience: guideProfile.experience || '',
        specializations: guideProfile.specializations || [],
        availability: guideProfile.availability || [],
        hourlyRate: guideProfile.hourlyRate || 0,
        description: guideProfile.description || '',
      });
    }
  }, [guideProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInput = (name: keyof GuideProfileFormData, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [name]: array }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      const file = selectedFiles[0];
      setFiles(prev => ({ ...prev, [name]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null && value !== '') {
          formDataToSend.append(key, value.toString());
        }
      });
      
      // Add files
      if (files.photo) formDataToSend.append('photo', files.photo);
      if (files.license) formDataToSend.append('license', files.license);

      const result = await updateGuideProfile(formDataToSend);

      if (result.success) {
        setIsEditing(false);
        clearUserError();
      }
    } catch (error) {
      // Error handled by useAuth hook
    }
  };

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
              <h1 className="text-xl font-bold text-primary">Guide Dashboard</h1>
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

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Approval Status */}
        {guideProfile && !guideProfile.isApproved && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 animate-fade-in-up">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Account Pending Approval
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Your guide account is currently under review.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 animate-fade-in-up animate-delay-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={isEditing ? "" : "red-gradient"}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Mobile Number</label>
                  <Input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Your mobile number"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="red-gradient"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="text-foreground">{guideProfile?.name || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Mobile</h3>
                  <p className="text-foreground">{guideProfile?.mobile || 'Not provided'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
