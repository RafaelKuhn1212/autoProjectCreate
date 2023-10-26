import fs from 'fs';
import path from 'path';

export default function copyLayout(layout: string,name: string) {

    try {
        fs.cpSync(path.join(process.env.layoutsPath as string, layout), path.join(process.env.autoProjectsPath as string, name),{
            recursive: true,
        })
        fs.unlinkSync(path.join(process.env.autoProjectsPath as string, name, 'info.json'))
        return path.join(process.env.autoProjectsPath as string, name)
      } catch (error) {
        throw new Error("Error copying layout")
    }
}