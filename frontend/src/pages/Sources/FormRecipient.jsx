import React from 'react';

function FormRecipient() {
  return (
    <form className="form form_horizontal">
      <h2>Recipient</h2>

      <div className="form-field">
        <label htmlFor="recipient">
          Enter a recipient
          {' '}
          <span className="hint">e.g. Moka, Waitrose, Boots</span>
        </label>
        <input type="text" id="recipient" />
      </div>

      <div className="form-field">
        <label htmlFor="defaultExpenseType">
          Select a default expense type
        </label>
        <select type="text" id="defaultExpenseType" className="select">
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

export default FormRecipient;
