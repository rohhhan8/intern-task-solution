const solution = require('./solution');

describe('solution', () => {
    test('should return all zeros for an empty or null input', () => {
        const expectedOutput = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
        expect(solution({})).toEqual(expectedOutput);
        expect(solution(null)).toEqual(expectedOutput);
    });

    test('should correctly sum values for each day', () => {
        const input = {
            '2020-01-01': 4,  // Wed
            '2020-01-08': -2, // Wed (previous week)
            '2020-01-02': 4,  // Thu
            '2020-01-06': -6, // Mon
        };
        const result = solution(input);
        // Only check the days with data, others will be interpolated.
        expect(result['Wed']).toEqual(2); // 4 + (-2)
        expect(result['Thu']).toEqual(4);
        expect(result['Mon']).toEqual(-6);
    });

    test('should fill all days with the same value if only one day has data', () => {
        const input = { '2020-01-01': 10 }; // Wednesday
        const expectedOutput = { 'Mon': 10, 'Tue': 10, 'Wed': 10, 'Thu': 10, 'Fri': 10, 'Sat': 10, 'Sun': 10 };
        expect(solution(input)).toEqual(expectedOutput);
    });

    test('should interpolate values for a simple gap', () => {
        const input = {
            '2020-01-06': 2,  // Mon
            '2020-01-09': 8,  // Thu
        };
        // Gap: Tue, Wed. 3 steps (Mon->Tue, Tue->Wed, Wed->Thu). Diff = 6. Step = 2.
        const expectedOutput = {
            'Mon': 2, 'Tue': 4, 'Wed': 6, 'Thu': 8, 'Fri': 7, 'Sat': 5, 'Sun': 4
        };
        expect(solution(input)).toEqual(expectedOutput);
    });

    test('should interpolate values correctly with multiple gaps', () => {
        const input = {
            '2020-01-01': 6,  // Wed
            '2020-01-04': 12, // Sat
            '2020-01-06': 2,  // Mon
        };
        // Gaps: Thu, Fri (between Wed-Sat) and Sun (between Sat-Mon) and Tue (between Mon-Wed)
        const expectedOutput = { 'Mon': 2, 'Tue': 4, 'Wed': 6, 'Thu': 8, 'Fri': 10, 'Sat': 12, 'Sun': 7 };
        expect(solution(input)).toEqual(expectedOutput);
    });

    test('should interpolate values when the gap wraps around the weekend', () => {
        const input = {
            '2020-01-03': 10, // Fri
            '2020-01-07': 30  // Tue
        };
        // Gap Fri -> Tue is 4 steps. Diff = 20. Step = 5. Sat=15, Sun=20, Mon=25.
        // Gap Tue -> Fri is 3 steps. Diff = -20. Step = -6.66. Wed=23, Thu=17.
        const expectedOutput = { 'Mon': 25, 'Tue': 30, 'Wed': 23, 'Thu': 17, 'Fri': 10, 'Sat': 15, 'Sun': 20 };
        expect(solution(input)).toEqual(expectedOutput);
    });
});
