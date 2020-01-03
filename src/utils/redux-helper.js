/**
 * Search for obj at a given path in state obj
 * @param {string} path
 * @param {object} obj
 * @returns {object}
 */
export const pathResolver = (path, obj) => {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null
  }, obj)
};

/**
 * Validate data and return a simple action object
 * @param {string} type
 * @param {object} [data]
 */
export const createAction = (type, data) => {
  if (data && data.type) {
    throw new Error('Type is a reserved name !');
  }

  if (data) {
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        throw new Error(`${key} is undefined !`);
      }
    });
  }

  return {type, ...data};
};
