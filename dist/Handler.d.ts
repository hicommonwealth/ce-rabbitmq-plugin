import { RabbitMqProducer } from "./Producer";
import { CWEvent, IEventHandler } from "chain-event-types";
export declare class RabbitMqHandler extends RabbitMqProducer implements IEventHandler {
    constructor(_rabbitMQConfig: {});
    handle(event: CWEvent): Promise<any>;
}
