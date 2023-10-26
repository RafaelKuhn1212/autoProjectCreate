import 'dotenv/config'
import chalk from 'ansi-colors';
import select from '@inquirer/select';
import getAvailableLayout from "./functions/getAvailableLayout";
import copyLayout from './functions/copyLayout';
import initProject from './functions/initProject';
import installDependencies from './functions/installDependencies';
import addScripts from './functions/addScripts';
import path from 'path';
import openVscode from './functions/openVscode';

async function main() {

    const fileName = process.argv[2]

    const selectedLayout = await select({
        message: 'Select a layout',
        choices: getAvailableLayout()
    });
    console.log(chalk.green(`Selected layout: ${selectedLayout.name}`))
    const pathFile = copyLayout(selectedLayout.name,fileName)
    console.log(chalk.green(`Layout copied to ${pathFile}`))
    initProject(fileName)
    if(selectedLayout.info.dependencies){
      const packageJson = require(path.join(process.env.autoProjectsPath as string,fileName, 'package.json'))

      if(packageJson.dependencies){

      Object.getOwnPropertyNames(packageJson.dependencies).forEach(dependency => {
        
        if(selectedLayout.info.dependencies.indexOf(dependency) != -1){
          console.log(chalk.green(`Removing ${dependency} from dependencies...`))
          delete selectedLayout.info.dependencies[selectedLayout.info.dependencies.indexOf(dependency)]
        }

      })

      }

      console.log(chalk.green(`Installing dependencies...`))
      installDependencies(selectedLayout.info.dependencies,fileName)
    }
    if(selectedLayout.info.scripts){
      console.log(chalk.green(`Adding scripts...`))
      addScripts(selectedLayout.info.scripts,fileName)
    }
    console.log(chalk.green(`Done!`))
    openVscode(pathFile)
}

main()