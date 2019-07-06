"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Accessory_1 = require("./Accessory");
var LightBulb = /** @class */ (function (_super) {
    __extends(LightBulb, _super);
    function LightBulb(name, address) {
        var _this = _super.call(this) || this;
        _this._name = name;
        _this._address = address;
        return _this;
    }
    Object.defineProperty(LightBulb.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBulb.prototype, "address", {
        get: function () {
            return this._address;
        },
        enumerable: true,
        configurable: true
    });
    LightBulb.prototype.turnOn = function () { };
    LightBulb.prototype.turnOff = function () { };
    LightBulb.prototype.setRGBColor = function (r, g, b) { };
    LightBulb.prototype.setBrightness = function (brightness) { };
    return LightBulb;
}(Accessory_1.Accessory));
exports.LightBulb = LightBulb;
