import React from 'react';
import { formatPrice } from '@/lib/formatPrice';

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  return (
    <span
      className={`badge ${className ?? ''}`}
      title={formatPrice(price)}
      data-testid="price-tag"
    >
      {formatPrice(price)}
    </span>
  );
};

export default PriceTag;
