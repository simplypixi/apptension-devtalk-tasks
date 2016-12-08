import data from './data.js';

import {renderLayout} from '../utils';
import {salaryLoopDuration} from '../config.js';

const getExchangedCurrency = (amount, exchangeRate = 1) => amount / exchangeRate;

//ES2015: Class
class IterableSalary {
    constructor(countries) {
        this.countries = countries;
        this.index = 0;
    }
    //ES2015: Symbol
    [Symbol.iterator]() {
        return this;
    }
    next() {
        let country = this.countries[this.index];
        //ES2015: Internationaliaztion API - currency
        const formattedSalary = new Intl.NumberFormat(country.code, { style: "currency", currency: country.currency })
            .format(getExchangedCurrency(data.salary.amount, country.exchangeRate));
        //ES2015: Template Strings
        const text = `Więc gdy był ${country.label} to by dostawał ${formattedSalary} !`;
        if(this.index === this.countries.length - 1) {
            this.index = 0;
        } else {
            this.index++;
        }
        return {value: text };
    }
}

const renderSalaryLoop = (iterableInstance) => {
    let text = iterableInstance.next().value;
    setTimeout(() => {
        //ES2015: Enhanced Object Properties - Shorthand
        renderLayout({text}, '#salary-template', '#what-is-salary');
        renderSalaryLoop(iterableInstance);
    }, salaryLoopDuration);
};

export default () => {
    //ES2015: Iterator
    const iterableSalaryInstance = new IterableSalary(data.languages);
    renderSalaryLoop(iterableSalaryInstance);
    //ES2015: For-of loop
    // for (let country of cos) {
    //     renderLayout({text: country}, '#salary-template', '#what-is-salary');
    // }
};