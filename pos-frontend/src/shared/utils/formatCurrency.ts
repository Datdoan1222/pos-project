import { CURRENCY } from '@shared/constants/config';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: CURRENCY,
  }).format(amount);
};