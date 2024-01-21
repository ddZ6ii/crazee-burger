import { useEffect, useReducer, useRef } from 'react';
import { HiCursorClick } from 'react-icons/hi';

import FormInfo from './form/FormInfo';
import FormTooltip from './form/FormTooltip';
import ProductForm from './form/ProductForm';
import {
  initForm,
  productFormReducer,
} from '../../../../../reducers/productFormReducer';

export default function EditProduct({
  initialProduct,
  hasProductSelected,
  onEdit,
}) {
  const inputRef = useRef(null);

  const [form, dispatch] = useReducer(productFormReducer, {}, () =>
    initForm(initialProduct)
  );

  // Focus product name form's input for currently selected product (if any)
  useEffect(() => {
    if (hasProductSelected) inputRef.current.focus();
  }, [hasProductSelected]);

  if (hasProductSelected) {
    return (
      <ProductForm
        ref={inputRef}
        form={form}
        dispatch={dispatch}
        onEdit={onEdit}
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
