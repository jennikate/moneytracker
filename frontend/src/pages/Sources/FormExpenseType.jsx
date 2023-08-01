import React from 'react';

function FormExpenseType() {
  return (
    <form className="form form_horizontal">
      <h2>Expense type</h2>
      <div className="form-field">
        <label htmlFor="expenseType">
          Enter a type
          {' '}
          <span className="hint">e.g. coffee, groceries, take-away</span>
        </label>
        <input type="text" id="expenseType" />
      </div>
      <button
        type="submit"
        className="button button-submit"
      >
        Save expense type
      </button>
    </form>
  );
}

export default FormExpenseType;
