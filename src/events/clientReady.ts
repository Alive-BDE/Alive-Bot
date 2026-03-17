import { ActivityType, Client } from 'discord.js';
import moment from 'moment';

import Config from '../config';

import { adlog } from '../functions/functions';

const months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

module.exports = {
    name: 'clientReady',
    once: true,

    async execute(client: Client<true>) {
        adlog('info', 'discord', `Connected to ${client.user.tag}`);

        const server = await client.guilds.fetch(Config.guildId as string);
        const events = await server.scheduledEvents.fetch();
        const event = events.at(0);

        client.user.setPresence({
            status: 'online',
            activities: [{
                name: event ? `${event.name} le ${moment(event.scheduledStartTimestamp).date()} ${months[moment(event.scheduledStartTimestamp).month()]}` : 'Prépare la prochaine soirée',
                type: ActivityType.Custom
            }]
        })
    }
}