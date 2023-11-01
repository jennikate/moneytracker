import React, { useState } from 'react';
import FormExpenseType from './FormExpenseType';
import FormRecipient from './FormRecipient';
import FormPaymentType from './FormPaymentType';
import FormPaymentSource from './FormPaymentSource';

import '../../assets/css/forms.scss';

function Sources() {
  const [isUpdated, setIsUpdated] = useState(false);
  /**
   * Forms with related field `isUpdated` value
   * so they know if they should re-render their select dropdown values
   */

  return (
    <>
      <h1>Add sources</h1>
      <FormExpenseType setIsUpdated={setIsUpdated} />
      <FormRecipient isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      <FormPaymentType setIsUpdated={setIsUpdated} />
      <FormPaymentSource isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
    </>
  );
}

export default Sources;
