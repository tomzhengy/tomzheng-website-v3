// Logger utility to suppress development console logs
const isProduction = process.env.NODE_ENV === 'production';

// Original console methods
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
};

// If you want to completely disable certain types of logs in development
// You can uncomment these lines
if (!isProduction) {
  // Filter out Next.js development messages
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    // Filter out known Next.js warnings
    if (
      args[0] && 
      (typeof args[0] === 'string') && 
      (args[0].includes('metadataBase') ||
       args[0].includes('Fast Refresh') ||
       args[0].includes('preloaded using link preload'))
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

export default {
  log: (...args) => {
    if (isProduction) return;
    originalConsole.log(...args);
  },
  warn: (...args) => {
    if (isProduction) return;
    originalConsole.warn(...args);
  },
  error: (...args) => {
    // Always show errors
    originalConsole.error(...args);
  },
}; 