import Stripe from 'stripe';
import { Config } from './config';
if (!Config.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe Secret Key")
}
export const stripe = new Stripe(Config.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })
