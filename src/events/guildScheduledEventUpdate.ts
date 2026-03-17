import { ActivityType, Client, GuildScheduledEvent } from 'discord.js';
import moment from 'moment';

import { months } from '../functions/functions';

module.exports = {
    name: 'guildScheduledEventUpdate',
    once: false,

    async execute(oldEvent: GuildScheduledEvent, newEvent: GuildScheduledEvent, client: Client<true>) {
        const events = await newEvent.guild!.scheduledEvents.fetch();
        const next = events.sort((a, b) => a.scheduledStartTimestamp! - b.scheduledStartTimestamp!).first();

        if (newEvent.id === next!.id) {
            client.user.setPresence({
                status: 'online',
                activities: [{
                    name: `${newEvent.name} le ${moment(newEvent.scheduledStartTimestamp).date()} ${months[moment(newEvent.scheduledStartTimestamp).month()]}`,
                    type: ActivityType.Custom
                }]
            })
        }
    }
}