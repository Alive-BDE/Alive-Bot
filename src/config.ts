import dotenv from 'dotenv';

import { m } from './functions/functions'
import { GatewayIntentBits } from 'discord.js';

dotenv.config();

const { TOKEN } = process.env;

if (!TOKEN) {
    throw new Error('Missing environment variables');
}

export default class Config {
    static token: string | undefined = TOKEN;

    static clientId: string = '1483204201042677941';
    static guildId: string = '1435971087434252340';

    static timeout: number = m(1);
    static intents: number[] = [GatewayIntentBits.Guilds];
}