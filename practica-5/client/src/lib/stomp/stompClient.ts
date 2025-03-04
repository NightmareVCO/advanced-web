import { Client } from '@stomp/stompjs';
import { WebSocket } from 'ws';

Object.assign(global, { WebSocket });

export const client = new Client({
	brokerURL: 'ws://server:8080/ws',
	reconnectDelay: 5000,
	onConnect: () => {
		client.subscribe('/topic/sensores', (message) => console.log(`Received: ${message.body}`));
	},
});

client.activate();
