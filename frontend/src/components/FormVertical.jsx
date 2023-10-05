/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
  const [fieldData, setFieldData] = useState();
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [typeAdded, setTypeAdded] = useState();

  const handleChange = (e) => {
    let value;

    // TODO: automatically select the related fields value based on the selected fields value
    // The obvious way is to keep the related fields value in state and update that on select
    // but that requires each field to be in state, which currently it is not
    // TRY: putting fields into state as an object on render rather than mapping straight from props
    // then onChange can update the fields object with the selected value
    // if that doesn't work, may want to consider refactoring so this isn't a reusable form 
    // creator, but is just a set form

    // TODO
    // useEffect to take fields from props and put into state
    // map from state into html
    // update handleChange to check for related fields in the target
    // if related field then update state with the related field value for that related field
    // see what happens...

    // Handle dates
    if (e.target.type === 'date') {
      value = dayjs(e.target.value).format();
    } else if (Number.isNaN(parseInt(e.target.value, 10))) {
      // Handle converting to a number if it looks like a number (usually for ID)
      value = e.target.value.toLowerCase();
    } else {
      value = parseInt(e.target.value, 10);
    }

    // Handle related field
    if (e.target[e.target.selectedIndex].getAttribute('data-relatedfield')) {
      const newFieldData = [...fieldData];
      const relatedField = e.target[e.target.selectedIndex].getAttribute('data-relatedfield');
      const relatedValue = e.target[e.target.selectedIndex].getAttribute('data-relatedvalue');

      // Find index of of the related field in the array
      const objIndex = fieldData.findIndex((obj) => obj.id === relatedField);
      // Set the value of the select to the new option id
      const relatedValueNum = parseInt(relatedValue, 10);
      newFieldData[objIndex].value = relatedValueNum;
      setFieldData(newFieldData);
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

  useEffect(() => {
    if (fields) {
      setFieldData(fields);
    }
  }, [fields]);

  if (!fieldData) { <h2> Loading </h2>; }

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
            fieldData && fieldData.map((field) => (
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
                      value={field.value}
                    >
                      <option disabled value="selectOption">Select an option</option>
                      {field.options.map((option) => (
                        <option
                          key={option.id}
                          value={option.id}
                          data-relatedvalue={option.relatedId}
                          data-relatedfield={option.relatedField}
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
