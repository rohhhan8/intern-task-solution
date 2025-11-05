/**
 * Given a dictionary of daily values, returns a dictionary with the summed value for each day of the week.
 * Missing day values are linearly interpolated.
 * @param {Object<string, number>} D - Input dictionary of { 'YYYY-MM-DD': value }.
 * @returns {Object<string, number>} - Output dictionary of { 'Day': sum }.
 */
function solution(D) {
    const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const daySums = new Array(7).fill(null);

    // Sum the values for each day of the week from the input.
    if (D) {
        for (const dateStr in D) {
            const value = D[dateStr];
            const date = new Date(dateStr);
            const jsDayIndex = date.getUTCDay(); // 0=Sun, 1=Mon, ...
            const dayIndex = jsDayIndex === 0 ? 6 : jsDayIndex - 1; // 0=Mon, ..., 6=Sun

            if (daySums[dayIndex] === null) {
                daySums[dayIndex] = value;
            } else {
                daySums[dayIndex] += value;
            }
        }
    }

    const nonNullIndexes = [];
    daySums.forEach((value, index) => {
        if (value !== null) {
            nonNullIndexes.push(index);
        }
    });

    if (nonNullIndexes.length === 0) {
        daySums.fill(0);
    } else if (nonNullIndexes.length === 1) {
        daySums.fill(daySums[nonNullIndexes[0]]);
    } else {
        // Interpolate gaps between days that have values.
        for (let i = 0; i < nonNullIndexes.length; i++) {
            const firstIndex = nonNullIndexes[i];
            const secondIndex = nonNullIndexes[(i + 1) % nonNullIndexes.length];
            
            const firstValue = daySums[firstIndex];
            const secondValue = daySums[secondIndex];

            const daysBetween = (secondIndex - firstIndex + 7) % 7;

            if (daysBetween > 1) {
                const valueDiff = secondValue - firstValue;
                const valueChangePerDay = valueDiff / daysBetween;

                for (let j = 1; j < daysBetween; j++) {
                    const gapIndex = (firstIndex + j) % 7;
                    const interpolatedValue = firstValue + valueChangePerDay * j;
                    daySums[gapIndex] = Math.round(interpolatedValue);
                }
            }
        }
    }

    // Format the final output dictionary.
    const output = {};
    DAY_NAMES.forEach((name, index) => {
        output[name] = daySums[index];
    });

    return output;
}

module.exports = solution;
