"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqHandler = void 0;
const producer_1 = require("./producer");
const RabbitMQconfig_json_1 = __importDefault(require("../RabbitMQconfig.json"));
class RabbitMqHandler extends producer_1.RabbitMqProducer {
    constructor(_rabbitMQConfig) {
        // defaults to the RabbitMQconfig
        let tempConfig = _rabbitMQConfig;
        if (!tempConfig)
            tempConfig = RabbitMQconfig_json_1.default;
        super(tempConfig);
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.publish(event, this.publishers[0]);
            }
            catch (err) {
                throw new Error(`Rascal config error: ${err.message}`);
            }
        });
    }
}
exports.RabbitMqHandler = RabbitMqHandler;
