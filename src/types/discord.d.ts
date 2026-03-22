import { Client, Collection, SlashCommandBuilder } from 'discord.js';

export interface DiscordEvent {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => void | Promise<void>;
}

export interface DiscordCommand {
    data: SlashCommandBuilder;
    execute: (...args: any[]) => void | Promise<void>;
}

declare module 'discord.js' {
    interface Client {
        events: Collection<string, DiscordEvent>
        commands: Collection<string, DiscordCommand>
    }
}