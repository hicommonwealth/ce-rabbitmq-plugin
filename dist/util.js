"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRabbitMQConfig = void 0;
// TODO: generalize this for any config file at any path
// returns either the RabbitMQ config specified by the filepath or the default config
const RabbitMQconfig_json_1 = __importDefault(require("./RabbitMQconfig.json"));
const fs_1 = __importDefault(require("fs"));
function getRabbitMQConfig(filepath) {
    if (typeof filepath == 'string' && filepath.length == 0)
        return RabbitMQconfig_json_1.default;
    else if (filepath == undefined)
        return RabbitMQconfig_json_1.default;
    else {
        try {
            let raw = fs_1.default.readFileSync(filepath);
            return JSON.parse(raw.toString());
        }
        catch (error) {
            console.error(`Failed to load the configuration file at: ${filepath}`);
            console.warn('Using default RabbitMQ configuration');
            return RabbitMQconfig_json_1.default;
        }
    }
}
exports.getRabbitMQConfig = getRabbitMQConfig;
