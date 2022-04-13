import { Kafka } from 'kafkajs';
import 'dotenv/config';

const msg = process.argv[2];
run();
async function run() {
    try {
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: [`localhost:9092`],            
        })

        const producer = kafka.producer();
        console.log("Connecting to producer");
        await producer.connect();
        console.log("Connected to producer");

        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            topic: "Product",
            messages: [
                {
                    value: msg,
                    partition: partition
                }
            ]
        })

        console.log("Send Sucessfully! ", JSON.stringify(result));
        await producer.disconnect();
    } catch (ex) {
        console.error("Something bad happened", ex);
    } finally {
        process.exit();
    }
}