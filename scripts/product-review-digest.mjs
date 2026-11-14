import { productRecords } from '../src/content/product-records.ts';
import { productReviewPacket, productApprovals } from '../src/content/product-approvals.ts';

const id = process.argv[2];
const product = productRecords.find((item) => item.id === id);
if (!id || !product) {
  console.error('Usage: npm run products:digest -- <production-product-id>');
  process.exitCode = 1;
} else {
  const approval = productApprovals.find((item) => item.productId === product.id);
  if (!approval) {
    console.error('No evidence receipts are attached to this production product; review packet is incomplete.');
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(productReviewPacket(product, approval), null, 2));
  }
}
