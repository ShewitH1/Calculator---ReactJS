import React, { useState } from 'react';
import { FaSun, FaMoon } from "react-icons/fa";
import './App.css';

function App() {
  const [theme, setTheme] = useState("dark");
  const [display, setDisplay] = useState("");
  const [highlight, setHighlight] = useState("#168aad");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State to control history section visibility

  const calculateResult = (expression) => {
    try { 
      return eval(expression);
    } catch (err) {
      return "";
    }
  }

  const handleButtonClick = (value) => {
    setDisplay(prevDisplay => prevDisplay + value);
  }

  const handleThemeChange = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
  }

  const handleEqualClick = () => {
    const result = calculateResult(display);
    setHistory(prevHistory => [...prevHistory, { expression: display, result }]);
    setDisplay(result.toString());
  }

  const handleHistoryItemClick = (expression) => {
    setDisplay(expression);
  }

  const toggleHistory = () => {
    setShowHistory(prevState => !prevState); // Toggle history section visibility
  }

  return (
    <div className={`app ${theme}`} style={{ "--highlight": highlight }}>
      <div className='theme-changer' onClick={handleThemeChange}>
        {theme === "dark" ? <FaMoon className='theme-icon' /> : <FaSun className='theme-icon' />}
      </div>
      <div className='container'>
        <div className='calculator'>
          <div className='display'>
            <p className='ans-frame' style={{ color: theme === "dark" ? "white" : "black" }}>{calculateResult(display)}</p>
            <input className='que-frame' type={"text"} value={display} onChange={e => setDisplay(e.target.value)} />
          </div>
          <div className='buttons'>
            <button className="button clear" onClick={() => setDisplay("")}>AC</button>
            <button className="button operator" onClick={() => handleButtonClick("/")}>÷</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("7")}>7</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("8")}>8</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("9")}>9</button>
            <button className="button operator" onClick={() => handleButtonClick("*")}>×</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("4")}>4</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("5")}>5</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("6")}>6</button>
            <button className="button operator" onClick={() => handleButtonClick("-")}>-</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("1")}>1</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("2")}>2</button>
            <button className="button normal-btn" onClick={() => handleButtonClick("3")}>3</button>
            <button className="button operator" onClick={() => handleButtonClick("+")}>+</button>
            <button className="button zero" onClick={() => handleButtonClick("0")}>0</button>
            <button className="button normal-btn" onClick={() => handleButtonClick(".")}>.</button>
            <button className="button equal" onClick={handleEqualClick}>=</button>
          </div>
          <button className="toggle-history" onClick={toggleHistory}>Toggle History</button>
        </div>
        {showHistory && (
          <div className='history'>
            <h2>History</h2>
            <div className='history-content'>
              <ul>
                {history.map((item, index) => (
                  <li key={index} onClick={() => handleHistoryItemClick(item.expression)}>
                    <span className='expression'>{item.expression}</span>
                    <span className='result'>{item.result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className='highlight-frame'>
        {["#F94A29", "#C70039", "#D800A6", "#A91079", "#FF5403", "#007965"].map((color, index) => (
          <div
            key={index}
            className={`colors ${highlight === color ? "active-color" : "unactive-color"}`}
            style={{ backgroundColor: color }}
            onClick={() => setHighlight(color)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
