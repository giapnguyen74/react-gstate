"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gstate = function gstate(query, renderer) {
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var Renderer = function (_React$Component) {
		_inherits(Renderer, _React$Component);

		function Renderer(props) {
			_classCallCheck(this, Renderer);

			var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

			_this.state = {
				data: undefined
			};

			if (!props.state) {
				throw new Error("Could not find state in props of gstate component. Please explicitly pass state as a prop to gstate component.");
			}
			return _this;
		}

		_createClass(Renderer, [{
			key: "refetch",
			value: function refetch() {
				var _this2 = this;

				this._watcher && this._watcher();
				this._watcher = this.props.state.watch(query, function (data) {
					_this2.setState({
						data: data
					});
				});
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				options.mounted && options.mounted.call(this);
				this.refetch();
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this._watcher && this._watcher();
			}
		}, {
			key: "render",
			value: function render() {
				return renderer(this.props, this.state.data, this);
			}
		}]);

		return Renderer;
	}(_react2.default.Component);

	return Renderer;
};

exports.default = gstate;