// PayPal SDK Type Declarations
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonsConfig) => {
        render: (container: HTMLElement) => Promise<void>;
      };
    };
  }
}

interface PayPalButtonsConfig {
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError: (err: any) => void;
  onCancel: () => void;
  style?: {
    layout?: 'vertical' | 'horizontal';
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
    shape?: 'rect' | 'pill';
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay';
    height?: number;
  };
}

export {};
