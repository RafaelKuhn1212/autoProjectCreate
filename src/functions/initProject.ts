import { execSync } from 'child_process';
import path from 'path';
import chalk from 'ansi-colors';
import fs from 'fs';

export default function initProject(name:string): void {

    if(fs.existsSync(path.join(process.env.autoProjectsPath as string,name, 'package.json'))) {
        console.log(chalk.red(`Project already initialized`))
        return
    }
    try {
    execSync('pnpm init', {
        cwd: path.join(process.env.autoProjectsPath as string, name),
    })
    }catch(e){
        console.log(chalk.red(`Error initializing project`))
        return
    }

    console.log(chalk.green(`Project initialized`))
    return

}