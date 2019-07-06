"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var menubar_1 = require("menubar");
var LEDStrip_1 = require("./accessories/LEDStrip");
var App = /** @class */ (function () {
    function App() {
        this._ledStrip = null;
    }
    Object.defineProperty(App, "instance", {
        get: function () {
            if (!App._instance) {
                App._instance = new App();
            }
            return App._instance;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.setup = function () {
        this._initMenubar();
        this._initLEDStrip();
        this._registerHotkeys();
        this._registerEnvents();
    };
    App.prototype._initLEDStrip = function () {
        this._ledStrip = new LEDStrip_1.LEDStrip('LED Strip in Studio Room', '192.168.4.12');
    };
    App.prototype._initMenubar = function () {
        var options = {
            index: 'http://localhost:3000/'
        };
        menubar_1.menubar(__assign({}, options, { browserWindow: {
                width: 300,
                height: 400,
                vibrancy: 'popover',
                webPreferences: {
                    nodeIntegration: true
                }
            }, preloadWindow: true }));
    };
    App.prototype._registerHotkeys = function () { };
    App.prototype._registerEnvents = function () { };
    App._instance = null;
    return App;
}());
exports.App = App;
