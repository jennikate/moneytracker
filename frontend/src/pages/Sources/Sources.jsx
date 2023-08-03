import React from 'react';
import FormExpenseType from './FormExpenseType';
import FormRecipient from './FormRecipient';
import FormPaymentType from './FormPaymentType';
import FormPaymentSource from './FormPaymentSource';

import '../../assets/css/forms.scss';

function Sources() {
  console.log('sources');
  return (
    <>
      <h1>Add config</h1>
      <FormExpenseType />
      <FormRecipient />
      <FormPaymentType />
      <FormPaymentSource />
    </>
  );
}

export default Sources;
