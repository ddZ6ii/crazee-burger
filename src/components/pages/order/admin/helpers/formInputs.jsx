import { MdOutlineEuroSymbol } from 'react-icons/md';
import { BsFillCameraFill } from 'react-icons/bs';
import { FaHamburger } from 'react-icons/fa';
import {
  validatePrice,
  validateUrl,
} from '../../../../../utilities/validators';

export const formInputs = [
  {
    data: {
      id: 0,
      type: 'text',
      label: 'title',
      placeholder: 'Product name (e.g. "Super Burger")',
      isRequired: false,
      icon: <FaHamburger className="input__icon" />,
      klass: 'input__wrapper',
    },
    validators: [],
  },
  {
    data: {
      id: 1,
      type: 'text',
      label: 'imageSource',
      placeholder: 'URL for product thumbnail (can be empty)',
      isRequired: false,
      icon: <BsFillCameraFill className="input__icon" />,
      klass: 'input__wrapper',
    },
    validators: [validateUrl],
  },
  {
    data: {
      id: 2,
      type: 'number',
      min: 0,
      max: 99.99,
      step: 0.001,
      label: 'price',
      placeholder: 'Price',
      isRequired: false,
      icon: <MdOutlineEuroSymbol className="input__icon" />,
      klass: 'input__wrapper',
    },
    validators: [validatePrice],
  },
];
