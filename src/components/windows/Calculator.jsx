import React, { useState } from 'react'
import MacWindow from './MacWindow'
import './Calculator.scss'

function Calculator({ windowname, windowBox, setwindowBox, zIndex, onFocus }) {
    const [display, setDisplay] = useState('0')
    const [prevValue, setPrevValue] = useState(null)
    const [operation, setOperation] = useState(null)
    const [resetDisplay, setResetDisplay] = useState(false)

    const handleNumber = (num) => {
        if (display === '0' || resetDisplay) {
            setDisplay(num)
            setResetDisplay(false)
        } else {
            setDisplay(display + num)
        }
    }

    const handleOperation = (op) => {
        setPrevValue(parseFloat(display))
        setOperation(op)
        setResetDisplay(true)
    }

    const calculate = () => {
        const current = parseFloat(display)
        const prev = prevValue
        let result = 0

        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            default: return;
        }

        setDisplay(result.toString())
        setOperation(null)
        setPrevValue(null)
        setResetDisplay(true)
    }

    const clear = () => {
        setDisplay('0')
        setPrevValue(null)
        setOperation(null)
        setResetDisplay(false)
    }

    return (
        <MacWindow width={260} height={380} windowname={windowname} windowBox={windowBox} setwindowBox={setwindowBox} zIndex={zIndex} onFocus={onFocus}>
            <div className="calculator">
                <div className="calc-display">{display}</div>
                <div className="calc-buttons">
                    <button onClick={clear} className="btn-gray">AC</button>
                    <button className="btn-gray">+/-</button>
                    <button className="btn-gray">%</button>
                    <button onClick={() => handleOperation('/')} className="btn-orange">÷</button>

                    <button onClick={() => handleNumber('7')}>7</button>
                    <button onClick={() => handleNumber('8')}>8</button>
                    <button onClick={() => handleNumber('9')}>9</button>
                    <button onClick={() => handleOperation('*')} className="btn-orange">×</button>

                    <button onClick={() => handleNumber('4')}>4</button>
                    <button onClick={() => handleNumber('5')}>5</button>
                    <button onClick={() => handleNumber('6')}>6</button>
                    <button onClick={() => handleOperation('-')} className="btn-orange">−</button>

                    <button onClick={() => handleNumber('1')}>1</button>
                    <button onClick={() => handleNumber('2')}>2</button>
                    <button onClick={() => handleNumber('3')}>3</button>
                    <button onClick={() => handleOperation('+')} className="btn-orange">+</button>

                    <button onClick={() => handleNumber('0')} className="btn-zero">0</button>
                    <button onClick={() => handleNumber('.')}>.</button>
                    <button onClick={calculate} className="btn-orange">=</button>
                </div>
            </div>
        </MacWindow>
    )
}

export default Calculator
