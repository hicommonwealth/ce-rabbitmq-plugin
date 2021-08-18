import { RabbitMqProducer as Producer } from '../src/producer';
import { getRabbitMQConfig } from '../src';
import Rascal from 'rascal';
import { assert } from 'chai';

// Assumes: A live local CW server, a live local RabbitMQ server
describe.only('RabbitMQ producer integration tests', () => {
  let producer, consumer;

  it('should initialize a RabbitMQ producer with the default config', async function () {
    producer = await new Producer(getRabbitMQConfig());
    await producer.init();
    assert.isNotNull(producer.broker);

    return;
  });

  it('should publish a CWEvent to a queue', async function () {
    consumer = await Rascal.BrokerAsPromised.create(
      Rascal.withDefaultConfig(getRabbitMQConfig())
    );

    const sub = await consumer.subscribe('eventsSub');
    sub.on('message', (message, content, ackOrNack) => {
      assert.equal(content.blockNumber, 10);
      assert.equal(content.data, {});
      assert.equal(content.chain, 'polkadot');
      assert.equal(content.received, 123);
    });

    producer.handle({
      blockNumber: 10,
      data: {},
      chain: 'polkadot',
      received: 123,
    });

    return;
  });

  it('should prevent excluded events from being published', async function () {
    const sub = await consumer.subscribe('eventsSub');
    sub.on('message', (message, content, ackOrNack) => {
      assert.equal(content.blockNumber, 10);
      assert.equal(content.data, {});
      assert.equal(content.chain, 'polkadot');
      assert.equal(content.received, 123);
    });

    producer.handle({
      blockNumber: 10,
      data: {
        kind: 'dont-skip',
      },
      chain: 'polkadot',
      received: 123,
    });

    producer.handle({
      blockNumber: 99,
      data: {
        kind: 'skip',
      },
      chain: 'polkadot',
      received: 77,
    });

    return;
  });
});
