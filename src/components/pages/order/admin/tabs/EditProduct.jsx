import { useReducer } from 'react';
import { HiCursorClick } from 'react-icons/hi';

import FormInfo from './form/FormInfo';
import Message from '../../../../common/Message';
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
  const [form, dispatch] = useReducer(productFormReducer, {}, () =>
    initForm(initialProduct)
  );

  if (hasProductSelected) {
    return (
      <ProductForm form={form} dispatch={dispatch} onEdit={onEdit}>
        <FormInfo>
          Select a product to start <i>live editing</i> (click outside to cancel
          selection)
        </FormInfo>
      </ProductForm>
    );
  }
  return (
    <Message
      message="Click a product to start editing"
      icon={<HiCursorClick />}
    />
  );
}
