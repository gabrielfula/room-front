export function removeMask(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export const parseNumber = (value: any): number => {
  if (typeof value === 'string') {
    const cleanedValue = value.replace(',', '.'); 
    const numberValue = parseFloat(cleanedValue);
    return isNaN(numberValue) ? 0 : numberValue;
  }
  return value;
};