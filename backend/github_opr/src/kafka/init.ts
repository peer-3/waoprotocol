import { Kafka, Consumer } from 'kafkajs';

export class KafkaConsumer {
    private static instance: KafkaConsumer;
    private _consumer = {} as Consumer;
    private _isConnected = false;

    private constructor() {
        const kafka = new Kafka({
            clientId: 'backup-service',
            brokers: [process.env.KAFKA_BROKER || 'http://localhost:9092'],
        });
        this._consumer = kafka.consumer({
            groupId: 'backup-service-group'
        });
    }

    public static getInstance(): KafkaConsumer {
        if (!KafkaConsumer.instance) {
            KafkaConsumer.instance = new KafkaConsumer();
        }
        return KafkaConsumer.instance;
    }

    public get isConnected() {
        return this._isConnected;
    }

    async connect(): Promise<void> {
        try {
            await this._consumer.connect();
            this._isConnected = true;
        } catch (err) {
            console.error(err);
        }
    }

    get consumer() {
        return this._consumer;
    }
}