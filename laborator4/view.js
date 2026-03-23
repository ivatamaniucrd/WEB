class CalculatorView {
    constructor() {
        this.expressionElement = document.getElementById("expression");
        this.resultElement = document.getElementById("result");
        this.buttons = document.querySelectorAll(".btn");
    }

    render(state) {
        this.expressionElement.textContent = state.expression;
        this.resultElement.textContent = state.result;
    }

    bindButtonClick(handler) {
        this.buttons.forEach(button => {
            button.addEventListener("click", () => {
                const action = button.dataset.action;
                const value = button.dataset.value || null;
                handler(action, value);
            });
        });
    }
}