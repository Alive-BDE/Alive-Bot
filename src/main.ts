import { Client, Collection } from 'discord.js';
import fs from 'fs';

import Config from './config';

import { adlog } from './functions/functions';
import { DiscordEvent } from './types/discord';

process.on('unhandledRejection', (error: any) => adlog('error', 'node', error));

console.clear(), adlog('log', 'node', 'Executing...');

// Login
adlog('log', 'discord', 'Connecting...');
const client: Client<boolean> = new Client({
    intents: [Config.intents],
    rest: {
        timeout: Config.timeout
    }
});

(async () => {
    try {
        await client.login(Config.token);
    } catch (error: any) {
        adlog('error', 'discord', error);
        process.exit(1);
    }
})();

// Events Handler
client.events = new Collection();

const eventsFiles: string[] = fs.readdirSync('src/events').filter(file => file.endsWith('.ts'));
adlog('log', 'info', `Loading ${eventsFiles.length} events...`);

const eventsPromise = eventsFiles.map(eventFile =>
    import(`./events/${eventFile}`).then(module => {
        const event: DiscordEvent = module.default ?? module;

        if ('name' in event && 'execute' in event) {
            if (event.once) {
                client.once(event.name, (...args: unknown[]) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args: unknown[]) => event.execute(...args, client));
            }

            client.events.set(event.name as string, event);
        } else {
            adlog('error', 'fs', `Missing data in ${eventFile} event`);
        }
    })
)

Promise.all(eventsPromise).then(() => {
    adlog('info', 'fs', `Loaded ${client.events.size} events (${client.events.map(event => event.name).join(', ')})`);
})