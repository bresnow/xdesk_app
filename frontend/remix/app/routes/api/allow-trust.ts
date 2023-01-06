import { ActionArgs, json } from "@remix-run/node"
import {StellarSdk, stellarServer } from '@stellar';
type AllowTrustBody = { source: string; sourceSeed: string; trustor: string; assetCode: string; limit: string }
export async function action({ request }: ActionArgs) {
    const body:AllowTrustBody = await request.json()
    if (
        !body.source ||
        !body.sourceSeed ||
        !body.trustor ||
        !body.assetCode ||
        !body.limit
    ) {
        return json({error: "Invalid request"});
    }
    console.info(
        'Source:',
        body.source,
        'allowing trust:',
        body.trustor,
        'with asset code:',
        body.assetCode,
        'with a limit:',
        body.limit
    );
    const account = await stellarServer.loadAccount(body.source);
    const asset = new StellarSdk.Asset(body.assetCode, body.trustor);

    const transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(
            StellarSdk.Operation.changeTrust({
                asset,
                limit: body.limit
            })
        )
        .build();

    transaction.sign(StellarSdk.Keypair.fromSecret(body.sourceSeed)); // sign the transaction

    try {
        await stellarServer.submitTransaction(transaction);
        return json({ success: true }, 200);
    } catch (e) {
        return json({error: JSON.stringify(e)},400)
    };
};