import "chainlocker"
import { CallBack } from "chainlocker";
import type {
  IGunInstance,
  IGun,
  ISEAPair,
} from "gun";
declare global {
  interface Window {
    Gun: IGun;
    gun: IGunInstance;
  }
}
export interface IConfig {
  STRIPE_SECRET_KEY: string | undefined;
  STRIPE_CONNECT_CLIENT_ID: string | undefined;
  ISSUER_ID: string | undefined;
  ISSUER_SEED: string | undefined;
  HORIZON_URL: string | "https://horizon-testnet.stellar.org";
  NETWORK_PASSPHRASE: "Public Global Stellar Network ; September 2015" | "Test SDF Network ; September 2015";
  WITHDRAW_ENDPOINT: string | undefined;
  NODE_ENV: "production" | "development"| "test";
  PEER_SOCKET_DOMAIN: string | undefined;
  FRONTEND_DOMAIN: string | undefined;
  INTERFACE_DOMAIN: string | undefined;
  RADATA_PATH: string | undefined;
  ANCHORUSD_ISSUER: "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX" | "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6DOSJBV7STMAQSMTGG"
  APPWRITE_PROJECT_ID: string;
    APPWRITE_ENDPOINT: string 
  
}

export interface LoaderContext {
  (): Promise<{
    authorizedDB(): {
      gun: IGunInstance<any>;
      MasterKeys: ISEAPair;
      MasterVault(): {
        locker(args: string[]): {
          value(cb?: CallBack | undefined): Promise<Record<string, any>>;
          put(data: string | Record<string, any> | undefined, cb?: CallBack | undefined): Promise<void>
        }
      }
    };

  }>;
}
