import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { sleep } from './functions.js'

export async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        '\n\nWelcome to the BEST Quiz Game !!! \n'
    )
    await sleep(2000)
    rainbowTitle.stop()
    console.log(`${chalk.grey('Thanks to https://opentdb.com/ for the questions.')}\n`)
}

export async function gameStart() {
    const spinner = createSpinner().start()
    spinner.update({
        frames: [`Game starting in ${chalk.blueBright('1')}`, `Game starting in ${chalk.blueBright('3')}`, `Game starting in ${chalk.blueBright('2')}`],
        interval: 1000,
    })
    await sleep(3000)
    spinner.success({ text: 'Start!\n' })
}