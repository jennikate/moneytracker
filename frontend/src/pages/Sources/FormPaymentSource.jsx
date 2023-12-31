import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../constants/ApiConstants';
import FormVertical from '../../components/FormVertical';

function FormPaymentSource() {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const getOptionData = async () => {
    setIsLoading(true);
    try {
      const apiResponse = await axios.get(`${API_BASE}/payment-type`);
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
      apiUrl="/payment-source"
      heading="Payment source"
      fields={
        [
          {
            label: 'Enter a source',
            hint: 'e.g. Metro, HSBC',
            inputType: 'text',
            id: 'label'
          },
          {
            label: 'Enter the current balance',
            inputType: 'text',
            id: 'balance'
          },
          {
            label: 'Select a default payment type',
            inputType: 'select',
            id: 'paymentTypeId',
            options
          }
        ]
      }
    />
  );
}

export default FormPaymentSource;
