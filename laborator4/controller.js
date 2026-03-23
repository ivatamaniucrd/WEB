class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindButtonClick(this.handleButtonClick.bind(this));
        this.view.render(this.model.getState());
    }

    handleButtonClick(action, value) {
        switch (action) {
            case "number":
                this.model.appendNumber(value);
                break;
            case "decimal":
                this.model.appendDecimal();
                break;
            case "operator":
                this.model.chooseOperator(value);
                break;
            case "equals":
                this.model.calculate();
                break;
            case "clear":
                this.model.clear();
                break;
            case "sign":
                this.model.toggleSign();
                break;
            case "percent":
                this.model.percentage();
                break;
        }

        this.view.render(this.model.getState());
    }
}

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);