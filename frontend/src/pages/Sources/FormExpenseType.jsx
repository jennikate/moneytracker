import React, { useState } from 'react';
import { API_BASE } from '../../constants/ApiConstants';
import PostSource from '../../utils/PostSource';
import ConfirmationPanel from '../../components/ConfirmationPanel';
import SubmitButton from '../../components/SubmitButton';

function FormExpenseType() {
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [typeAdded, setTypeAdded] = useState();

  const handleChange = (e) => {
    setFormData({ [e.target.id]: e.target.value.toLowerCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) {
      return;
    }

    const response = await PostSource({
      dataToSubmit: { label: formData?.expenseType },
      setIsLoading,
      url: `${API_BASE}/expense-type`
    });

    // handle if resonse returns errors
    if (response.error) {
      console.log('error');
    }

    // handle if response returns success
    if (!response.error) {
      setShowConfirmation(true);
      setFormData(null);
      setTypeAdded(response?.data?.label);
    }
  };

  return (
    <form className="form form_horizontal" onSubmit={handleSubmit}>
      <h2>Expense type</h2>
      {showConfirmation && (
        <ConfirmationPanel
          setShowConfirmation={setShowConfirmation}
          itemAdded={typeAdded}
          type="expense type"
        />
      )}
      {!showConfirmation && (
        <>
          <div className="form-field">
            <label htmlFor="expenseType">
              Enter a type
              {' '}
              <span className="hint">e.g. coffee, groceries, take-away</span>
            </label>
            <input type="text" id="expenseType" onChange={handleChange} />
          </div>
          <SubmitButton
            isLoading={isLoading}
            label="Save expense type"
          />
        </>
      )}
    </form>
  );
}

export default FormExpenseType;
