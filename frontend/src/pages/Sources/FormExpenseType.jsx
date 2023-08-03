import React, { useState } from 'react';
import axios from 'axios';

function FormExpenseType() {
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({ [e.target.id]: e.target.value.toLowerCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/expense-type', {
        label: formData.expenseType
      });

      console.log(response);
      setShowConfirmation(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseConfirmationPanelClick = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <>
        <h2>{formData.expenseType} added</h2>
        <button type="button" onClick={handleCloseConfirmationPanelClick}>
          Add another expense type
        </button>
      </>
    );
  }

  return (
    <form className="form form_horizontal" onSubmit={handleSubmit}>
      <h2>Expense type</h2>
      <div className="form-field">
        <label htmlFor="expenseType">
          Enter a type
          {' '}
          <span className="hint">e.g. coffee, groceries, take-away</span>
        </label>
        <input type="text" id="expenseType" onChange={handleChange} />
      </div>
      <button
        type="submit"
        className={isLoading ? 'button button-submit disabled' : 'button button-submit'}
        disabled={isLoading}
      >
        Save expense type
      </button>
    </form>
  );
}

export default FormExpenseType;
