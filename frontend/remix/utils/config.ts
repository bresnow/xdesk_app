import { IConfig } from "@types";
export const Config: IConfig = {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_CONNECT_CLIENT_ID: process.env.STRIPE_CONNECT_CLIENT_ID,
    ISSUER_ID: process.env.ISSUER_ID,
    ISSUER_SEED: process.env.ISSUER_SEED,
    HORIZON_URL: process.env.HORIZON_URL,
    NETWORK_PASSPHRASE: process.env.NETWORK_PASSPHRASE,
    WITHDRAW_ENDPOINT: process.env.WITHDRAW_ENDPOINT,
    PEER_SOCKET_DOMAIN: process.env.PEER_SOCKET_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    INTERFACE_DOMAIN: process.env.INTERFACE_DOMAIN,
    RADATA_PATH: process.env.RADATA_PATH,
    NODE_ENV: process.env.NODE_ENV 
};

for (const variable in Config) {
    if (process.env[variable] === undefined) {
        throw new Error(`Unset config variable ${variable}`);
    }
}