import { useReducer, useRef } from 'react';

import ProductForm from './form/ProductForm';
import { PRODUCT as PRODUCT_DEFAULT } from '../../../../../enums/product';
import {
  formStatus as STATUS,
  formNotifications as NOTIFICATIONS,
} from './form/constants/formSettings';
import * as Actions from '../../../../../reducers/actions/productFormActionTypes';
import {
  initForm,
  productFormReducer,
} from '../../../../../reducers/productFormReducer';
import { hasErrors } from '../../../../../utilities/checks';
import { capitalizeString } from '../../../../../utilities/format';
import {
  notifyError,
  notifySuccess,
} from '../../../../../utilities/notifications';
import FormActions from './form/FormActions';

export default function AddProduct({
  initialProduct,
  addProduct,
  resetProduct,
  onEdit,
}) {
  const inputRef = useRef(null);

  const [form, dispatch] = useReducer(productFormReducer, {}, () =>
    initForm(initialProduct)
  );

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

  const handleSubmit = async (e) => {
    let hasSucceeded = false;
    const productInfo = {
      ...PRODUCT_DEFAULT,
      title: capitalizeString(form.data.title),
      imageSource: form.data.imageSource || PRODUCT_DEFAULT.imageSource,
      price: Number(form.data.price),
    };
    try {
      e.preventDefault();
      // Update form status to disable submission
      dispatch({ type: Actions.UPDATE_STATUS, status: STATUS.submitting });
      // Add new product to list
      hasSucceeded = await submitProduct(productInfo);
      // Reset form input fields
      dispatch({ type: Actions.RESET_FORM });
    } catch (err) {
      console.error(err);
    } finally {
      // Update form status to re-enable submission
      dispatch({ type: Actions.UPDATE_STATUS, status: STATUS.submitted });
      // Notify user
      const productTitle = productInfo.title || 'Product';
      hasSucceeded
        ? notifySuccess(`${productTitle} added!`)
        : notifyError(NOTIFICATIONS.submitError);
    }
  };

  const handleReset = () => {
    dispatch({ type: Actions.RESET_FORM });
    resetProduct();
    inputRef.current.focus();
  };

  const isSubmitting = form.status === STATUS.submitting;
  const isSubmitDisabled = isSubmitting || hasErrors(form.errors);

  return (
    <ProductForm
      ref={inputRef}
      form={form}
      dispatch={dispatch}
      isSubmitting={isSubmitting}
      onEdit={onEdit}
      onSubmit={handleSubmit}
    >
      <FormActions
        isSubmitting={isSubmitting}
        isSubmitDisabled={isSubmitDisabled}
        onReset={handleReset}
      />
    </ProductForm>
  );
}
