import React from 'react';
import FormHorizontal from '../../components/FormHorizontal';

function FormPaymentType() {
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
    />
  );
}

export default FormPaymentType;
