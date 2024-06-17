// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '4a37f5cab99cab0549a5eb59';  // Replace with your actual API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/latest/USD`)
      .then(response => {
        const currencyData = response.data.conversion_rates;
        setCurrencies([response.data.base_code, ...Object.keys(currencyData)]);
      })
      .catch(error => console.error('Error fetching currency data:', error));
  }, []);

  const handleConversion = () => {
    axios.get(`${BASE_URL}/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.conversion_rates[toCurrency];
        setConversionResult((amount * rate).toFixed(2));
      })
      .catch(error => console.error('Error fetching conversion data:', error));
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
        <select 
          value={fromCurrency} 
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button onClick={handleConversion}>Convert</button>
      </div>
      {conversionResult && (
        <div>
          <h2>Conversion Result</h2>
          <p>{amount} {fromCurrency} = {conversionResult} {toCurrency}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
