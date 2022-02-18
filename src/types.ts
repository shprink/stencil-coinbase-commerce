export type Network = 'bitcoin' | 'bitcoincash' | 'ethereum' | 'litecoin' | 'dogecoin';
export type PricingType = 'fixed_price' | 'no_price';
export type PaymentStatus = 'NEW' | 'PENDING' | 'CONFIRMED' | 'FAILED';
export type ChargeStatus = 'NEW' | 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'UNRESOLVED' | 'RESOLVED' | 'CANCELED' | 'REFUND PENDING' | 'REFUNDED';
export type ChargeContext = 'UNDERPAID' | 'OVERPAID' | 'DELAYED' | 'MULTIPLE' | 'MANUAL' | 'OTHER';
export type FiatCurrency = string;
export type CryptoCurrency = string;

export interface CryptoMoney {
  amount: string;
  currency: CryptoCurrency;
}

export interface FiatMoney {
  amount: string;
  currency: FiatCurrency;
}

export interface ChargePricing {
  local: FiatMoney;
  bitcoin?: CryptoMoney;
  bitcoincash?: CryptoMoney;
  ethereum?: CryptoMoney;
  litecoin?: CryptoMoney;
  dogecoin?: CryptoMoney;
}

export interface Payment {
  network: Network;
  transactionId: string;
  status: PaymentStatus;
  value: {
    crypto: CryptoMoney;
    local: FiatMoney;
  };
  block: {
    height?: number;
    hash?: string;
    confirmations: number;
    confirmationsRequired: number;
  };
}

interface ChargeState {
  status: ChargeStatus;
  context?: ChargeContext;
  time: string;
  payment?: {
    network: Network;
    transactionId: string;
  };
}

export interface Charge {
  code: string;
  createdAt: string;
  confirmedAt?: string;
  expiresAt: string;

  addresses: Record<Network, string>;
  pricingType: PricingType;
  pricing?: ChargePricing;
  payments: Array<Payment>;
  timeline: Array<ChargeState>;

  name?: string;
  description?: string;
  logoUrl?: string;

  checkout?: { id: string };

  redirectUrl?: string;
  thirdPartyProvider?: string;
}

export type MessageData = {
  event: 'charge:created' | 'charge:failed' | 'checkout_modal_closed' | 'error_not_found' | 'payment_detected' | 'charge_failed' | 'charge_confirmed' | 'checkout_modal_loaded';
  charge: Charge;
  buttonId?: string;
};
