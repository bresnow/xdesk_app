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
  HORIZON_URL: string | undefined;
  NETWORK_PASSPHRASE: string | undefined;
  WITHDRAW_ENDPOINT: string | undefined;
  NODE_ENV: string | undefined;
  PEER_SOCKET_DOMAIN: string | undefined;
  FRONTEND_DOMAIN: string | undefined;
  INTERFACE_DOMAIN: string | undefined;
  RADATA_PATH: string | undefined;
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
