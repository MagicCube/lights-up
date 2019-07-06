"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var App_1 = require("./App");
electron_1.app.on('ready', function () {
    App_1.App.instance.setup();
});
