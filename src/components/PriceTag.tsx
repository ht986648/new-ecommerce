import React from 'react';
import { formatPrice } from '@/lib/formatPrice';
import { FaDollarSign, FaTag } from 'react-icons/fa';

interface PriceTagProps {
  price: number;
  className?: string;
  variant?: 'default' | 'large' | 'small' | 'minimal' | 'badge' | 'highlight' | 'gradient';
  showIcon?: boolean;
  showCurrency?: boolean;
  originalPrice?: number;
  discountPercentage?: number;
}

const PriceTag = ({ 
  price, 
  className = '', 
  variant = 'default',
  showIcon = false,
  showCurrency = true,
  originalPrice,
  discountPercentage
}: PriceTagProps) => {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        return 'text-3xl lg:text-4xl font-bold text-primary';
      case 'small':
        return 'text-sm font-semibold text-base-content';
      case 'minimal':
        return 'text-base font-medium text-base-content';
      case 'badge':
        return 'badge badge-primary badge-lg font-bold text-white shadow-lg';
      case 'highlight':
        return 'bg-gradient-to-r from-success to-success-focus text-white px-4 py-2 rounded-lg font-bold shadow-lg';
      case 'gradient':
        return 'bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold text-xl';
      default:
        return 'text-xl font-bold text-primary';
    }
  };

  const formatPriceWithoutSymbol = (price: number) => {
    return formatPrice(price).replace('$', '');
  };

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1 ${getVariantClasses()} ${className}`}>
        {showIcon && <FaTag className="text-sm" />}
        <span data-testid="price-tag" title={formatPrice(price)}>
          {formatPrice(price)}
        </span>
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <div className={`inline-flex items-center gap-2 ${getVariantClasses()} ${className}`}>
        {showIcon && <FaDollarSign className="text-lg" />}
        <span data-testid="price-tag" title={formatPrice(price)}>
          {showCurrency ? formatPrice(price) : formatPriceWithoutSymbol(price)}
        </span>
        {discountPercentage && (
          <span className="bg-error/20 text-error px-2 py-1 rounded text-sm font-semibold">
            -{discountPercentage}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center flex-wrap gap-2 ${className}`}>
      {/* Main Price */}
      <div className="flex items-center gap-1">
        {showIcon && <FaDollarSign className={`${variant === 'large' ? 'text-2xl' : 'text-lg'} text-primary`} />}
        <span 
          className={getVariantClasses()}
          data-testid="price-tag" 
          title={formatPrice(price)}
        >
          {showCurrency ? formatPrice(price) : formatPriceWithoutSymbol(price)}
        </span>
      </div>

      {/* Original Price (if provided) */}
      {originalPrice && originalPrice > price && (
        <div className="flex items-center gap-2">
          <span className="text-base-content/50 line-through text-sm">
            {formatPrice(originalPrice)}
          </span>
          {discountPercentage && (
            <span className="badge badge-error text-white font-semibold text-xs">
              -{discountPercentage}%
            </span>
          )}
        </div>
      )}

      {/* Standalone Discount Badge */}
      {discountPercentage && !originalPrice && (
        <span className="badge badge-error text-white font-semibold text-xs animate-pulse">
          -{discountPercentage}% OFF
        </span>
      )}
    </div>
  );
};

// Compound component for complex pricing displays
const PriceDisplay = {
  // Main price component
  Price: PriceTag,
  
  // Specialized variants as separate components
  Hero: ({ price, className = '', ...props }: Omit<PriceTagProps, 'variant'>) => (
    <PriceTag price={price} variant="large" className={className} {...props} />
  ),
  
  Card: ({ price, className = '', ...props }: Omit<PriceTagProps, 'variant'>) => (
    <PriceTag price={price} variant="default" className={className} {...props} />
  ),
  
  Badge: ({ price, className = '', ...props }: Omit<PriceTagProps, 'variant'>) => (
    <PriceTag price={price} variant="badge" className={className} {...props} />
  ),
  
  Highlight: ({ price, className = '', ...props }: Omit<PriceTagProps, 'variant'>) => (
    <PriceTag price={price} variant="highlight" className={className} {...props} />
  ),
  
  Gradient: ({ price, className = '', ...props }: Omit<PriceTagProps, 'variant'>) => (
    <PriceTag price={price} variant="gradient" className={className} {...props} />
  ),
  
  // Complex pricing component with savings
  WithSavings: ({ 
    price, 
    originalPrice, 
    className = '',
    showPercentage = true 
  }: {
    price: number;
    originalPrice: number;
    className?: string;
    showPercentage?: boolean;
  }) => {
    const savings = originalPrice - price;
    const percentage = Math.round((savings / originalPrice) * 100);
    
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-baseline gap-3">
          <PriceTag price={price} variant="large" />
          <span className="text-lg text-base-content/50 line-through">
            {formatPrice(originalPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-success font-semibold">
            You save {formatPrice(savings)}
          </span>
          {showPercentage && (
            <span className="badge badge-success text-white font-semibold">
              {percentage}% OFF
            </span>
          )}
        </div>
      </div>
    );
  }
};

export default PriceTag;
export { PriceDisplay };
