/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { API_BASE } from '../constants/ApiConstants';
import PostSource from '../utils/PostSource';
import ConfirmationPanel from './ConfirmationPanel';
import SubmitButton from './SubmitButton';

function FormVertical({
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

    // console.log(e.target.type, e.target.type === 'select' ? 'yes' : 'no')
    // e.target.type returns select-one not sure why yet
    // console.log(e.target[e.target.selectedIndex].getAttribute('data-relatedvalue'))

    // Handle dates
    if (e.target.type === 'date') {
      value = dayjs(e.target.value).format();
    } else if (Number.isNaN(parseInt(e.target.value, 10))) {
      // Handle converting to a number if it looks like a number (usually for ID)
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
    <form className="form form-vertical" onSubmit={handleSubmit}>
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
                {field.inputType === 'date' && (
                  <div className="form-field">
                    <label htmlFor={field.id}>
                      {field.label} <span className="hint">{field?.hint || ''}</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="payment-date"
                      value={dayjs(formData?.date).format('YYYY-MM-DD')}
                      onChange={handleChange}
                    />
                  </div>
                )}
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
                      type="select"
                      id={field.id}
                      name={field.name}
                      className="select"
                      defaultValue="selectOption"
                      onChange={handleChange}
                    >
                      <option disabled value="selectOption">Select an option</option>
                      {field.options.map((option) => (
                        <option
                          key={option.id}
                          value={option.id}
                          data-relatedvalue={option.relatedId}
                        >
                          {option.label}
                        </option>
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

export default FormVertical;
