export const env = (key: string, defaultValue: string = ''): string => process.env[key] || defaultValue;
