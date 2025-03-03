import './App.css'
import { useState } from 'react'

const buttonInfo = [
  {
    id: "clear",
    symbol: "AC" 
  },
  {
    id: "divide",
    symbol: "/" 
  },
  {
    id: "seven",
    symbol: "7" 
  },
  {
    id: "eight",
    symbol: "8" 
  },
  {
    id: "nine",
    symbol: "9" 
  },
  {
    id: "multiply",
    symbol: "*" 
  },
  {
    id: "four",
    symbol: "4" 
  },
  {
    id: "five",
    symbol: "5" 
  },
  {
    id: "six",
    symbol: "6" 
  },
  {
    id: "subtract",
    symbol: "-" 
  },
  {
    id: "one",
    symbol: "1" 
  },
  {
    id: "two",
    symbol: "2" 
  },
  {
    id: "three",
    symbol: "3" 
  },
  {
    id: "add",
    symbol: "+" 
  },
  {
    id: "zero",
    symbol: "0" 
  },
  {
    id: "decimal",
    symbol: "." 
  },
  {
    id: "equals",
    symbol: "=" 
  }
]

function App() {

  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("0");
  const et = expression.trim();

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  }
  
  const buttonPress = (symbol: string) => {
    if (symbol === "AC") {
      setAnswer("");
      setExpression("0");
    } else if (isOperator(symbol)){
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate()
    } else if (symbol === "0") {
      if(expression.charAt(0) !== "0"){
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  }
  
  return (
    <>
      <div className="container">
      <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
      </div>
          <div id="buttons">
            {buttonInfo.map(btn => (
              <button 
                key={btn.id} 
                className={`btn-${btn.id}`} 
                id={btn.id}
                onClick={() => buttonPress(btn.symbol)}
                >
                {btn.symbol}
              </button>
            ))}
          </div>
      </div>
    </>
  )
}

export default App
