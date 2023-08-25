import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Remplacez cet exemple par une requête réelle vers l'API de taux de change
    const fakeExchangeRate = 0.85;
    setExchangeRate(fakeExchangeRate);

    // Effectuer une requête réelle vers l'API des devises
    axios.get('http://free.currencyconverterapi.com/api/v6/currencies')
      .then(response => {
        setApiData(Object.values(response.data.results));
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des devises :', error);
      });
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {apiData.map(currency => (
            <option key={currency.id} value={currency.id}>{currency.currencyName}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Converted Amount: {convertedAmount} {toCurrency}</p>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {apiData.map(currency => (
            <option key={currency.id} value={currency.id}>{currency.currencyName}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyConverter;
