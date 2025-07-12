// This is the page.ts file for the purchase-success route
// It helps with loading data for the success page

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
  const productId = url.searchParams.get('product') || '';
  const transactionId = url.searchParams.get('transaction') || '';
  const orderId = url.searchParams.get('order_id') || '';
  
  return {
    productId,
    transactionId: transactionId || orderId,
  };
};