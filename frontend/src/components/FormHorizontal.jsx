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
    let value;

    // Handle converting to a number if it looks like a number (usually for ID)
    if (Number.isNaN(parseInt(e.target.value, 10))) {
      value = e.target.value.toLowerCase();
    } else {
      value = parseInt(e.target.value, 10);
    }

    const newItem = { [e.target.id]: value };
    setFormData({ ...formData, ...newItem });
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
      setTypeAdded(response?.data?.label || response?.data?.name);
    }
  };

  return (
    <form className="form form-horizontal" onSubmit={handleSubmit}>
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
          {/* <div className="form-field"> */}
          {
            fields.map((field) => (
              <React.Fragment key={field.id}>
                {field.inputType === 'text' && (
                  <div className="form-field">
                    <label htmlFor={field.id}>
                      {field.label} <span className="hint">{field?.hint || ''}</span>
                    </label>
                    <input type={field.inputType} id={field.id} onChange={handleChange} />
                  </div>
                )}
                {field.inputType === 'select' && (
                  <div className="form-field">
                    <label htmlFor={field.id}>
                      {field.label} <span className="hint">{field?.hint || ''}</span>
                    </label>
                    <select
                      type="text"
                      id={field.id}
                      className="select"
                      defaultValue="selectOption"
                      onChange={handleChange}
                    >
                      <option disabled value="selectOption">Select an option</option>
                      {field.options.map((option) => (
                        <option key={option.id} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </React.Fragment>
            ))
          }
          {/* </div> */}
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
