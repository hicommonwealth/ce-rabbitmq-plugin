import { RabbitMqProducer } from "./producer";
import { CWEvent, IEventHandler } from "chain-events";
export declare class RabbitMqHandler extends RabbitMqProducer implements IEventHandler {
    constructor(_rabbitMQConfig: {});
    handle(event: CWEvent): Promise<any>;
}
