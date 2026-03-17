import { ActivityType, Client, GuildScheduledEvent } from 'discord.js';
import moment from 'moment';

import { months } from '../functions/functions';

module.exports = {
    name: 'guildScheduledEventDelete',
    once: false,

    async execute(oldEvent: GuildScheduledEvent, client: Client<true>) {
        const events = await oldEvent.guild!.scheduledEvents.fetch();
        const event = events.sort((a, b) => a.scheduledStartTimestamp! - b.scheduledStartTimestamp!).first();

        client.user.setPresence({
            status: 'online',
            activities: [{
                name: event ? `${event.name} le ${moment(event.scheduledStartTimestamp).date()} ${months[moment(event.scheduledStartTimestamp).month()]}` : 'Prépare la prochaine soirée',
                type: ActivityType.Custom
            }]
        })
    }
}