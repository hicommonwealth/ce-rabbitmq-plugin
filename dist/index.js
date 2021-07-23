"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqIdentityConfig = exports.RabbitMqDefaultConfig = exports.RabbitMqHandler = exports.RabbitMqProducer = void 0;
var producer_1 = require("./producer");
Object.defineProperty(exports, "RabbitMqProducer", { enumerable: true, get: function () { return producer_1.RabbitMqProducer; } });
var handler_1 = require("./handler");
Object.defineProperty(exports, "RabbitMqHandler", { enumerable: true, get: function () { return handler_1.RabbitMqHandler; } });
__exportStar(require("./util"), exports);
const RabbitMQconfig_json_1 = __importDefault(require("./RabbitMQconfig.json"));
exports.RabbitMqDefaultConfig = RabbitMQconfig_json_1.default;
const WithIdentityQueueConfig_json_1 = __importDefault(require("./WithIdentityQueueConfig.json"));
exports.RabbitMqIdentityConfig = WithIdentityQueueConfig_json_1.default;
