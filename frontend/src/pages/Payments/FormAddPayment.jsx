import React from 'react';
import FormVertical from '../../components/FormVertical';

function FormAddPayment() {
  return (
    <FormVertical
      apiUrl="/expense-type"
      heading="Expense type"
      fields={
        [
          {
            label: 'Enter a type',
            hint: 'e.g. coffee, groceries, take-away',
            inputType: 'text',
            id: 'label'
          },

          {
            label: 'Enter a type',
            hint: 'e.g. coffee, groceries, take-away',
            inputType: 'text',
            id: 'label'
          }
        ]
      }
    />
  );
}

export default FormAddPayment;
