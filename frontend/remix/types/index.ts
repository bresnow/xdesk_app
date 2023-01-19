import { TagPreview } from "@ui/kit/components/pagesection/blog/BlogList";
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
export interface AppData {
  amnion_version: string;
  routes: Routes;
}

export interface Routes {
  root: Root;
  index: Index;
}

export interface Index {
  sections: Sections;
}

export interface Sections {
  hero: Hero;
  feature_with_images: Featurewithimages;
  feature_cards: {heading:string, description:string, iconPath:string}[]
  namespace_preview: TagPreview
}

export interface Featurewithimages {
  title: string;
  subtitle: string;
  list: string[];
  links: Links;
  text: string;
  images: Image[]
}

export interface Links {
  [key:string]: Link;
}
export interface Image {
  src: string;
  className?:string;
  width: string;
  alt: string;

}
export interface Link {
  label: string;
  to: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  heading: string;
  image: string;
  text: string;
}

export interface Root {
  meta: Meta;
}

export interface Meta {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  'og:type': string;
  'og:image': string;
  'og:image:width': number;
  'og:image:height': number;
  'og:description': string;
  'og:title': string;
  'og:url': string;
  'og:site_name'?: any;
  'og:locale': string;
  'twitter:card': string;
  'twitter:site': string;
  'twitter:creator': string;
  'twitter:title': string;
  'twitter:description'?: any;
  'twitter:image': string;
  'twitter:image:alt': string;
  'twitter:image:width': number;
  'twitter:image:height': number;
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
