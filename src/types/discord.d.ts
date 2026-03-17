import { Client, Collection } from 'discord.js';

export interface DiscordEvent {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => void;
}

declare module 'discord.js' {
    interface Client {
        events: Collection<string, DiscordEvent>
    }
}