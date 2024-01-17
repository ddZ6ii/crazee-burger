import { HiPlus } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';
import AddProduct from '../tabs/content/AddProduct';
import EditProduct from '../tabs/content/EditProduct';

export const adminTabs = [
  {
    id: 0,
    navTitle: 'Add a product',
    navIcon: <HiPlus />,
    content: <AddProduct />,
  },
  {
    id: 1,
    navTitle: 'Edit a product',
    navIcon: <MdModeEditOutline />,
    content: <EditProduct />,
  },
];
