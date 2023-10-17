import { toast } from 'react-toastify';

export const TOAST_DEFAULT_SETTINGS = {
  autoClose: 2000,
  pauseOnHover: true,
  position: 'bottom-right',
  theme: 'dark',
};

export const TOAST_INFO_SETTINGS = {
  ...TOAST_DEFAULT_SETTINGS,
  type: 'info',
};

export const TOAST_SUCCESS_SETTINGS = {
  ...TOAST_DEFAULT_SETTINGS,
  autoClose: 1000,
  type: 'success',
};

export const displayToastNotification = (message, toastSettings) => {
  toast.info(message, toastSettings);
};
