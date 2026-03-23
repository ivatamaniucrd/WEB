class CalculatorModel {
    constructor() {
        this.clear();
    }

    clear() {
        this.currentInput = "0";
        this.previousInput = "";
        this.operator = null;
        this.expression = "0";
        this.justCalculated = false;
        this.error = false;
    }

    getState() {
        return {
            expression: this.expression,
            result: this.currentInput
        };
    }

    appendNumber(number) {
        if (this.error) {
            this.clear();
        }

        if (this.justCalculated && !this.operator) {
            this.currentInput = "0";
            this.expression = "0";
            this.justCalculated = false;
        }

        if (this.currentInput === "0") {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }

        this.updateExpression();
    }

    appendDecimal() {
        if (this.error) {
            this.clear();
        }

        if (this.justCalculated && !this.operator) {
            this.currentInput = "0";
            this.expression = "0";
            this.justCalculated = false;
        }

        if (!this.currentInput.includes(".")) {
            this.currentInput += ".";
        }

        this.updateExpression();
    }

    chooseOperator(operator) {
        if (this.error) {
            return;
        }

        if (this.operator && this.previousInput !== "" && !this.justCalculated) {
            this.calculate();
            if (this.error) return;
        }

        this.previousInput = this.currentInput;
        this.operator = operator;
        this.justCalculated = false;
        this.updateExpression(true);
        this.currentInput = "0";
    }

    calculate() {
        if (this.error) return;
        if (!this.operator || this.previousInput === "") return;

        const a = parseFloat(this.previousInput);
        const b = parseFloat(this.currentInput);
        let result;

        switch (this.operator) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "*":
                result = a * b;
                break;
            case "/":
                if (b === 0) {
                    this.currentInput = "Eroare";
                    this.expression = `${this.previousInput} ${this.getOperatorSymbol(this.operator)} ${this.currentInput}`;
                    this.error = true;
                    return;
                }
                result = a / b;
                break;
            default:
                return;
        }

        result = Number(result.toFixed(10)).toString();

        this.expression = `${this.previousInput} ${this.getOperatorSymbol(this.operator)} ${this.currentInput} =`;
        this.currentInput = result;
        this.previousInput = "";
        this.operator = null;
        this.justCalculated = true;
    }

    toggleSign() {
        if (this.error) return;

        if (this.currentInput !== "0") {
            this.currentInput = (parseFloat(this.currentInput) * -1).toString();
        }

        this.updateExpression();
    }

    percentage() {
        if (this.error) return;

        this.currentInput = (parseFloat(this.currentInput) / 100).toString();
        this.updateExpression();
    }

    updateExpression(showOperatorOnly = false) {
        if (this.operator && this.previousInput !== "") {
            if (showOperatorOnly) {
                this.expression = `${this.previousInput} ${this.getOperatorSymbol(this.operator)}`;
            } else {
                this.expression = `${this.previousInput} ${this.getOperatorSymbol(this.operator)} ${this.currentInput}`;
            }
        } else {
            this.expression = this.currentInput;
        }
    }

    getOperatorSymbol(operator) {
        switch (operator) {
            case "/": return "÷";
            case "*": return "×";
            case "-": return "−";
            case "+": return "+";
            default: return operator;
        }
    }
}