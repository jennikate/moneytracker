import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../constants/ApiConstants';
import FormVertical from '../../components/FormVertical';

function FormAddPayment() {
  const [optionsRecipient, setOptionsRecipient] = useState([]);
  const [optionsExpenseType, setOptionsExpenseType] = useState([]);
  const [optionsPaymentSource, setOptionsPaymentSource] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const mapRecipients = ({ data }) => {
    const response = data.map((option) => ({
      id: option.id,
      expenseTypeId: option.expenseTypeId,
      label: option.name
    }));
    return response;
  };

  const mapOptions = ({ data }) => {
    const response = data.map((option) => ({
      id: option.id,
      label: option.label
    }));
    return response;
  };

  const getOptionData = async ({ optionType, url }) => {
    setIsLoading(true);
    try {
      const apiResponse = await axios.get(`${API_BASE}${url}`);

      switch (optionType) {
        case 'recipient':
          setOptionsRecipient(mapRecipients({ data: apiResponse.data }));
          break;
        case 'expenseType':
          setOptionsExpenseType(mapOptions({ data: apiResponse.data }));
          break;
        case 'paymentSource':
          setOptionsPaymentSource(mapOptions({ data: apiResponse.data }));
          break;
        default:
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOptionData({ optionType: 'recipient', url: '/recipient' });
    getOptionData({ optionType: 'expenseType', url: '/expense-type' });
    getOptionData({ optionType: 'paymentSource', url: '/payment-source' });
  }, []);

  if (isLoading
    || optionsRecipient.length < 1
    || optionsExpenseType.length < 1
    || optionsPaymentSource.length < 1
  ) {
    return (
      <h1>Loading</h1>
    );
  }

  return (
    <FormVertical
      apiUrl="/expense-type"
      heading="Expense type"
      fields={
        [
          {
            label: 'Select date',
            inputType: 'text',
            id: 'label'
          }
        ]
      }
    />
  );
}

export default FormAddPayment;
