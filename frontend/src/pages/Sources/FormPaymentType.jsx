import React from 'react';

function FormPaymentType() {
  return (
    <form className="form form_horizontal">
      <h2>Payment type</h2>
      <div className="form-field">
        <label htmlFor="paymentType">
          Enter a type
          {' '}
          <span className="hint">e.g. cash, credit card</span>
        </label>
        <input type="text" id="paymentType" />
      </div>
      <button
        type="submit"
        className="button button-submit"
      >
        Save payment type
      </button>
    </form>
  );
}

export default FormPaymentType;
