import "chainlocker"
import type {
  IGunInstance,
  IGun,
} from "gun";
declare global {
  interface Window {
    Gun: IGun;
    gun: IGunInstance;
  }
}
export interface IConfig {
  STRIPE_SECTRET_KEY: string | undefined;
  STRIPE_CONNECT_CLIENT_ID: string | undefined;
  ISSUER_ID: string | undefined;
  ISSUER_SEED: string | undefined;
  HORIZON_URL: string | undefined;
  NETWORK_PASSPHRASE: string | undefined;
  WITHDRAW_ENDPOINT: string | undefined;
  ENV: string | undefined;
}

export interface LoaderContext {
  (): Promise<{
    authorizedDB(): {
      gun: IGunInstance<any>;
    };
    SECRET_KEY_ARRAY: string[] | [];
  }>;
}
