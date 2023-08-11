import React from 'react';
import FormHorizontal from '../../components/FormHorizontal';

function FormRecipient() {
  return (
    <FormHorizontal
      apiUrl="/recipient"
      heading="Recipient"
      fields={
        [
          {
            label: 'Enter a recipient',
            hint: 'e.g. Moka, Waitrose, Boots',
            inputType: 'text',
            id: 'recipient'
          },
          {
            label: 'Select a default expense type',
            inputType: 'select',
            id: 'defaultExpenseType',
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

export default FormRecipient;
