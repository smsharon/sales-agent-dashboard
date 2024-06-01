export function formatNumber(number) {
    
    return number.toLocaleString('en-US', { style: 'currency', currency: 'KES' });
  }
  