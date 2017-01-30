'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = require('./data.js');

var _data2 = _interopRequireDefault(_data);

var _utils = require('../utils');

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getExchangedCurrency = function getExchangedCurrency(amount) {
    var exchangeRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return amount / exchangeRate;
};

//ES2015: Class

var IterableSalary = function () {
    function IterableSalary(countries) {
        _classCallCheck(this, IterableSalary);

        this.countries = countries;
        this.index = 0;
    }
    //ES2015: Symbol


    _createClass(IterableSalary, [{
        key: Symbol.iterator,
        value: function value() {
            return this;
        }
    }, {
        key: 'next',
        value: function next() {
            var country = this.countries[this.index];
            //ES2015: Internationaliaztion API - currency
            var formattedSalary = new Intl.NumberFormat(country.code, { style: "currency", currency: country.currency }).format(getExchangedCurrency(_data2.default.salary.amount, country.exchangeRate));
            //ES2015: Template Strings
            var text = 'Wi\u0119c gdy by\u0142 ' + country.label + ' to by dostawa\u0142 ' + formattedSalary + ' !';
            if (this.index === this.countries.length - 1) {
                this.index = 0;
            } else {
                this.index++;
            }
            return { value: text };
        }
    }]);

    return IterableSalary;
}();

var renderSalaryLoop = function renderSalaryLoop(iterableInstance) {
    var text = iterableInstance.next().value;
    setTimeout(function () {
        //ES2015: Enhanced Object Properties - Shorthand
        (0, _utils.renderLayout)({ text: text }, '#salary-template', '#what-is-salary');
        renderSalaryLoop(iterableInstance);
    }, _config.salaryLoopDuration);
};

exports.default = function () {
    //ES2015: Iterator
    var iterableSalaryInstance = new IterableSalary(_data2.default.languages);
    renderSalaryLoop(iterableSalaryInstance);
    //ES2015: For-of loop
    // for (let country of cos) {
    //     renderLayout({text: country}, '#salary-template', '#what-is-salary');
    // }
};

//# sourceMappingURL=index-compiled.js.map