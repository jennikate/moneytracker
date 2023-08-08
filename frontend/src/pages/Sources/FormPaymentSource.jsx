import React from 'react';

function FormPaymentSource() {
  return (
    <form className="form form_horizontal">
      <h2>Payment Source</h2>

      <div className="form-field">
        <label htmlFor="paymentSource">
          Enter a source
          {' '}
          <span className="hint">e.g. Metro, HSBC</span>
        </label>
        <input type="text" id="recipient" />
      </div>

      <div className="form-field">
        <label htmlFor="defaultPaymentType">
          Select a default payment type
        </label>
        <select type="text" id="defaultPaymentType" className="select">
          <option disabled>Select an option</option>
          <option value="test">Test option</option>
        </select>
      </div>

      <button
        type="submit"
        className="button button-submit"
      >
        Save recipient
      </button>
    </form>
  );
}

export default FormPaymentSource;
