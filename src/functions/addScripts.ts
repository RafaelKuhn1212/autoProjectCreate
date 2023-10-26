import fs from "fs";
import chalk from 'ansi-colors';
import path from "path";

export default function addScripts(scripts: {
    name: string;
    command: string;
}[],name:string) {

    const packageJson = JSON.parse(fs.readFileSync(path.join(process.env.autoProjectsPath as string,name, 'package.json')).toString())
    packageJson.scripts = {}
    scripts.forEach(script => {
        if(script.name != undefined && script.command != undefined)
        packageJson.scripts[script.name] = script.command
    })
    fs.writeFileSync(path.join(process.env.autoProjectsPath as string,name, 'package.json'), JSON.stringify(packageJson, null, 2))
    console.log(chalk.green(`Scripts added`))

}