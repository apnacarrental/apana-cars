export interface FuelPriceItem {
  type: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  price: number;
}

export function getCarFuelPrices(car: {
  petrolPricePerKm?: number | null;
  dieselPricePerKm?: number | null;
  electricPricePerKm?: number | null;
  hybridPricePerKm?: number | null;
}): FuelPriceItem[] {
  const items: FuelPriceItem[] = [];
  if (typeof car.petrolPricePerKm === 'number' && car.petrolPricePerKm > 0) {
    items.push({ type: 'Petrol', price: car.petrolPricePerKm });
  }
  if (typeof car.dieselPricePerKm === 'number' && car.dieselPricePerKm > 0) {
    items.push({ type: 'Diesel', price: car.dieselPricePerKm });
  }
  if (typeof car.electricPricePerKm === 'number' && car.electricPricePerKm > 0) {
    items.push({ type: 'Electric', price: car.electricPricePerKm });
  }
  if (typeof car.hybridPricePerKm === 'number' && car.hybridPricePerKm > 0) {
    items.push({ type: 'Hybrid', price: car.hybridPricePerKm });
  }
  return items;
}

export function getCarStartingPricePerKm(car: {
  petrolPricePerKm?: number | null;
  dieselPricePerKm?: number | null;
  electricPricePerKm?: number | null;
  hybridPricePerKm?: number | null;
}): string {
  const prices = getCarFuelPrices(car);
  if (prices.length === 0) {
    return 'Price on request';
  }
  const minPrice = Math.min(...prices.map(p => p.price));
  return `from ₹${minPrice.toLocaleString('en-IN')}/km`;
}
