// utils/avatar.ts
export const getRandomAvatarUrl = (name: string): string => {
    const firstLetter = name.charAt(0).toUpperCase();
    return `https://avatars.dicebear.com/api/initials/${firstLetter}.svg`;
};
