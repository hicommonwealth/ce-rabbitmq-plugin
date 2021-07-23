export declare class RabbitMqProducer {
    private readonly _rabbitMQConfig;
    protected broker: any;
    readonly publishers: any;
    readonly _vhost: any;
    constructor(_rabbitMQConfig: any);
    init(): Promise<void>;
    publish(data: any, publisherName: string): Promise<any>;
}
