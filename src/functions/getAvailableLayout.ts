import fs from 'fs';
import path, { extname } from 'path';
import IinfoJson from '../interfaces/IinfoJson';
export default function getAvailableLayout() {
    return fs.readdirSync(process.env.layoutsPath as string).map(file => {
        const fileName = path.basename(file, extname(file));
        
        const contents = fs.readdirSync(path.join(process.env.layoutsPath as string, file), 'utf8')

        if(contents.indexOf('info.json') === -1) {
            throw new Error(`Layout ${fileName} does not have an info.json file`)
        }

        let info = fs.readFileSync(path.join(process.env.layoutsPath as string, file, 'info.json'), 'utf8')
        const description = JSON.parse(info).description;

        if(description === undefined) {
            throw new Error(`Layout ${fileName} does not have a description in its info.json file`)
        }
        
        return {
            name: fileName,
            description: description,
            value: {
                name: fileName,
                description: description,
                info: JSON.parse(info)
            }
        }
    })

}