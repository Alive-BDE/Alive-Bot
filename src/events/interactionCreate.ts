import { Interaction, InteractionType, ApplicationCommandType, Client } from 'discord.js';

import { adlog } from '../functions/functions';

module.exports = {
    name: 'interactionCreate',
    once: false,

    async execute(interaction: Interaction, client: Client) {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand:
                switch (interaction.commandType) {
                    case ApplicationCommandType.ChatInput:
                        try {
                            const chatInputHandler = await import('./interactions/commands/chatInput');
                            (chatInputHandler.default ?? chatInputHandler).execute(interaction, client);
                        } catch (error: any) {
                            adlog('error', 'discord', error);
                        }
                        break;

                    default:
                        adlog('warn', 'discord', `Unhandled interaction command type : ${interaction.commandType}`);
                        break;
                }
                break;

            default:
                adlog('warn', 'discord', `Unhandled interaction type : ${interaction.type}`);
                break;
        }
    }
}