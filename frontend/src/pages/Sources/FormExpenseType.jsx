import React from 'react';
import FormHorizontal from '../../components/FormHorizontal';

function FormExpenseType({ setIsUpdated }) {
  return (
    <FormHorizontal
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
      setIsUpdated={setIsUpdated}
    />
  );
}

export default FormExpenseType;
