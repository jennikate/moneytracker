import React from 'react';
import FormVertical from '../../components/FormVertical';

function FormPaymentType() {
  return (
    <FormVertical
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
