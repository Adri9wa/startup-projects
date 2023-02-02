export const mFunc = (a, b, g) => {
  if (g <= a) {
    return 0;
  } else if (g <= (a + b) / 2) {
    return 2.0 * Math.pow((g - a) / (b - a), 2);
  } else if (g <= b) {
    return 1 - 2.0 * Math.pow((b - g) / (b - a), 2);
  } else {
    return 1;
  }
};

export const muFunc = (a, x) => {
  let u1, u2;

  if (x <= a - a / 2) {
    return { 1: 1 };
  } else if (x <= a - a / 4) {
    u1 = (3 * a - 4 * x) / a;
    u2 = (4 * x - 2 * a) / a;

    return { 1: u1, 2: u2 };
  } else if (x <= a) {
    u1 = (4 * a - 4 * x) / a;
    u2 = (4 * x - 3 * a) / a;

    return { 2: u1, 3: u2 };
  } else if (x <= a + a / 4) {
    u1 = (5 * a - 4 * x) / a;
    u2 = (4 * x - 4 * a) / a;

    return { 3: u1, 4: u2 };
  } else if (x <= a + a / 2) {
    u1 = (6 * a - 4 * x) / a;
    u2 = (4 * x - 5 * a) / a;

    return { 4: u1, 5: u2 };
  } else {
    return { 5: 1 };
  }
};

export const wFunc = (pGroup) => {
  let w = [];
  let sum = 0;
  pGroup.forEach((e) => (sum += e));

  for (let i = 0; i < 5; i++) {
    w.push(pGroup[i] / sum);
  }

  return w;
};

export const mfFunc = (wGroup, mGroup) => {
  let m = 0;

  for (let i = 0; i < 5; i++) {
    m += wGroup[i] * mGroup[i];
  }

  return m;
};

export const moFunc = (u, m, uUser) => {
  if (u === uUser) {
    return m;
  } else if ((uUser - u).abs() === 1) {
    return m / 2;
  } else {
    return 0;
  }
};

export const normalize = (term, minValue, desiredTerm) => {
  if (term === desiredTerm) return minValue;
  if (Math.abs(desiredTerm - term) === 1) return minValue / 2;
  return 0;
};
