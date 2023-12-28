import styled from 'styled-components';
import { HiCursorClick } from 'react-icons/hi';

import EditProductForm from './EditProductForm';

import { useAdmin } from '../../../../hooks/useAdmin';
import { useProducts } from '../../../../hooks/useProducts';
import { useProductForm } from '../../../../hooks/useProductForm';
import { theme } from '../../../../themes/index';
import { isEmpty } from '../../../../utilities/checks';

function ToolTip({ message, icon }) {
  return (
    <ContainerStyled>
      <p>{message}</p>
      {icon && icon}
    </ContainerStyled>
  );
}

export default function EditProduct() {
  const { selectedProductId } = useAdmin();
  const { products } = useProducts();
  const { form } = useProductForm();

  const hasProductSelected = !isEmpty(selectedProductId);
  const selectedProductInfo = selectedProductId
    ? products.find((p) => p.id === selectedProductId)
    : null;

  if (hasProductSelected) {
    const selectedProduct = Object.entries(form.data).reduce(
      (res, [key]) => ({ ...res, [key]: selectedProductInfo[key] }),
      {}
    );

    return (
      <EditProductForm
        key={selectedProductId}
        selectedProductId={selectedProductId}
        initialProduct={selectedProduct}
      />
    );
  }

  return (
    <ToolTip
      message="Click a product to start editing"
      icon={<HiCursorClick />}
    />
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { fonts, spacing } = theme;

const ContainerStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing['2xs']};
  font-family: ${fonts.family.headings};
  font-size: ${fonts.size.xl};
`;
