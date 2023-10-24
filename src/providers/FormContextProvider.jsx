import { FormContext } from '../contexts/FormContext';
import { useFormStore } from '../hooks/useForm';

export default function FormContextProvider({ children }) {
  return (
    <FormContext.Provider value={useFormStore()}>
      {children}
    </FormContext.Provider>
  );
}
