import fs from "fs";
//@ts-expect-error
import yml from "js-yaml";
import path from "path"
import { Config } from "./index";

export function yamlData() {
    try {
        var filename = path.resolve(path.join("..", "remix", "utils", "config", 'amnion_config.yml')),
            contents = fs.readFileSync(filename, 'utf8'),
            data = yml.load(contents);
        let str = Config.FRONTEND_DOMAIN ? JSON.stringify(data).replace(/{{ Config\.FRONTEND_DOMAIN }}/g, Config.FRONTEND_DOMAIN) : JSON.stringify(data);;
        return JSON.parse(str);
    } catch (err) {
        console.log((err as any).stack || String(err));
        throw new Error((err as any).stack || String(err))
    }
}
