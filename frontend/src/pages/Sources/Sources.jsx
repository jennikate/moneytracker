import React, { useState } from 'react';
import FormExpenseType from './FormExpenseType';
import FormRecipient from './FormRecipient';
import FormPaymentType from './FormPaymentType';
import FormPaymentSource from './FormPaymentSource';

import '../../assets/css/forms.scss';

function Sources() {
  const EXPENSE_TYPE = 'expenseType';
  const PAYMENT_SOURCE = 'paymentSource';
  const PAYMENT_TYPE = 'paymentType';
  const RECIPIENT = 'recipient';

  const [toRender, setToRender] = useState();

  function handleRenderSelection(item) {
    switch (item) {
      case EXPENSE_TYPE:
        setToRender(<FormExpenseType />);
        break;
      case PAYMENT_SOURCE:
        setToRender(<FormPaymentSource />);
        break;
      case PAYMENT_TYPE:
        setToRender(<FormPaymentType />);
        break;
      case RECIPIENT:
        setToRender(<FormRecipient />);
        break;
      default:
        setToRender(null);
    }
  }

  return (
    <>
      <h1>Sources</h1>
      <div className="action-container">
        <button
          className="link-navigation link-navigation--light-background"
          type="button"
          onClick={() => handleRenderSelection(RECIPIENT)}
        >
          Add new recipient
        </button>
        <button
          className="link-navigation link-navigation--light-background"
          type="button"
          onClick={() => handleRenderSelection(PAYMENT_SOURCE)}
        >
          Add new payment source
        </button>
        <button
          className="link-navigation link-navigation--light-background"
          type="button"
          onClick={() => handleRenderSelection(EXPENSE_TYPE)}
        >
          Add new expense type
        </button>
        <button
          className="link-navigation link-navigation--light-background"
          type="button"
          onClick={() => handleRenderSelection(PAYMENT_TYPE)}
        >
          Add new payment type
        </button>
      </div>
      <div className="content-third">
        {toRender}
      </div>
    </>

  );
}

export default Sources;
