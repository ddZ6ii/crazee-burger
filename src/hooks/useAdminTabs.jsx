import { HiPlus } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';

import AddProduct from '../components/pages/order/admin/tabs/AddProduct.jsx';
import EditProduct from '../components/pages/order/admin/tabs/EditProduct.jsx';
import { useAddProduct } from './useAddProduct.js';
import { useAdmin } from './useAdmin.js';
import { useProducts } from './useProducts.js';
import { isEmpty } from '../utilities/checks.js';

export const useAdminTabs = () => {
  const { selectedProductId } = useAdmin();
  const { products, addProduct, editProduct } = useProducts();
  const { product, updateProduct, resetProduct } = useAddProduct();

  const hasProductSelected = !isEmpty(selectedProductId);
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return [
    {
      id: 0,
      navTitle: 'Add a product',
      navIcon: <HiPlus />,
      content: (
        <AddProduct
          // Re-mount ProductForm on product addition and deletion (to autofocus the input, without the need of a useEffect)
          key={products.length}
          initialProduct={product}
          addProduct={addProduct}
          resetProduct={resetProduct}
          onEdit={updateProduct}
        />
      ),
    },
    {
      id: 1,
      navTitle: 'Edit a product',
      navIcon: <MdModeEditOutline />,
      content: (
        <EditProduct
          // Re-mount ProductForm on product selection change or product deletion (to reset and prefill form fields with newly selected product data, and to autofocus the input, without the need of a useEffect)
          key={selectedProductId + products.length}
          initialProduct={selectedProduct}
          hasProductSelected={hasProductSelected}
          onEdit={(name, value) => editProduct(selectedProductId, name, value)}
        />
      ),
    },
  ];
};
