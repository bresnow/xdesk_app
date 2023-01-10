import { ActionArgs, json } from "@remix-run/node"
import { buddybot, createAccount, StellarSdk, stellarServer } from '@stellar';
import { Config } from "@utils/config";
import { FormEntry } from "@utils/index";
export type OperationType = | "createAccount"
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
    | "liquidityPoolWithdraw" | "loadAccountBalance"
export async function action({ request, params }: ActionArgs) {
    if (!Config.ISSUER_ID || !Config.ISSUER_SEED) {
        throw new Error("Issuer needs to configure Stellar account ID and seed before using this action. Technically this application should not be running. Check the issuer's toml file and always do your due diligence.")
    }
    let operation = params.transaction as OperationType
    if (operation === "createAccount") {
        let result, data;
        let { publicKey, secret } = createAccount()
        try {
            if (Config.NETWORK_PASSPHRASE === "Test SDF Network ; September 2015") {
                data = await buddybot(publicKey)
            }
            result = { publicKey, secret, ...data };
            return json({ status: "OK", ...result })
        } catch (error) {
            return json({ status: "ERROR", error })
        }
    }

    let { accountID, secret, ..._options } = await FormEntry<{ accountID: string; secret: string }>(request)
    if (operation === "loadAccountBalance") {
        try {
            let result = await stellarServer.loadAccount(accountID)
            return json({ status: "OK", ...result })
        } catch (error) {
            return json({ status: "ERROR", error })
        }
    }

    const operationBuilder = StellarSdk.Operation[operation]
    if (!operationBuilder) {
        return json({ status: "ERROR", error: `Unknown operation type: ${operation}` }, 500)
    }
    let options = JSON.parse(JSON.stringify(_options))
    // Transaction will hold a built transaction we can resubmit if the result is unknown.
    var transaction;
    // First, check to make sure that the destination account exists.
    // You could skip this, but if the account does not exist, you will be charged
    // the transaction fee when the transaction fails.
    try {
        let issuerKeys = StellarSdk.Keypair.fromSecret(Config.ISSUER_SEED)
        let sourceAccount = await stellarServer.loadAccount(issuerKeys.publicKey())
        const operation = operationBuilder(options)

        // Start building the transaction.
        transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(operation)
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(issuerKeys);
        // And finally, send it off to Stellar!
        let response = stellarServer.submitTransaction(transaction)
        return json({ status: "OK", ...response }, 200)
    } catch (error) {
        return json({ status: "ERROR", error: JSON.stringify(error) }, 500)
    }
};