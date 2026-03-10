export const STORAGE_KEY = 'enseignant-profile';
export const STORAGE_IMAGE_KEY = 'enseignant-profile-image';

export interface StoredProfile {
  firstName: string;
  name: string;
  email: string;
  phone: string;
  matiere: string;
}

export function getStoredEnseignantProfile(): {
  name: string;
  avatarUrl: string | null;
} | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedImage = localStorage.getItem(STORAGE_IMAGE_KEY);
    if (!saved) return null;
    const profile: Partial<StoredProfile> = JSON.parse(saved);
    const name = [profile.firstName, profile.name].filter(Boolean).join(' ').trim();
    return {
      name: name || 'Enseignant',
      avatarUrl: savedImage,
    };
  } catch {
    return null;
  }
}
