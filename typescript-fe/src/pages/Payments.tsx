import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';
import { API_BASE } from '../constants/ApiConstants';
import pounds from '../utils/CurrencyFormat';
import '../assets/css/components.scss';
import '../assets/css/payments.scss';

/**
 *
 * input type = month is not supported on Safari (desktop) or Firefox or IE https://caniuse.com/?search=month
 * as this is a learning project & just for my mum who uses Edge/Chrome that's fine
 */

function Payments() {
  const [optionsExpenseType, setOptionsExpenseType] = useState();
  // const [paymentData, setPaymentData] = useState();
  // const [selectedDate, setSelectedDate] = useState(sessionStorage.getItem('selectedDate'));
  // const [selectedExpenseType, setSelectedExpenseType] = useState(sessionStorage.getItem('expenseType'));
  // const [totals, setTotals] = useState();

  // TODO: this is repeating a call from FormAddPayment, look to combine this
  const getExpenseTypeData = async () => {
    try {
      const apiResponse = await axios.get(`${API_BASE}/expense-type`);
      setOptionsExpenseType(apiResponse.data);
    } catch (error) {
      // TODO: handle errors
      console.log('e', error);
    }
  };

  // // From here is code specific for this page
  // const calculateTotal = (data) => {
  //   const result = data.length > 0 ? data.map((payment) => payment.amount).reduce((a, b) => a + b) : 0;
  //   setTotals(result);
  // };

  // const getPayments = async ({ date, expenseType }) => {
  //   let dateToUse;
  //   if (date) {
  //     dateToUse = date;
  //   } else if (sessionStorage.getItem('selectedDate')) {
  //     dateToUse = sessionStorage.getItem('selectedDate');
  //   } else if (selectedDate) {
  //     dateToUse = selectedDate;
  //   } else {
  //     dateToUse = dayjs();
  //   }

  //   let expenseTypeToUse;
  //   if (expenseType) {
  //     expenseTypeToUse = expenseType;
  //   } else if (sessionStorage.getItem('expenseType')) {
  //     expenseTypeToUse = sessionStorage.getItem('expenseType');
  //   } else if (selectedExpenseType) {
  //     expenseTypeToUse = selectedExpenseType;
  //   } else {
  //     expenseTypeToUse = null;
  //   }

  //   const startDate = dayjs(dateToUse).startOf('month').format('YYYY-MM-DD');
  //   const endDate = dayjs(dateToUse).endOf('month').format('YYYY-MM-DD');

  //   const apiResponse = await axios.get(`${API_BASE}/payments?dateStart=${startDate}&dateEnd=${endDate}&expense=${expenseTypeToUse}`);

  //   setPaymentData(apiResponse.data);
  //   calculateTotal(apiResponse.data);
  //   sessionStorage.setItem('selectedDate', dateToUse);
  //   sessionStorage.setItem('expenseType', expenseTypeToUse);
  // };

  // const handleChange = (e) => {
  //   setSelectedDate(e.target.value);
  //   getPayments({ date: dayjs(e.target.value) });
  // };

  // const handleChangeExpense = (e) => {
  //   setSelectedExpenseType(e.target.value);
  //   getPayments({ expenseType: e.target.value });
  // };

  // const handleRefreshClick = (e) => {
  //   e.preventDefault();
  //   getExpenseTypeData(selectedExpenseType || null);
  //   getPayments({
  //     date: selectedDate || dayjs(),
  //     expenseType: selectedExpenseType
  //   });
  // };

  useEffect(() => {
    getExpenseTypeData();
    // getPayments({
    //   date: selectedDate || dayjs(),
    //   expenseType: selectedExpenseType
    // });
  }, []);

  // if (!paymentData) { return <h1>Loading</h1>; }
  return (
    <>
      <h1>Payments</h1>
      <div className="action-container">
        <div className="actions-left">
          <div className="form-field">
            <label htmlFor="viewMonth">
              Month
            </label>
            {/* <input
              type="month"
              id="viewMonth"
              name="viewMonth"
              value={dayjs(selectedDate).format('YYYY-MM') || dayjs().format('YYYY-MM')}
              onChange={(e) => { handleChange(e); }}
            /> */}
          </div>
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
                <option value="selectOption">Show all</option>
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
        {/* <div className="actions-right">
          <button
            className="button button-submit"
            type="button"
            onClick={(e) => handleRefreshClick(e)}
          >
            Refresh
          </button>
        </div> */}

      </div>
      <div className="payment-table">
        <table>

          <thead>
            <tr>
              <th scope="col">Date paid</th>
              <th scope="col">Paid to</th>
              <th scope="col">Paid from</th>
              <th scope="col">Type</th>
              <th scope="col" className="currency">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* {paymentData && paymentData.map((payment) => (
              <tr key={payment.id}>
                <td data-label="Date paid">{dayjs(payment?.date).format('DD-MM-YYYY')}</td>
                <td data-label="Paid to">{payment.recipient.name}</td>
                <td data-label="Paid from">{payment.paymentSource.label}</td>
                <td data-label="Type">{payment.expenseType.label}</td>
                <td data-label="Amount" className="currency">{pounds.format(payment.amount)}</td>
              </tr>
            ))} */}
          </tbody>
          <tfoot>
            {/* <tr>
              <th id="total" colSpan="4">Total :</th>
              <td className="currency">{pounds.format(totals)}</td>
            </tr> */}
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default Payments;
