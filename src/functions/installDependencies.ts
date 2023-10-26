import { execSync } from "child_process"
import chalk from 'ansi-colors';
import path from "path";

export default function installDependencies(dependencies: string[], name: string) {

    dependencies.forEach(dependency => {
        try {
        execSync(`pnpm add ${dependency}`, {
            cwd: path.join(process.env.autoProjectsPath as string, name)
        })
        console.log(chalk.green(`Installed ${dependency}`))
        }catch(e){
        console.log(chalk.red(`Error installing ${dependency}`))
        }
    })

    console.log(chalk.green(`Dependencies installed`))

}
