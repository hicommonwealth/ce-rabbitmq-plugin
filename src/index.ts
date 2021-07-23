export * as RabbitMqProducer from "./producer"
export * as RabbitMqHandler from "./handler"
export * from "./util"

import RabbitMqDefaultConfig from './RabbitMQconfig.json';
import RabbitMqIdentityConfig from './WithIdentityQueueConfig.json';

export { RabbitMqDefaultConfig, RabbitMqIdentityConfig };
