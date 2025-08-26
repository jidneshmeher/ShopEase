const isDev = import.meta.env.MODE === "development";

export const logger = {
  log: (...args) => {
    if (isDev) {
      console.log(...args);
      // console.trace();
    }
  },
  warn: (...args) => {
    if (isDev) {
      console.warn(...args);
      // console.trace();
    }
  },
  error: (...args) => {
    if (isDev) {
      console.error(...args);
      // console.trace();
    }
  }
};
