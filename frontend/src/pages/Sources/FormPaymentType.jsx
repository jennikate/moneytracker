import React from 'react';
import FormHorizontal from '../../components/FormHorizontal';

function FormPaymentType({ setIsUpdated }) {
  return (
    <FormHorizontal
      apiUrl="/payment-type"
      heading="Payment type"
      fields={
        [
          {
            label: 'Enter a type',
            hint: 'e.g. cash, credit card',
            inputType: 'text',
            id: 'label'
          }
        ]
      }
      setIsUpdated={setIsUpdated}
    />
  );
}

export default FormPaymentType;
