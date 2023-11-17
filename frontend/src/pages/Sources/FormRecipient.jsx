import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../constants/ApiConstants';
import FormVertical from '../../components/FormVertical';

function FormRecipient() {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const getOptionData = async () => {
    setIsLoading(true);
    try {
      const apiResponse = await axios.get(`${API_BASE}/expense-type`);
      const mappedOptions = apiResponse.data.map((option) => ({
        id: option.id,
        value: option.id,
        label: option.label
      }));
      setOptions(mappedOptions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOptionData();
  }, []);

  if (isLoading || options.length < 1) {
    return (
      <h1>Loading</h1>
    );
  }

  return (
    <FormVertical
      apiUrl="/recipient"
      heading="Recipient"
      fields={
        [
          {
            label: 'Enter a recipient',
            hint: 'e.g. Moka, Waitrose, Boots',
            inputType: 'text',
            id: 'name'
          },
          {
            label: 'Select a default expense type',
            inputType: 'select',
            id: 'expenseTypeId',
            options
          }
        ]
      }
    />
  );
}

export default FormRecipient;
