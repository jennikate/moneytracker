/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { API_BASE } from '../constants/ApiConstants';
import PostSource from '../utils/PostSource';
import ConfirmationPanel from './ConfirmationPanel';
import SubmitButton from './SubmitButton';

function FormHorizontal({
  apiUrl,
  fields,
  heading
}) {
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
      dataToSubmit: formData,
      setIsLoading,
      url: `${API_BASE}${apiUrl}`
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
      <h2>{heading}</h2>
      {showConfirmation && (
        <ConfirmationPanel
          setShowConfirmation={setShowConfirmation}
          itemAdded={typeAdded}
          type={heading.toLowerCase()}
        />
      )}
      {!showConfirmation && (
        <>
          <div className="form-field">
            {
              fields.map((field) => (
                <div key={field.id}>
                  {field.inputType === 'text' && (
                  <>
                    <label htmlFor={field.id}>
                      {`${field.label} ${field.hint}`}
                    </label>
                    <input type={field.inputType} id={field.id} onChange={handleChange} />
                  </>
                  )}
                  {field.inputType === 'select' && (
                  <>
                    <label htmlFor={field.id}>
                      {`${field.label} ${field.hint}`}
                    </label>
                    <select type="text" id={field.id} className="select" defaultValue="selectOption">
                      <option disabled value="selectOption">Select an option</option>
                      {field.options.map((option) => (
                        <option key={option.id} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </>
                  )}
                </div>
              ))
            }
          </div>
          <SubmitButton
            isLoading={isLoading}
            label={`Save ${heading.toLowerCase()}`}
          />
        </>
      )}
    </form>
  );
}

export default FormHorizontal;
