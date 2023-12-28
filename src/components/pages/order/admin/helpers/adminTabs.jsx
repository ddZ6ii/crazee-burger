import { HiPlus } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';
import AddProduct from '../AddProduct';
import EditProduct from '../EditProduct';

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
