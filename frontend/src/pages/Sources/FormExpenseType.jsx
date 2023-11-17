import React from 'react';
import FormVertical from '../../components/FormVertical';

function FormExpenseType() {
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
          }
        ]
      }
    />
  );
}

export default FormExpenseType;
