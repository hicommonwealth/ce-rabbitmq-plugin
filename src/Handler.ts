import { RabbitMqProducer } from "./Producer";
import {CWEvent, IEventHandler} from "chain-event-types"

export class RabbitMqHandler extends RabbitMqProducer implements IEventHandler {
    constructor(_rabbitMQConfig: {}) {
        super(_rabbitMQConfig);
    }

    public async handle(event: CWEvent): Promise<any> {
        try {
            await this.publish(event, this.publishers[0]);
        } catch (err) {
            throw new Error(`Rascal config error: ${err.message}`);
        }
    }
}
