import { MdOutlineEuroSymbol } from 'react-icons/md';
import { BsFillCameraFill } from 'react-icons/bs';
import { FaHamburger } from 'react-icons/fa';
import {
  validatePrice,
  validateUrl,
} from '../../../../../utilities/validators';

export const formStatus = {
  typing: 'typing',
  submitting: 'submitting',
  submitted: 'submitted',
};

export const formInputs = {
  title: {
    inputProps: {
      label: 'title',
      type: 'text',
      value: '',
      placeholder: 'Product name (e.g. "Super Burger")',
      isRequired: false,
      className: 'input__wrapper',
    },
    Icon: <FaHamburger className="input__icon" />,
    validators: [],
  },
  imageSource: {
    inputProps: {
      label: 'imageSource',
      type: 'text',
      value: '',
      placeholder: 'URL for product thumbnail (can be empty)',
      isRequired: false,
      className: 'input__wrapper',
    },
    Icon: <BsFillCameraFill className="input__icon" />,
    validators: [validateUrl],
  },
  price: {
    inputProps: {
      label: 'price',
      type: 'number',
      value: '',
      placeholder: 'Price',
      min: 0,
      max: 99.99,
      step: 0.001,
      isRequired: false,
      className: 'input__wrapper',
    },
    Icon: <MdOutlineEuroSymbol className="input__icon" />,
    validators: [validatePrice],
  },
};

export const formNotifications = {
  submitSuccess: 'Product added!',
  submitError:
    'Ooops an error has occured... Please try again later or contact your administrator ',
};
