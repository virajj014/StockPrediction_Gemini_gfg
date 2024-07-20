import React, { useState } from 'react'
import './FinancialForm.css';
import { FadeLoader } from 'react-spinners';


const API_KEY = process.env.REACT_APP_GEMINI_API;
const FinancialForm = ({setResult}) => {

    const [values, setValues] = useState({
        marketPrice: '50',
        eps: '5',
        bookValue: '25',
        sales: '10',
        annualDividends: '2',
        previousEps: '4',
        currentEps: '5',
        totalDebt: '100',
        totalEquity: '200',
        netIncome: '30',
    })
    const [isSent, setIsSent] = useState(true)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(values);

        const trainingPrompt = [
            {
                "parts": [
                    {
                        "text": "From next prompt I am gonna send you some parameters for predicting stock market share , tell me is it overvalued or undervalued , buy or not"
                    }
                ],
                "role": "user"
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
            {
                "role": "user",
                "parts": [{
                    "text": "and also calculate - P/E ratio , P/B ratio, P/S Ratio, Dividend Yield, Earnings Growth in %, Debt-to-Equity Ratio, ROE % and give as a response"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "always give response in form of HTML div and table tag"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
        ]

        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`


        let messagesToSend = [
            ...trainingPrompt,
            {
                "role": "user",
                "parts": [{
                  "text": JSON.stringify(values)
                }]
              } 
        ]
        setIsSent(false)
        let res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": messagesToSend
              })
        })
        let resjson = await res.json()
        setIsSent(true)
        let responseMessage = resjson.candidates[0].content.parts[0].text
        console.log(responseMessage)
        setResult(responseMessage)
    }
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label>Market Price pre Share:</label>
                <input type='number' name='marketPrice' value={values.marketPrice} onChange={handleChange} />
            </div>
            <div>
                <label>Earnings per Share (EPS):</label>
                <input type="number" name="eps" value={values.eps} onChange={handleChange} required />
            </div>
            <div>
                <label>Book Value per Share:</label>
                <input type="number" name="bookValue" value={values.bookValue} onChange={handleChange} required />
            </div>
            <div>
                <label>Sales per Share:</label>
                <input type="number" name="sales" value={values.sales} onChange={handleChange} required />
            </div>
            <div>
                <label>Annual Dividends per Share:</label>
                <input type="number" name="annualDividends" value={values.annualDividends} onChange={handleChange} required />
            </div>
            <div>
                <label>Previous Year's EPS:</label>
                <input type="number" name="previousEps" value={values.previousEps} onChange={handleChange} required />
            </div>
            <div>
                <label>Current Year's EPS:</label>
                <input type="number" name="currentEps" value={values.currentEps} onChange={handleChange} required />
            </div>
            <div>
                <label>Total Debt:</label>
                <input type="number" name="totalDebt" value={values.totalDebt} onChange={handleChange} required />
            </div>
            <div>
                <label>Total Equity:</label>
                <input type="number" name="totalEquity" value={values.totalEquity} onChange={handleChange} required />
            </div>
            <div>
                <label>Net Income:</label>
                <input type="number" name="netIncome" value={values.netIncome} onChange={handleChange} required />
            </div>

            {
                isSent ?
                <button type="submit">Submit</button>
                :
                <FadeLoader className='loader'/>

            }
        </form>
    )
}

export default FinancialForm