import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { LoaderContext } from '@types';
import { GunUser, ISEAPair } from 'gun/types';
import Gun from 'gun';
import { Config } from './config';

let sessionSecret = Config.STRIPE_SECRET_KEY;
if (typeof sessionSecret !== 'string') {
  throw new Error('SESSION_SECRET must be set');
}

const SEA = Gun.SEA;
export let { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'Authorization Session',
      secure: true,
      secrets: [sessionSecret],
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

export default class Auth {
  loaderContext: LoaderContext
  request: Request
  constructor({ context, request }: { context: unknown; request: Request }) {
    let loaderContext = context as unknown as LoaderContext;
    this.loaderContext = loaderContext;
    this.request = request;
  }
  async gun() {
    let { authorizedDB } = await this.loaderContext();
    let { gun } = authorizedDB();
    return gun
  }
  aliasAvailable(alias: string) {
    return new Promise(async (resolve) => {
      let gun = await this.gun()
      gun.get(`~@${alias}`).once((exists) => {
        if (exists) {
          resolve(false);
        }
        resolve(true);
      });
    });
  };

  async keypair() {
    let session = await getSession();
    if (!session.get('key_pair')) {
      session.set('key_pair', JSON.stringify(await SEA.pair()));
    }
    return { pair: JSON.parse(session.get('key_pair')) };
  }
  /**
     * 
   create user with alias and password then authenticate.
     */
  createUser(alias: string, password: string) {
    return new Promise(async (resolve, reject) => {
      let gun = await this.gun()
      gun.user().create(alias, password, async (ack) => {
        if (ack && !(ack as any).err) {
          resolve(ack);
        } else {
          let err = (ack as any).err as string;
          reject(err);
        }
      })
    }
    );
  }

  async logout() {
    const session = await getSession(this.request.headers.get('Cookie'));
    return redirect(this.request.headers.get('Referer') ?? '/', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  }
  /**
 * authenticate with username and password
 * If alias is available it automaticatically creates a new user... likewise reasoning for login
 */
  async credentials(alias: string, password: string) {
    let session = await getSession();
    if (await this.aliasAvailable(alias)) {
      try {
        await this.createUser(alias, password);
      } catch (error) {
        return { error };
      }
    }
    let gun = await this.gun()
    return new Promise((res, rej) => {
      gun.user().auth(alias, password, (ack) => {
        if (Object.getOwnPropertyNames(ack).includes('sea')) {
          let sea = (ack as any).sea as ISEAPair;
          let userInfo = (ack as any).put as GunUser;
          session.set(`user_info`, userInfo);
          session.set(`key_pair`, sea);
          res({ userInfo, keypair: sea })
        }
        if ((ack as any).err) {
          let err = (ack as any).err as string;
          console.error(err);
          rej(err)
        }
      })
    })
  }
}




