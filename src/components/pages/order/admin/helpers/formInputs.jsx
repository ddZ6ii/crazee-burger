import { MdOutlineEuroSymbol } from 'react-icons/md';
import { BsFillCameraFill } from 'react-icons/bs';
import { FaHamburger } from 'react-icons/fa';

export const formInputs = [
  {
    id: 0,
    type: 'text',
    label: 'title',
    placeholder: 'Product name (e.g. "Super Burger")',
    isRequired: false,
    icon: <FaHamburger />,
    klass: 'form__input',
  },
  {
    id: 1,
    type: 'text',
    label: 'imageSource',
    placeholder: 'URL for product thumbnail (can be empty)',
    isRequired: false,
    icon: <BsFillCameraFill />,
    klass: 'form__input',
  },
  {
    id: 2,
    type: 'number',
    min: '0',
    step: '.01',
    label: 'price',
    placeholder: 'Price',
    isRequired: false,
    icon: <MdOutlineEuroSymbol />,
    klass: 'form__input',
  },
];
