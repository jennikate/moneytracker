import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_BASE } from '../constants/ApiConstants';
import pounds from '../utils/CurrencyFormat';
import '../assets/css/components.scss';
import '../assets/css/payments.scss';
import FormVertical from '../components/FormVertical';

function Payments() {
  // TODO: collect this month name for caption
  // TODO: add restriction onto this endpoint to only get transactions for this month
  const [optionsExpenseType, setOptionsExpenseType] = useState();
  const [paymentData, setPaymentData] = useState();
  const [selectedDate, setSelectedDate] = useState(sessionStorage.getItem('selectedDate'));
  const [selectedExpenseType, setSelectedExpenseType] = useState(sessionStorage.getItem('expenseType'));

  // TODO NEXT
  // - don't use form constructor for expense type select
  // - get expense type list (with IDs and label)
  // - populate a select drop down
  // - on selection get payments with expense type added as extra filter

  // TODO: this is repeating a call from FormAddPayment, look to combine this
  const getExpenseTypeData = async () => {
    try {
      const apiResponse = await axios.get(`${API_BASE}/expense-type`);
      setOptionsExpenseType(apiResponse.data);
    } catch (error) {
      console.log('e', error);
    }
  };

  // From here is code specific for this page
  const getPayments = async ({ date, expenseType }) => {
    /**
     * If a date is passed in that wins
     * else if there is a date in sessionStorage that wins
     * else if there is a selected date that wins
     * else we use today
     */
    let dateToUse;
    if (date) {
      dateToUse = date;
    } else if (sessionStorage.getItem('selectedDate')) {
      dateToUse = sessionStorage.getItem('selectedDate');
    } else if (selectedDate) {
      dateToUse = selectedDate;
    } else {
      dateToUse = dayjs();
    }

    let expenseTypeToUse;
    if (expenseType) {
      expenseTypeToUse = expenseType;
    } else if (sessionStorage.getItem('expenseType')) {
      expenseTypeToUse = sessionStorage.getItem('expenseType');
    } else if (selectedExpenseType) {
      expenseTypeToUse = selectedExpenseType;
    } else {
      expenseTypeToUse = null;
    }

    const startDate = dayjs(dateToUse).startOf('month').format('YYYY-MM-DD');
    const endDate = dayjs(dateToUse).endOf('month').format('YYYY-MM-DD');

    const apiResponse = await axios.get(`${API_BASE}/payments?dateStart=${startDate}&dateEnd=${endDate}&expense=${expenseTypeToUse}`);

    setPaymentData(apiResponse.data);
    sessionStorage.setItem('selectedDate', dateToUse);
    sessionStorage.setItem('expenseType', expenseTypeToUse);
  };

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    getPayments({ date: dayjs(e.target.value) });
  };

  const handleChangeExpense = (e) => {
    console.log(e.target);
    setSelectedExpenseType(e.target.value);
    getPayments({ expenseType: e.target.value });
  };

  useEffect(() => {
    getExpenseTypeData(selectedExpenseType || null);
    getPayments({
      date: selectedDate || dayjs(),
      expenseType: selectedExpenseType
    });
  }, []);

  if (!paymentData) { return <h1>Loading</h1>; }
  return (
    <>
      <h1>Payments</h1>
      <div className="action-container">
        {/* Need to put something in for accessibility to indicate which month/year we're on */}
        <input
          type="month"
          id="viewMonth"
          name="viewMonth"
          value={selectedDate || dayjs().format('YYYY-MM')}
          onChange={(e) => { handleChange(e); }}
        />
        {optionsExpenseType && (
          <div className="form-field">
            <label htmlFor="expenseType">
              Expense type
            </label>
            <select
              type="select"
              id="expenseType"
              name="expenseType"
              className="select"
              defaultValue={selectedExpenseType}
              onChange={(e) => { handleChangeExpense(e); }}
            >
              <option disabled value="selectOption">Select an option</option>
              {optionsExpenseType.map((option) => (
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

      </div>
      <div className="payment-table">
        <table>

          <thead>
            <tr>
              <th scope="col">Date paid</th>
              <th scope="col">Paid to</th>
              <th scope="col">Paid from</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentData && paymentData.map((payment) => (
              <tr key={payment.id}>
                <td data-label="Date paid">{dayjs(payment?.date).format('DD-MM-YYYY')}</td>
                <td data-label="Paid to">{payment.recipient.name}</td>
                <td data-label="Paid from">{payment.paymentSource.label}</td>
                <td data-label="Type">{payment.expenseType.label}</td>
                <td data-label="Amount">{pounds.format(payment.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Payments;
