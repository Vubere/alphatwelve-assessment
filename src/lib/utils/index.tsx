

const formatNumber = (value: number, currency?: string) => {
  if (currency) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value)?.replace(".00", "");
  }
  return value.toLocaleString();
};

const getPercentageChange = (previousValue: number, currentValue: number) => {
  if (previousValue === 0) return 100; // Avoid division by zero
  const change = ((currentValue - previousValue) / previousValue) * 100;
  return change;
};

export { formatNumber, getPercentageChange }