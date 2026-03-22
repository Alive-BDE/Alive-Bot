import { Client, ChatInputCommandInteraction } from 'discord.js';

import { DiscordCommand } from '../../../types/discord';

import { adlog } from '../../../functions/functions';

export = {
    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        const command: DiscordCommand | undefined = client.commands.get(interaction.commandName);

        if (!command) throw new Error(`Couldn't resolve the command ${interaction.commandName}`);

        try {
            await command.execute(interaction, client);
        } catch (error: any) {
            adlog('error', 'discord', error);
        }
    }
}