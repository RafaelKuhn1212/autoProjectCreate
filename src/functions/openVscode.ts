import { execFileSync } from "child_process"
import chalk from 'ansi-colors';

export default function openVscode(path: string) {
    execFileSync(`code`,[path])
    console.log(chalk.green(`Opened vscode`))
}