import { server } from './sdk';

export default async function getBalance(address:string) {
  if (typeof address !== 'string') {
    return Promise.resolve(0)
  }

  const account = await server.loadAccount(address);
  return account.balances;
};
