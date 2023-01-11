import { ActionArgs, json } from "@remix-run/node"
import { adminPair, OperationType, StellarSdk, stellarServer } from '@stellar';
import { FormEntry } from "@utils/index";


export const parsify = (object: any) => JSON.parse(JSON.stringify(object))
export async function action({ request, params }: ActionArgs) {
    let issuerKeys = adminPair()
    let operation = params.transaction as OperationType
    const operationBuilder = StellarSdk.Operation[operation]
    if (!operationBuilder) {
        return json({ error: `Unknown operation type: ${operation}` }, 500)
    };
    // Transaction will hold a built transaction we can resubmit if the result is unknown.
    var tx:string, options:Record<string,any>;
    try {
        options = await FormEntry(request)
        if (!options && request.headers.get("Content-Type") === "application/json") {
            options = await request.json()
        }
        let sourceAccount = await stellarServer.loadAccount(issuerKeys.publicKey())
        const operation = operationBuilder(options as never)
        // Start building the transaction.
        tx = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(operation)
            .build()
            .toXDR();

        return json(tx, 200)
    } catch (error) {
        return json({ error }, 500)
    }
};
