    import { Client, Collection, REST, Routes } from 'discord.js';
import fs from 'fs';

import Config from './config';

import { adlog } from './functions/functions';
import { DiscordCommand, DiscordEvent } from './types/discord.d';

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

const eventsFiles: string[] = fs.readdirSync('src/events').filter((file: string) => file.endsWith('.ts'));
adlog('log', 'fs', `Loading ${eventsFiles.length} events...`);

const eventsPromise: Promise<void | DiscordEvent>[] = eventsFiles.map((eventFile: string) =>
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
    adlog('info', 'fs', `Loaded ${client.events.size} events`);
})

// Commands Handler
const commandsFiles: string[] = fs.readdirSync('src/commands').filter((file: string) => file.endsWith('.ts'));
adlog('log', 'fs', `Loadng ${commandsFiles.length} commands...`);

client.commands = new Collection();

const commandsPromise: Promise<void | DiscordCommand>[] = commandsFiles.map((commandFile: string) =>
    import(`./commands/${commandFile}`).then(module => {
        const command: DiscordCommand = module.default ?? module;

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name as string, command);
        } else {
            adlog('error', 'fs', `Missing data in ${commandFile} command`);
        }
    })
)

Promise.all(commandsPromise).then(() => {
    adlog('info', 'fs', `Loaded ${client.commands.size} commands`);
});