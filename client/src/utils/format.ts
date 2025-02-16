export const separateNumbers = (n: number): string =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const pluralizeExperience = (experience: number): string => {
  if (experience === 1) return 'год';
  if (experience > 1 && experience < 5) return 'года';
  return 'лет';
};

export const capitalize = (s: string): string =>
  s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;
