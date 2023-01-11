
export async function FormEntry<Entries extends Record<string,string>>(request: Request):Promise<Entries>  {
    let values = Object.fromEntries(await request.formData());
    let obj: Record<string, string> = {};
    return new Promise((resolve, _reject) => {
        for (const prop in values) {
            let value = values[prop];
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            Object.assign(obj, { [prop]: value.trim() });
        }
        resolve(obj as Entries);
    });
}