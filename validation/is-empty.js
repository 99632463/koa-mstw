const isEmpty = obj => {
  return obj === undefined || obj === null || obj === false ||
    (typeof obj === 'string' && !obj.trim().length) ||
    (typeof obj === 'object' && !Object.keys(obj).length)
}

module.exports = isEmpty;