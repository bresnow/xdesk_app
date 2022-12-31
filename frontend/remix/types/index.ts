import "gun/lib/path"
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
export interface LoaderContext {
  (): Promise<{
    authorizedDB(): {
      gun: IGunInstance<any>;
    };
    SECRET_KEY_ARRAY: string[] | [];
  }>;
}
