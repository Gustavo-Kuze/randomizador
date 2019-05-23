function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

const _pickExclusiveOne = (min, max, picked) => {
    let temp = getRndInteger(min, max)
    if (!picked.includes(temp)) {
        return temp
    } else {
        return _pickExclusiveOne(min, max, picked)
    }
}

/**
 * @param {Number} min 
 * @param {Number} max 
 * @param {Number} count 
 * @description Leave count empty to return a single item
 * @returns {Number[]}
 */
const drawIntegers = (min, max, count = 0) => {
    if (count === 0) return _pickExclusiveOne(min, max)
    let returnArr = []
    for (let index = 0; index < count; index++) {
        let num = _pickExclusiveOne(min, max, returnArr)
        returnArr = [...returnArr, num]
    }
    return returnArr
}

export { drawIntegers }