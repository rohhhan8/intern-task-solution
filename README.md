# Weekly Data Interpolation

This project contains a JavaScript function that takes a series of date-stamped values and generates a complete, seven-day week summary. It intelligently fills in any missing days through linear interpolation.

## The Problem

Given a set of data points, like `{'2020-01-01': 4, '2020-01-04': 10}`, the goal is to produce a full week's worth of data. The output should sum the values for each day of the week and estimate the values for any missing days.

## My Approach

The solution handles this in three main steps:

1.  **Sum Values:** First, we iterate through the input data and sum the values for each day of the week (Monday, Tuesday, etc.).

2.  **Handle Special Cases:**
    *   If there's no input data, we return a week with `0` for every day.
    *   If there's only data for a single day, we assume that value should apply to all other days.

3.  **Interpolate Gaps:** For any missing days, the logic finds the nearest days with data before and after the gap. It then calculates a steady rate of change to estimate the values for the missing days, ensuring a smooth transition. This works even for gaps that wrap around the weekend (e.g., from Friday to Monday).

## Getting Started

To set up the project, first install the necessary dependencies:

```bash
npm install
```

## How to Test the Code

You can verify the solution by running the included test suite:

```bash
npm test
```

This will execute the tests in `solution.test.js` to confirm that everything is working correctly.
