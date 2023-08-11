import React from 'react';
import FormHorizontal from '../../components/FormHorizontal';

function FormPaymentSource() {
  return (
    <FormHorizontal
      apiUrl="/payment-source"
      heading="Payment source"
      fields={
        [
          {
            label: 'Enter a source',
            hint: 'e.g. Metro, HSBC',
            inputType: 'text',
            id: 'source'
          },
          {
            label: 'Select a default payment type',
            inputType: 'select',
            id: 'defaultPaymentType',
            options: [
              {
                id: 'optionId',
                value: 'test',
                label: 'test'
              }
            ]
          }
        ]
      }
    />
  );
}

export default FormPaymentSource;
