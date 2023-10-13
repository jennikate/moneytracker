import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_BASE } from '../constants/ApiConstants';
import pounds from '../utils/CurrencyFormat';
import '../assets/css/components.scss';
import '../assets/css/payments.scss';

function Payments() {
  // TODO: collect this month name for caption
  // TODO: add restriction onto this endpoint to only get transactions for this month
  const [paymentData, setPaymentData] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  const getPayments = async (date) => {
    const startDate = dayjs(date).format('YYYY-MM-DD');
    const endDate = dayjs(date).endOf('month').format('YYYY-MM-DD');

    const apiResponse = await axios.get(`${API_BASE}/payments?dateStart=${startDate}&dateEnd=${endDate}`);
    setPaymentData(apiResponse.data);
  };

  useEffect(() => {
    getPayments();
  }, []);

  if (!paymentData) { return <h1>Loading</h1>; }

  return (
    <>
      <h1>Payments</h1>
      <div className="action-container">
        <h2>This months name payments</h2>
        <Link
          to="/"
        >
          View more
        </Link>
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
