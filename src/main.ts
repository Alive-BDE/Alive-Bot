import { Client } from 'discord.js';

import Config from './config';

const client = new Client({ intents: [] });

client.login(Config.token);