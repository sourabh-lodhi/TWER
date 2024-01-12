export const setLocalData = (key, value) =>
  localStorage.setItem(`${key}`, value);
export const getLocalData = (key) => localStorage.getItem(key);
