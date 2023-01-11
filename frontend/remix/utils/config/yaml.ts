import fs from "fs";
//@ts-expect-error
import yml from "js-yaml";
import path from "path"
import util from "util"

export function yamlData() {
    try {
        var filename = path.resolve(path.join("..","remix","utils", "config", 'app-config.yml')),
            contents = fs.readFileSync(filename, 'utf8'),
            data = yml.load(contents);
        return data
    } catch (err) {
        console.log((err as any).stack || String(err));
        throw new Error((err as any).stack || String(err))
    }
}
