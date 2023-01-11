import { Client, Functions, Account } from 'appwrite';
import { Config } from '../utils/config';

const client = new Client();
const account = new Account(client);
const functions = new Functions(client);
client
    .setEndpoint(Config.APPWRITE_ENDPOINT)
    .setProject(Config.APPWRITE_PROJECT_ID);

export { client, account, functions }