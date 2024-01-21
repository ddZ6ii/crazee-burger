import { HiCursorClick } from 'react-icons/hi';

import FormInfo from './FormInfo';
import FormTooltip from './FormTooltip';
import ProductForm from './ProductForm';
import { useAdmin } from '../../../../hooks/useAdmin';
import { useProducts } from '../../../../hooks/useProducts';
import { isEmpty } from '../../../../utilities/checks';

export default function EditProduct() {
  const { selectedProductId } = useAdmin();
  const { products, editProduct } = useProducts();

  const hasProductSelected = !isEmpty(selectedProductId);

  if (hasProductSelected) {
    const selectedProduct = products.find((p) => p.id === selectedProductId);
    return (
      <ProductForm
        key={selectedProductId}
        initialProduct={selectedProduct}
        onEdit={(name, value) => editProduct(selectedProductId, name, value)}
        isEditing
      >
        <FormInfo>
          Select a product to start <i>live editing</i> (click outside to cancel
          selection)
        </FormInfo>
      </ProductForm>
    );
  }
  return (
    <FormTooltip
      message="Click a product to start editing"
      icon={<HiCursorClick />}
    />
  );
}
