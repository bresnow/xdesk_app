import Docker from "dockerode";
import process from "process";
import {  chalk} from "zx";
let { red, green, blue, yellow } = chalk, SERVICE_ID= process.env.SERVICE_ID;
const docker = new Docker({ host: "socket-proxy" ,port: 8000 }) // DEPLOY SOCKET PROXY 
export const updateService = (optionalServiceName) => {
        docker.listServices({}
            , (err, services) => {
                services?.forEach(async service => {
                    if (service.Spec.Name=== "amnion_amnion_development"){
                        let initSvc = service
                        const { Spec, ID } = initSvc;
                        const _service = docker.getService(ID);
                        try {
                            await _service.remove(ID)
                            let success = await docker.createService({ ...Spec })
                            console.log(green('successful redeployment of ' + Spec.Name), yellow(success.id))
                        } catch (e) {
                            console.log(red(e))
                        }

                    }
                })
            })
}

// let containers = docker.listContainers({})
// console.log(await containers);