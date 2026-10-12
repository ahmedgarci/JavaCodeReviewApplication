import { useCallback, useRef, useState } from "react";
import { Client, type Message } from "@stomp/stompjs";
import type { SuccessFulAuthentication } from "../Models/AuthResponse";

interface Notification {
    message: string;
    title: string;
    time: string;
}

type OnNotification = (notification: Notification) => void;

export default function useNotification(onNotif: OnNotification) {
    const clientRef = useRef<Client | null>(null);

    const [connected, setConnected] = useState(false);

    const connect = useCallback(() => {

        if (clientRef.current?.active) {
            return;
        }

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            console.error("No authenticated user found");
            return;
        }

        const user: SuccessFulAuthentication = JSON.parse(storedUser);
        const token = user.token;

        if (!token) {
            console.error("No token found");
            return;
        }

        const client = new Client({
            brokerURL: "ws://localhost:8089/ws/connect",

            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },

            onConnect: () => {
                console.log("WebSocket connected");

                setConnected(true);

                client.subscribe(
                    "/user/queue/notifications",
                    (message: Message) => {
                        const notification: Notification =JSON.parse(message.body);                        
                        onNotif(notification);
                    }
                );
            },

            onDisconnect: () => {
                console.log("WebSocket disconnected");
                setConnected(false);
            },

            onStompError: (frame) => {
                console.error("STOMP error:", frame);
                setConnected(false);
            },

            onWebSocketError: (error) => {
                console.error("WebSocket error:", error);
                setConnected(false);
            },
        });

        clientRef.current = client;

        client.activate();
    }, [onNotif]);

    const disconnect = useCallback(() => {
        if (!clientRef.current) {
            return;
        }

        clientRef.current.deactivate();
        clientRef.current = null;

        setConnected(false);
    }, []);

    return {
        connect,
        disconnect,
        connected,
    };
}