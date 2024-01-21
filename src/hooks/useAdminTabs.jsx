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
          initialProduct={product}
          products={products}
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
          key={selectedProductId}
          initialProduct={selectedProduct}
          hasProductSelected={hasProductSelected}
          onEdit={(name, value) => editProduct(selectedProductId, name, value)}
        />
      ),
    },
  ];
};
