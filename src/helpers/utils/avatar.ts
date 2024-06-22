// utils/avatar.ts
export const getRandomAvatarUrl = (name: string): string => {
  if (!name) {
    // Provide a default letter if name is empty or undefined
    const defaultLetter = 'A';
    return `https://api.dicebear.com/9.x/initials/svg?seed=${defaultLetter}`;
  }
  const firstLetter = name.charAt(0).toUpperCase();
  return `https://api.dicebear.com/9.x/initials/svg?seed=${firstLetter}`;
};
