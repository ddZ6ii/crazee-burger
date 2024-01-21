import { toast } from 'react-toastify';

const DEFAULT_SETTINGS = {
  autoClose: 2000,
  pauseOnHover: true,
  position: 'bottom-right',
  theme: 'dark',
};

const TOAST_SETTINGS = {
  default: { ...DEFAULT_SETTINGS },
  info: {
    ...DEFAULT_SETTINGS,
    type: 'info',
  },
  success: {
    ...DEFAULT_SETTINGS,
    autoClose: 1000,
    type: 'success',
  },
  error: {
    ...DEFAULT_SETTINGS,
    autoClose: 5000,
    type: 'error',
  },
};

export const notifyInfo = (message) => toast.info(message, TOAST_SETTINGS.info);

export const notifySuccess = (message) =>
  toast.success(message, TOAST_SETTINGS.success);

export const notifyError = (message) =>
  toast.error(message, TOAST_SETTINGS.error);
