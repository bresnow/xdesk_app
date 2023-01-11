import { Config } from '@utils/config';
import * as sdk from 'stellar-sdk';
let Network:sdk.Networks
if(Config.NODE_ENV === 'production') {
  Network = sdk.Networks.PUBLIC;
} else {
  Network = sdk.Networks.TESTNET;
}
const server = new sdk.Server(Config.HORIZON_URL)

export { sdk, server, Network }
