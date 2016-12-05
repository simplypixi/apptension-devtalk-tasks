'use strict';

var _skrollr = require('skrollr');

var _skrollr2 = _interopRequireDefault(_skrollr);

var _stringRepeating = require('./string-repeating');

var stringRepeating = _interopRequireWildcard(_stringRepeating);

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

var _arrayFinding = require('./array-finding');

var _arrayFinding2 = _interopRequireDefault(_arrayFinding);

var _memeGenerator = require('./memeGenerator');

var _memeGenerator2 = _interopRequireDefault(_memeGenerator);

require('./styles/main.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s = _skrollr2.default.init();

(0, _promise2.default)();
(0, _arrayFinding2.default)();
(0, _memeGenerator2.default)();

//# sourceMappingURL=main-compiled.js.map