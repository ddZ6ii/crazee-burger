import { HiPlus } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';

export const adminTabs = [
  {
    id: 0,
    navTitle: 'Add a product',
    navIcon: <HiPlus />,
    content: 'Add a product...',
  },
  {
    id: 1,
    navTitle: 'Update a product',
    navIcon: <MdModeEditOutline />,
    content: 'Update a product...',
  },
];
