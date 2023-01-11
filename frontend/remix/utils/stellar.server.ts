import * as StellarSdk from 'stellar-sdk';
import axios from 'redaxios';
import { Config } from './config';
import invariant from '@remix-run/react/dist/invariant.js';
export type OperationType =
    | "createAccount"
    | "payment"
    | "pathPaymentStrictReceive"
    | "pathPaymentStrictSend"
    | "createPassiveSellOffer"
    | "manageSellOffer"
    | "manageBuyOffer"
    | "setOptions"
    | "changeTrust"
    | "allowTrust"
    | "accountMerge"
    | "inflation"
    | "manageData"
    | "bumpSequence"
    | "createClaimableBalance"
    | "claimClaimableBalance"
    | "beginSponsoringFutureReserves"
    | "revokeAccountSponsorship"
    | "revokeTrustlineSponsorship"
    | "revokeOfferSponsorship"
    | "revokeDataSponsorship"
    | "revokeClaimableBalanceSponsorship"
    | "revokeLiquidityPoolSponsorship"
    | "revokeSignerSponsorship"
    | "clawback"
    | "clawbackClaimableBalance"
    | "setTrustLineFlags"
    | "liquidityPoolDeposit"
    | "liquidityPoolWithdraw"

let Network: StellarSdk.Networks
if (Config.NODE_ENV === 'production') {
  Network = StellarSdk.Networks.PUBLIC;
} else {
  Network = StellarSdk.Networks.TESTNET;
}
const stellarServer = new StellarSdk.Server(Config.HORIZON_URL)

function adminPair() {
  invariant(Config.ISSUER_SEED, "Set the ISSUER_SEED environment variable")
  return StellarSdk.Keypair.fromSecret(Config.ISSUER_SEED)
}
const createAccount = () => {
  // Creamos nuestro par de llaves
  const pair = StellarSdk.Keypair.random();
  const secret = pair.secret();
  const publicKey = pair.publicKey();

  return {
    secret,
    publicKey
  };
};

const buddybot = async (publicKey: string) => {
  const { data: responseJSON } = await axios.get(
    `https://friendbot.stellar.org?addr=${publicKey}`
  );
  return responseJSON;
};

function createAsset(assetCode: string) {
  const issuer = adminPair();
  return new StellarSdk.Asset(assetCode, issuer.publicKey());
}
export type AssetManager_Options = { walletAddr: string, assetCode: string, assetIssuer: string, price: string, quantity: string }

async function assetManager({ walletAddr, assetCode, assetIssuer, price, quantity }: AssetManager_Options) {
  const { TransactionBuilder,  BASE_FEE, Operation, Asset, Account } = StellarSdk;
  // Order book check if an asset is available on the exchange
  var buyingAsset = createAsset(assetCode);
  var sellingAsset = Asset.native();
  let orderbook = stellarServer.orderbook(sellingAsset, buyingAsset).call();
  var bids = (await orderbook).bids;
  var orderFill = false;
  /**
   * @description Checks if bids have been placed on the exchange
   */
  if (bids.every(value => value !== undefined)) {
    throw { message: "No bids exist for this particular HashedTag. Just remember, price does not equal value." };
  } else {
    for (let bid in bids) {
      var bidPrice = bids[bid].price;
      // Check to see if the price and amount are a direct match
      if (bidPrice === price) {
        orderFill = true;
        break;
      }
    }
  };
  // Checking the interger value of the quantity
  var remainder = parseInt(quantity) % 1
  if (remainder !== 0) {
    throw { message: 'Amount must be an integer value i.e. 1 or 3 etc.' };
  } else if (parseInt(quantity) < 1) {
    throw { message: 'Please enter a number that is greater than one' };
  }

  // Pulling in royalty values from the issuing account. 
  // Requires a standard convention to be implemented i.e. royalty_{$amount}% 

  var operations: StellarSdk.xdr.Operation<StellarSdk.Operation.Payment>[];
  var count = 0;
  fetch(`${Config.HORIZON_URL}/accounts/${assetIssuer}`)
    .then((res) => {
      if (res.ok)
        return res.json()
      throw res
    })
    .then((issuer) => {
      var data = issuer.data
      if (data != '' || data !== undefined) {
        for (let royalties in data) {
          var value = parseInt(royalties.split("_")[1].split("%")[0]); //requires that data is inputed in a royalty_x% format
          value = value / 100;
          var royaltyValue = value * parseInt(price);
          var amount = parseFloat(royaltyValue.toString()).toFixed(7);

          var buff = Buffer.from(data[royalties], 'base64');
          var royaltyDestination = buff.toString();

          operations[count] = Operation.payment({
            destination: royaltyDestination,
            asset: Asset.native(),
            amount: amount
          })
          count++;

        }
      }
    })

  return fetch(`${Config.HORIZON_URL}/accounts/${walletAddr}`)
    .then((res) => {
      if (res.ok)
        return res.json()
      throw res
    })

    .then((account) => {
      var transaction = new TransactionBuilder(
        new Account(account.id, account.sequence),
        {
          fee: BASE_FEE,
          networkPassphrase: Network,
        }
      )

      // Only adds the payments of the royalties based on the payment information stored in
      // the issuing account and only if there are bids that satisfy the purchasing price.
      if (orderFill) {
        // Add the royalty payments to the transaction
        for (let i = 0; i < operations.length; i++) {
          transaction.addOperation(operations[i]);
        }

      }
      transaction.addOperation(StellarSdk.Operation.manageBuyOffer({
        selling: sellingAsset,
        buying: buyingAsset,
        buyAmount: quantity,
        price: price
      }))
        .setTimeout(0)
        .build()
        .toXDR()
    }

    )
}
export { createAccount, buddybot, adminPair, assetManager };

export { StellarSdk, stellarServer };