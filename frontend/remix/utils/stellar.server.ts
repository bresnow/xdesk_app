import StellarSdkLibrary from 'stellar-sdk';

import { Config } from './config';

if (Config.ENV === 'production') {
    StellarSdkLibrary.Networks.PUBLIC;
} else {
    StellarSdkLibrary.Networks.TESTNET;
}

export const stellarServer = new StellarSdkLibrary.Server(Config.HORIZON_URL);
export const StellarSdk = StellarSdkLibrary;