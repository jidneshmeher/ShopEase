const isDev = import.meta.env.MODE === "development";

export const logger = {
  log: (...args) => {
    if (isDev) console.log(...args);
  },
  warn: (...args) => {
    if (isDev) console.warn(...args);
  },
  error: (...args) => {
    if (isDev) {
      console.error(...args);
    } else {
    }
  }
};
