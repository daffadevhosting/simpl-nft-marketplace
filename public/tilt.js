"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyles = {
  transformStyle: "preserve-3d"
};

function Hover(_ref) {
  var children = _ref.children,
      _ref$easing = _ref.easing,
      easing = _ref$easing === undefined ? "cubic-bezier(.03,.98,.52,.99)" : _ref$easing,
      _ref$scale = _ref.scale,
      scale = _ref$scale === undefined ? 1 : _ref$scale,
      _ref$speed = _ref.speed,
      speed = _ref$speed === undefined ? 400 : _ref$speed,
      _ref$perspective = _ref.perspective,
      perspective = _ref$perspective === undefined ? 1000 : _ref$perspective,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? 10 : _ref$max,
      _ref$onMouseEnter = _ref.onMouseEnter,
      onMouseEnter = _ref$onMouseEnter === undefined ? function () {} : _ref$onMouseEnter,
      _ref$onMouseMove = _ref.onMouseMove,
      onMouseMove = _ref$onMouseMove === undefined ? function () {} : _ref$onMouseMove,
      _ref$onMouseLeave = _ref.onMouseLeave,
      onMouseLeave = _ref$onMouseLeave === undefined ? function () {} : _ref$onMouseLeave;

  var _useState = (0, _react.useState)(defaultStyles),
      _useState2 = _slicedToArray(_useState, 2),
      tiltStyles = _useState2[0],
      setTiltStyles = _useState2[1];

  var element = (0, _react.useRef)();
  var width = (0, _react.useRef)(0);
  var height = (0, _react.useRef)(0);
  var top = (0, _react.useRef)(0);
  var left = (0, _react.useRef)(0);
  var updateCall = (0, _react.useRef)(null);
  var transitionTimeout = (0, _react.useRef)(null);

  var handleOnMouseEnter = function handleOnMouseEnter() {
    updateElementPosition();
    setTransition();
    return onMouseEnter();
  };

  var handleOnMouseMove = function handleOnMouseMove(event) {
    if (updateCall.current !== null && typeof window !== "undefined") {
      window.cancelAnimationFrame(updateCall.current);
    }
    updateCall.current = requestAnimationFrame(function () {
      return updateElementStyle(event);
    });
    return onMouseMove(event);
  };

  var handleOnMouseLeave = function handleOnMouseLeave(event) {
    setTransition();
    handleReset();
    return onMouseLeave(event);
  };

  var updateElementStyle = function updateElementStyle(event) {
    var values = getValues(event);

    setTiltStyles(function (prevStyle) {
      return _extends({}, prevStyle, {
        transform: "perspective(" + perspective + "px) rotateX(\n        " + values.tiltY + "deg) rotateY(" + values.tiltX + "deg) scale3d(" + scale + ", " + scale + ", " + scale + ")"
      });
    });
  };

  var getValues = function getValues(event) {
    var x = (event.clientX - left.current) / width.current;
    var y = (event.clientY - top.current) / height.current;

    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    var tiltX = -1 * (max / 2 - x * max).toFixed(2);
    var tiltY = -1 * (max / 2 - y * max).toFixed(2);

    var angle = Math.atan2(event.clientX - (left.current + width.current / 2), -(event.clientY - (top.current + height.current / 2))) * (180 / Math.PI);

    var percentageX = x * 100;
    var percentageY = y * 100;

    return {
      tiltX: tiltX,
      tiltY: tiltY,
      angle: angle,
      percentageX: percentageX,
      percentageY: percentageY
    };
  };

  var updateElementPosition = function updateElementPosition() {
    var rect = element.current.getBoundingClientRect();
    width.current = rect.width;
    height.current = rect.height;
    top.current = rect.top;
    left.current = rect.left;
  };

  var setTransition = function setTransition() {
    clearTimeout(transitionTimeout.current);

    setTiltStyles(function (prevStyle) {
      return _extends({}, prevStyle, {
        transition: speed + "ms " + easing
      });
    });

    transitionTimeout.current = setTimeout(function () {
      setTiltStyles(function (prevStyle) {
        return _extends({}, prevStyle, {
          transition: ""
        });
      });
    }, speed);
  };

  var handleReset = function handleReset() {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(function () {
        setTiltStyles(function (prevStyle) {
          return _extends({}, prevStyle, {
            transform: "perspective(" + perspective + "px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
          });
        });
      });
    }
  };

  return _react2.default.createElement(
    "div",
    {
      className: "hover-3d",
      style: tiltStyles,
      ref: element,
      onMouseEnter: handleOnMouseEnter,
      onMouseMove: handleOnMouseMove,
      onMouseLeave: handleOnMouseLeave
    },
    children
  );
}

exports.default = Hover;
