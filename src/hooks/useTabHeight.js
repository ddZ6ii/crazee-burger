/**
 * Ensure both admin tabs have the same height and avoid tedious media queries while minimizing the loss of screen real estate by dynamically adjusting the height of the admin panel to fit its content
 * Details:
 * The height of the admin panel is initially set to fit the content of the AddProduct tab (default admin tab)
 * Its height might vary depending whether form errors are displayed
 * The goal of this custom Hook is to ensure the EditProduct tab (simple message by default) has the same minimum height (to avoid undesirable resiinf when switching tabs)
 */

import { useEffect, useState } from 'react';

export const useTabHeight = (tabRef) => {
  const [height, setHeight] = useState(null);

  // Trick to be able to pass a valid variable in the useEffet dependency array
  const currentHeight = tabRef.current?.offsetHeight;

  useEffect(() => {
    setHeight(currentHeight);
  }, [currentHeight]);

  return height;
};
