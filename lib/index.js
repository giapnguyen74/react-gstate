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
	var Renderer = function (_React$Component) {
		_inherits(Renderer, _React$Component);

		function Renderer(props) {
			_classCallCheck(this, Renderer);

			var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

			if (!props.state) {
				throw new Error("Could not find state in props of gstate component. Please explicitly pass state as a prop to gstate component.");
			}

			_this._view = null;

			_this.state = {
				data: undefined
			};
			return _this;
		}

		_createClass(Renderer, [{
			key: "refech",
			value: function refech() {
				var _this2 = this;

				this._watcher && this._watcher();
				if (typeof query == "function") {
					this._watcher = this.props.state.watch(function () {
						return query(_this2.props, _this2);
					}, function (view) {
						_this2._view = view || null;
						_this2.setState({});
					});
				} else {
					this._watcher = this.props.state.watch(query, function (data) {
						return _this2.setState({
							data: data
						});
					});
				}
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				this.refech();
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this._watcher && this._watcher();
			}
		}, {
			key: "render",
			value: function render() {
				return typeof query == "function" ? this._view : renderer(this.props, this.state.data, this);
			}
		}]);

		return Renderer;
	}(_react2.default.Component);

	return Renderer;
};

exports.default = gstate;