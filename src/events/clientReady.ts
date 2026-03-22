import { ActivityType, Client, REST, Routes } from 'discord.js';
import moment from 'moment';

import Config from '../config';

import { adlog, months } from '../functions/functions';

module.exports = {
    name: 'clientReady',
    once: true,

    async execute(client: Client<true>) {
        adlog('info', 'discord', `Connected to ${client.user.tag}`);

        // Setting presence
        const server = await client.guilds.fetch(Config.guildId);
        const events = await server.scheduledEvents.fetch();
        const event = events.sort((a, b) => a.scheduledStartTimestamp! - b.scheduledStartTimestamp!).first();

        client.user.setPresence({
            status: 'online',
            activities: [{
                name: event ? `${event.name} le ${moment(event.scheduledStartTimestamp).date()} ${months[moment(event.scheduledStartTimestamp).month()]}` : 'Prépare la prochaine soirée',
                type: ActivityType.Custom
            }]
        })

        // Commands Registering
        adlog('log', 'discord', `Registering ${client.commands.size} commands...`);

        const rest = new REST({ version: '10' }).setToken(Config.token);
        try {
            const data = await rest.put(Routes.applicationCommands(Config.clientId), {
                body: client.commands.map(command => command.data.toJSON())
            }) as any[];
            adlog('info', 'discord', `Registered ${data.length} commands`);
        } catch (error: any) {
            adlog('error', 'discord', error);
        }
    }
}