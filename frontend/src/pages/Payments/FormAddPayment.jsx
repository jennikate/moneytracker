import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../constants/ApiConstants';
import FormVertical from '../../components/FormVertical';

function FormAddPayment() {
  const [optionsRecipient, setOptionsRecipient] = useState([]);
  const [optionsExpenseType, setOptionsExpenseType] = useState([]);
  const [optionsPaymentSource, setOptionsPaymentSource] = useState([]);
  const [optionsPaymentType, setOptionsPaymentType] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const mapRecipients = ({ data, relatedId }) => {
    const response = data.map((option) => ({
      id: option.id,
      relatedId: option[relatedId],
      label: option.name
    }));
    return response;
  };

  const mapOptions = ({ data, relatedId }) => {
    const response = data.map((option) => ({
      id: option.id,
      label: option.label,
      relatedId: option[relatedId]
    }));
    return response;
  };

  const getOptionData = async ({ optionType, url }) => {
    setIsLoading(true);
    try {
      const apiResponse = await axios.get(`${API_BASE}${url}`);

      switch (optionType) {
        case 'recipient':
          setOptionsRecipient(mapRecipients({ data: apiResponse.data, relatedId: 'expenseTypeId' }));
          break;
        case 'expenseType':
          setOptionsExpenseType(mapOptions({ data: apiResponse.data }));
          break;
        case 'paymentSource':
          setOptionsPaymentSource(mapOptions({ data: apiResponse.data, relatedId: 'paymentTypeId'  }));
          break;
        case 'paymentType':
          setOptionsPaymentType(mapOptions({ data: apiResponse.data }));
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
    getOptionData({ optionType: 'paymentType', url: '/payment-type' });
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

  // TODO
  /**
   * setup so when payment source so it auto sets payment method
   */

  return (
    <FormVertical
      apiUrl="/payment"
      heading="Payment"
      fields={
        [
          {
            label: 'Date',
            inputType: 'date',
            id: 'date'
          },
          {
            label: 'Recipient',
            inputType: 'select',
            name: 'recipient',
            id: 'recipientId',
            options: optionsRecipient
          },
          {
            label: 'Payment source',
            inputType: 'select',
            id: 'paymentSourceId',
            options: optionsPaymentSource
          },
          {
            label: 'Expense type',
            inputType: 'select',
            id: 'expenseTypeId',
            options: optionsExpenseType
          },
          {
            label: 'Payment method',
            inputType: 'select',
            id: 'paymentTypeId',
            options: optionsPaymentType
          },
          {
            label: 'Amount',
            inputType: 'text',
            id: 'amount'
          }
        ]
      }
    />
  );
}

export default FormAddPayment;
