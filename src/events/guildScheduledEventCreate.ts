import { ActivityType, Client, GuildScheduledEvent } from 'discord.js';
import moment from 'moment';

import { months } from '../functions/functions';

module.exports = {
    name: 'guildScheduledEventCreate',
    once: false,

    async execute(event: GuildScheduledEvent, client: Client<true>) {
        const events = await event.guild!.scheduledEvents.fetch();
        const nextEvent = events.sort((a, b) => a.scheduledStartTimestamp! - b.scheduledStartTimestamp!).first();

        if (event.id === nextEvent!.id) {
            client.user.setPresence({
                status: 'online',
                activities: [{
                    name: `${event.name} le ${moment(event.scheduledStartTimestamp).date()} ${months[moment(event.scheduledStartTimestamp).month()]}`,
                    type: ActivityType.Custom
                }]
            })
        }
    }
}