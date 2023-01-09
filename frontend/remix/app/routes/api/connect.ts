import { ActionArgs, json } from "@remix-run/node"
import { getConnectToken, getLoginLink } from "@utils/stripe-stellar";
export async function action({ request }: ActionArgs) {
    const body = await request.json()
    if (!body.authCode || body.authCode.length !== 35) {
        return json({ error: 'Invalid input' }, 400);;
    }
    console.info('Processing a new connection');
    try {
        let accountID = await getConnectToken(body.authCode);
        let loginLink = await getLoginLink(accountID);
        console.info('Successfully made connection with reference', accountID);
        return json({ reference: accountID, loginLink }, 200);
    } catch (error) {
        console.error('Failed to connect new user with message:', error);
        return json({ error }, 500);
    };
};