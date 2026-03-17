import { Collection } from 'discord.js';

declare module 'discord.js' {
    interface Client {
        events: Collection<string, any>
    }
}