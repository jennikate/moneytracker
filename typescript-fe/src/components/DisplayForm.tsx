import * as React from 'react';
import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { API_BASE } from '../constants/ApiConstants';
import PostSource from '../utils/PostSource';
import ConfirmationPanel from './ConfirmationPanel';
import SubmitButton from './SubmitButton';

function DisplayForm({
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
    let relatedItem;
    const newFieldData = [...fieldData];

    // Handle dates & strings
    if (e.target.type === 'date') {
      value = dayjs(e.target.value).format();
    } else if (Number.isNaN(parseInt(e.target.value, 10))) {
      // Handle converting to a number if it looks like a number (usually for ID)
      value = e.target.value.toLowerCase();
    } else {
      value = parseInt(e.target.value, 10);
    }

    /**
     * If the target has a related field we want to autopopulate that field with the default
     * However user can then manually override that selection
     * So the else here covers that scenario, and ensures the fieldData is updated with
     * the selected value for both primary fields and manually changed related fields
     */
    const fieldToFind = e.target[e.target.selectedIndex]?.getAttribute('data-relatedfield') || e.target.id;
    const valueToSet = e.target[e.target.selectedIndex]?.getAttribute('data-relatedvalue') || value;

    const objIndex = fieldData.findIndex((obj) => obj.id === fieldToFind);
    newFieldData[objIndex].value = parseInt(valueToSet, 10);
    setFieldData(newFieldData);

    /**
     * If there is a related field we need to get that value so we can set it to form data
     * This also ensures if user manually changes a related field value
     * THEN changes the parent value, we reset the related field based on parent
     */
    if (e.target[e.target.selectedIndex]?.getAttribute('data-relatedfield')) {
      relatedItem = { [fieldToFind]: parseInt(valueToSet, 10) };
    }

    const newItem = { [e.target.id]: value };
    setFormData({ ...formData, ...newItem, ...relatedItem });
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

export default DisplayForm;
