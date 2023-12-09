import kafka from 'kafka-node';

export const consumer = new kafka.ConsumerGroup({
    kafkaHost: process.env.KAFKA_BROKER || 'localhost:9092',
    groupId: 'backup-service-group',
    autoCommit: true,
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    fromOffset: 'latest'
}, 'github-repo-clone');