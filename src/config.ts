import dotenv from 'dotenv';

import { m } from './functions/functions'
import { GatewayIntentBits } from 'discord.js';

dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!TOKEN || !CLIENT_ID) {
    throw new Error('Missing environment variables');
}

export default class Config {
    static token: string | undefined = TOKEN;

    static clientId: string | undefined = CLIENT_ID;
    static guildId: string | undefined = GUILD_ID;

    static timeout: number = m(1);
    static intents: number[] = [GatewayIntentBits.Guilds];
}