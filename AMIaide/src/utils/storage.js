/* Serialize objects and store it with 'state' key */

// FIXME: Update the storage key to something unique to avoid inconsistent state in development
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY);
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    // non-serializable state
  }
};
