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
exports.RabbitMqProducer = void 0;
const rascal_1 = __importDefault(require("rascal"));
class RabbitMqProducer {
    constructor(_rabbitMQConfig) {
        this._rabbitMQConfig = _rabbitMQConfig;
        // sets _vhost as the first vhost in the configuration passed
        this._vhost =
            _rabbitMQConfig.vhosts[Object.keys(_rabbitMQConfig.vhosts)[0]];
        // array of publishers
        this.publishers = Object.keys(this._vhost.publications);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`Rascal connecting to RabbitMQ: ${this._vhost.connection}`);
            this.broker = yield rascal_1.default.BrokerAsPromised.create(rascal_1.default.withDefaultConfig(this._rabbitMQConfig));
            this.broker.on('error', console.error);
            this.broker.on('vhost_initialized', ({ vhost, connectionUrl }) => {
                console.info(`Vhost: ${vhost} was initialised using connection: ${connectionUrl}`);
            });
            this.broker.on('blocked', (reason, { vhost, connectionUrl }) => {
                console.info(`Vhost: ${vhost} was blocked using connection: ${connectionUrl}. Reason: ${reason}`);
            });
            this.broker.on('unblocked', ({ vhost, connectionUrl }) => {
                console.info(`Vhost: ${vhost} was unblocked using connection: ${connectionUrl}.`);
            });
        });
    }
    publish(data, publisherName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.publishers.includes(publisherName))
                throw new Error('Publisher is not defined');
            try {
                const publication = yield this.broker.publish(publisherName, data);
                publication.on('error', (err, messageId) => {
                    console.error(`Publisher error ${err}, ${messageId}`);
                });
            }
            catch (err) {
                throw new Error(`Rascal config error: ${err.message}`);
            }
        });
    }
}
exports.RabbitMqProducer = RabbitMqProducer;
