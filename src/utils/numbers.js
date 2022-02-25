/**
 * Get number with fixed decimal spaces.
 * @param decimals - number of decimal spaces
 * @returns @param num rounded to @param decimals
 */
export const toFixedNumber = (num, decimals) => {
    const pow = Math.pow(10, decimals)
    return Math.round(num * pow) / pow
}
