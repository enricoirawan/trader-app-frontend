import BigNumber from 'bignumber.js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function format2Decimal(value: string): string {
  return new BigNumber(value).toFormat(2);
}

export function getVolumeChangeType(
  value: string
): 'plus' | 'minus' | 'neutral' {
  const bn = new BigNumber(value);

  if (bn.isZero()) return 'neutral';
  if (bn.isNegative()) return 'minus';
  return 'plus';
}
