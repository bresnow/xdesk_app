import { IConfig } from "@types";
export const Config: IConfig = {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_CONNECT_CLIENT_ID: process.env.STRIPE_CONNECT_CLIENT_ID,
    ISSUER_ID: process.env.ISSUER_ID,
    ISSUER_SEED: process.env.ISSUER_SEED,
    HORIZON_URL: process.env.HORIZON_URL || "https://horizon-testnet.stellar.org",
    NETWORK_PASSPHRASE: process.env.NODE_ENV === "production" ? "Public Global Stellar Network ; September 2015" : "Test SDF Network ; September 2015",
    WITHDRAW_ENDPOINT: process.env.WITHDRAW_ENDPOINT,
    PEER_SOCKET_DOMAIN: process.env.PEER_SOCKET_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    INTERFACE_DOMAIN: process.env.INTERFACE_DOMAIN,
    RADATA_PATH: process.env.RADATA_PATH,
    NODE_ENV: process.env.NODE_ENV || "development",
    ANCHORUSD_ISSUER: process.env.NODE_ENV === "production" ? "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX" : "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6DOSJBV7STMAQSMTGG",
    APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT || 'https://appwrite.fltngmmth.com/v1',
    APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID || '63be8d50cad7add6683d' 
};

