function copyActivity(x) {
  // so far we only expect to deal with the following property types
  // shallow Array, String, Number
  function copy(acc, k) {
    const val = x[k]
    let cpy
    if (Array.isArray(val)) {
      cpy = val.slice(0)
    } else {
      cpy = val
    }
    acc[k] = cpy
    return acc
  }
  return Object.keys(x).reduce(copy, {})
}

/**
 * Clones the activities passed to it.
 * Any modifications applied to the original won't be visible in the copy.
 * This includes additions/removals to the original Map
 *
 * @name ahDeepClone
 * @function
 * @param {Map.<Number, Object>} activities to be cloned
 * @return {Map.<Number, Object>} cloned activities
 */
module.exports = function deepClone(activities) {
  const copy = new Map()
  for (const [ k, v ] of activities.entries()) {
    copy.set(k, copyActivity(v))
  }
  return copy
}
