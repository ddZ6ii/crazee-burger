import ProductForm from './form/ProductForm';
import { useAdmin } from '../../../../../../hooks/useAdmin';
import { useProducts } from '../../../../../../hooks/useProducts';
import { useAddProduct } from '../../../../../../hooks/useAddProduct';

export default function AddProduct() {
  const { activeTabId } = useAdmin();
  const { addProduct } = useProducts();
  const { product, updateProduct, resetProduct } = useAddProduct();

  const submitProduct = (product, delay = 0, shouldSucceed = true) => {
    // Pretend its hitting the network (delay in ms)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldSucceed) {
          addProduct(product);
          resetProduct();
          resolve(true);
        } else {
          // Pretend adding a product did not work
          reject('Product could not be added');
        }
      }, delay);
    });
  };

  return (
    <ProductForm
      key={activeTabId}
      initialProduct={product}
      onEdit={updateProduct}
      onSubmit={submitProduct}
      onReset={resetProduct}
    />
  );
}
