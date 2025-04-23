export const useLocalStorage = () => {
  const store = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const get = (key: string): string | null => {
    key = `@uni.form-${key}`;
    return localStorage.getItem(key);
  };

  const remove = (key: string) => {
    key = `@uni.form-${key}`;
    localStorage.removeItem(key);
  };

  return { store, get, remove };
};