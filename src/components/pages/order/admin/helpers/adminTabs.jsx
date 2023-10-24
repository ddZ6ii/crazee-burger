import { HiPlus } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';
import ProductForm from '../ProductForm';

export const adminTabs = [
  {
    id: 0,
    navTitle: 'Add a product',
    navIcon: <HiPlus />,
    content: <ProductForm />,
  },
  {
    id: 1,
    navTitle: 'Update a product',
    navIcon: <MdModeEditOutline />,
    content: 'Update a product...',
  },
];
