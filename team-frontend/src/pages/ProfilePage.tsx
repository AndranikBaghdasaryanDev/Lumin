import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useToastStore } from "../stores/toastStore";
import { Axios } from "../lib/api/axios";

interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  profileImage?: string;
  studentProfile?: {
    age?: number;
    major?: string;
  };
}

export const ProfilePage = () => {
  const { user, updateUserProfile } = useAuthStore();
  const { success, error } = useToastStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<number | null>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    profileImage: "",
    studentProfile: {
      age: undefined,
      major: ""
    }
  });

  // Auto-save function
  const autoSave = async (profileData: UserProfile) => {
    try {
      setIsSaving(true);
      
      // Filter out empty fields
      const updateData: Partial<UserProfile> = {};
      
      if (profileData.firstName && profileData.firstName.trim()) {
        updateData.firstName = profileData.firstName;
      }
      
      if (profileData.lastName && profileData.lastName.trim()) {
        updateData.lastName = profileData.lastName;
      }
      
      if (profileData.phone && profileData.phone.trim()) {
        updateData.phone = profileData.phone;
      }
      
      if (profileData.dateOfBirth && profileData.dateOfBirth.trim()) {
        updateData.dateOfBirth = profileData.dateOfBirth;
      }
      
      if (profileData.profileImage && profileData.profileImage.trim()) {
        updateData.profileImage = profileData.profileImage;
      }
      
      if (profileData.studentProfile) {
        const studentData: any = {};
        if (profileData.studentProfile.age !== undefined && profileData.studentProfile.age !== null) {
          studentData.age = profileData.studentProfile.age;
        }
        if (profileData.studentProfile.major && profileData.studentProfile.major.trim()) {
          studentData.major = profileData.studentProfile.major;
        }
        if (Object.keys(studentData).length > 0) {
          updateData.studentProfile = studentData;
        }
      }

      // Check if at least one field is provided
      if (Object.keys(updateData).length === 0) {
        setIsSaving(false);
        return;
      }

      const response = await Axios.patch("/api/profile", updateData);

      if (response.data.success) {
        const updatedProfile = response.data.data;
        setProfile(updatedProfile);
        updateUserProfile(updatedProfile);
        setHasChanges(false);
        // Show subtle success message for auto-save
        success("Profile auto-saved");
      }
    } catch (err: any) {
      error(err.response?.data?.error?.message || "Failed to auto-save profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced auto-save
  const triggerAutoSave = (profileData: UserProfile) => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    setHasChanges(true);
    
    const timer = setTimeout(() => {
      autoSave(profileData);
    }, 2000); // 2 seconds delay
    
    setAutoSaveTimer(timer);
  };

  // Load profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("/api/profile");

        if (response.data.success) {
          setProfile(response.data.data);
        } else {
          error(response.data.error?.message || "Failed to load profile");
        }
      } catch (err: any) {
        error(err.response?.data?.error?.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [error]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Filter out empty fields to avoid validation errors - at least one field required
      const updateData: Partial<UserProfile> = {};
      
      if (profile.firstName && profile.firstName.trim()) {
        updateData.firstName = profile.firstName;
      }
      
      if (profile.lastName && profile.lastName.trim()) {
        updateData.lastName = profile.lastName;
      }
      
      if (profile.phone && profile.phone.trim()) {
        updateData.phone = profile.phone;
      }
      
      if (profile.dateOfBirth && profile.dateOfBirth.trim()) {
        updateData.dateOfBirth = profile.dateOfBirth;
      }
      
      if (profile.profileImage && profile.profileImage.trim()) {
        updateData.profileImage = profile.profileImage;
      }
      
      if (profile.studentProfile) {
        const studentData: any = {};
        if (profile.studentProfile.age !== undefined && profile.studentProfile.age !== null) {
          studentData.age = profile.studentProfile.age;
        }
        if (profile.studentProfile.major && profile.studentProfile.major.trim()) {
          studentData.major = profile.studentProfile.major;
        }
        if (Object.keys(studentData).length > 0) {
          updateData.studentProfile = studentData;
        }
      }

      // Check if at least one field is provided
      if (Object.keys(updateData).length === 0) {
        error("At least one field must be provided to update profile");
        setIsSaving(false);
        return;
      }

      console.log("Sending profile update data:", updateData);

      const response = await Axios.patch("/api/profile", updateData);

      if (response.data.success) {
        success("Profile updated successfully!");
        const updatedProfile = response.data.data;
        setProfile(updatedProfile);
        updateUserProfile(updatedProfile);
      } else {
        error(response.data.error?.message || "Failed to update profile");
      }
    } catch (err: any) {
      console.error("Profile update error:", err.response?.data);
      error(err.response?.data?.error?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleChange = (field: string, value: string | number | undefined) => {
    let newProfile: UserProfile;
    
    if (field.includes("studentProfile.")) {
      const studentField = field.split(".")[1];
      newProfile = {
        ...profile,
        studentProfile: {
          ...profile.studentProfile,
          [studentField]: value
        }
      };
    } else {
      newProfile = {
        ...profile,
        [field]: value
      };
    }
    
    setProfile(newProfile);
    triggerAutoSave(newProfile);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">Manage your personal information and preferences</p>
            </div>
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <div className="flex items-center space-x-2 text-sm text-amber-600">
                  <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                  <span>Saving changes...</span>
                </div>
              )}
              {isSaving && (
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-spin"></div>
                  <span>Auto-saving...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Read-only)
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1234567890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.dateOfBirth || ""}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={profile.profileImage || ""}
                  onChange={(e) => handleChange("profileImage", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Student Profile */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Student Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={profile.studentProfile?.age || ""}
                  onChange={(e) => handleChange("studentProfile.age", e.target.value ? parseInt(e.target.value) : undefined)}
                  min={0}
                  max={120}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major/Field of Study
                </label>
                <input
                  type="text"
                  value={profile.studentProfile?.major || ""}
                  onChange={(e) => handleChange("studentProfile.major", e.target.value)}
                  placeholder="Computer Science"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  minLength={2}
                />
              </div>
            </div>
          </div>

          {/* Profile Image Preview */}
          {profile.profileImage && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Image Preview</h2>
              <div className="flex items-center space-x-6">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150";
                  }}
                />
                <div>
                  <p className="text-sm text-gray-600">Current profile image</p>
                  <p className="text-xs text-gray-500 mt-1">If the image doesn't load, the URL might be invalid</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
