import React from 'react';

import '../../assets/css/forms.scss';
import FormExpenseType from './FormExpenseType';
import FormRecipient from './FormRecipient';

function Sources() {
  console.log('sources');
  return (
    <>
      <h1>Add config</h1>
      <FormExpenseType />
      <FormRecipient />
    </>
  );
}

export default Sources;
