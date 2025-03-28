const STORAGE_KEY = 'contacts_data';

export const saveToLocalStorage = (contacts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    return true;
  } catch (err) {
    console.error('Error saving to localStorage:', err);
    return false;
  }
};

export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error loading from localStorage:', err);
    return [];
  }
};