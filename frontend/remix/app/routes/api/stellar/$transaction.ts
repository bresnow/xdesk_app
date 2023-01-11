import { ActionArgs, json } from "@remix-run/node"
import { adminPair, OperationType, StellarSdk, stellarServer } from '@stellar';
import { FormEntry } from "@utils/index";


export const parsify = (object: any) => JSON.parse(JSON.stringify(object))
export async function action({ request, params }: ActionArgs) {
    let issuerKeys = adminPair()
    let operation = params.transaction as OperationType
    const operationBuilder = StellarSdk.Operation[operation]
    if (!operationBuilder) {
        return `Unknown operation type: ${operation}`
    };
    // Transaction will hold a built transaction we can resubmit if the result is unknown.

    let {_submit,...options} = await FormEntry(request)
 
    let sourceAccount = await stellarServer.loadAccount(issuerKeys.publicKey())
    const op = operationBuilder(options as never)
    // Start building the transaction.
    let transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
    })
        .addOperation(op)
        .build()
    transaction.sign(issuerKeys); // sign the transaction
    try {
        await stellarServer.submitTransaction(transaction);
        return json({ success: true }, 200);
    } catch (e) {
        return json({ error: JSON.stringify(e) }, 400)
    };

};
