const STORAGE_KEY = "mood-journal-entries";

export const saveEntry = (entry) => {
  const entries = getEntries();

  // Check if an entry for today already exists
  const existingEntryIndex = entries.findIndex((e) => e.date === entry.date);

  if (existingEntryIndex >= 0) {
    // Update existing entry
    entries[existingEntryIndex] = entry;
  } else {
    // Add new entry
    entries.push(entry);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntries = () => {
  const entriesJson = localStorage.getItem(STORAGE_KEY);
  if (!entriesJson) return [];

  try {
    return JSON.parse(entriesJson);
  } catch (error) {
    console.error("Error parsing journal entries:", error);
    return [];
  }
};

export const getEntryByDate = (date) => {
  const entries = getEntries();
  return entries.find((entry) => entry.date === date);
};

export const getEntriesByMood = (mood) => {
  const entries = getEntries();
  return entries.filter((entry) => entry.mood === mood);
};

export const deleteEntry = (id) => {
  const entries = getEntries();
  const updatedEntries = entries.filter((entry) => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
};
