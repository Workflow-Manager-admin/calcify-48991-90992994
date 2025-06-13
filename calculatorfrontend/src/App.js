import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  // Calculator UI state
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [apiError, setApiError] = useState(null);

  // Button labels/layout for calculator
  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", "C", "=", "+"],
  ];

  // PUBLIC_INTERFACE
  function handleButtonClick(val) {
    setApiError(null);
    if (val === "C") {
      setExpression("");
      setResult("");
    } else if (val === "=") {
      if (expression === "") return;
      calculateBackend(expression);
    } else {
      if (result !== "") {
        setExpression(val.match(/[\d.]/) ? result + val : result + " " + val + " ");
        setResult("");
      } else {
        setExpression(prev => {
          // Spacing for ops (for consistent splitting)
          if (["/", "*", "-", "+"].includes(val)) return prev.trim() + " " + val + " ";
          return prev + val;
        });
      }
    }
  }

  // PUBLIC_INTERFACE
  async function calculateBackend(expr) {
    // Parse for simple binary operation: "a op b"
    // Accepts input: "1 + 2" or "12/8"
    try {
      // Extract operands and operator
      let match = expr.match(/^\s*(-?\d+(?:\.\d+)?)(?:\s*)([+\-*/])(?:\s*)(-?\d+(?:\.\d+)?)(?:\s*)$/);
      if (!match) {
        setApiError("Invalid expression. Use e.g. '1 + 2'");
        return;
      }
      const n1 = parseFloat(match[1]);
      const op = match[2];
      const n2 = parseFloat(match[3]);

      // Call backend (assume local FastAPI on port 8000)
      const res = await fetch(
        "http://localhost:8000/calculate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ operand1: n1, operand2: n2, operator: op })
        }
      );
      if (!res.ok) {
        setApiError("API error: " + res.status);
        return;
      }
      const data = await res.json();
      if (typeof data.result !== "undefined") {
        setResult(data.result);
        setExpression(""); // Clear for next use
      } else if (data.error) {
        setApiError(data.error);
      } else {
        setApiError("Unknown API error");
      }
    } catch (e) {
      setApiError("Could not contact backend.");
    }
  }

  // Generate calculator buttons
  function renderButtons() {
    return (
      <div className="calc-buttons">
        {buttons.map((row, i) => (
          <div className="calc-row" key={i}>
            {row.map((btn) => (
              <button
                key={btn}
                className={`calc-btn ${btn === "=" ? "btn-equal" : ""} ${["+", "-", "*", "/"].includes(btn) ? "btn-operator" : ""} ${btn === "C" ? "btn-clear" : ""}`}
                onClick={() => handleButtonClick(btn)}
                aria-label={btn === "*" ? "multiply" : btn}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="app calcify-app-bg">
      <nav className="navbar" style={{ background: "var(--primary-color)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: "var(--accent-color)" }}>C</span>
              <span style={{ color: "var(--primary-color)", fontWeight: 700 }}>Calcify</span>
            </div>
            <a className="btn" href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ background: "var(--secondary-color)", color: "#262626" }}>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ maxWidth: "380px", marginTop: "120px" }}>
          <div className="calc-card">
            <div className="calc-display" data-testid="display">
              {result !== "" ? (
                <>
                  <span className="calc-label">Result:</span>
                  <span className="calc-value">{result}</span>
                </>
              ) : (
                <span className="calc-value">{expression || "0"}</span>
              )}
            </div>
            {apiError && <div className="api-error">{apiError}</div>}
            {renderButtons()}
            <div className="calc-hint">
              <span>e.g. 1 + 2, 12 / 4</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
