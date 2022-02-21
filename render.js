import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { sleep } from './functions.js'
import he from 'he'

export function showError(msg) {
    console.log(chalk.red(msg))
}

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

export function noQuestionsLoaded() {
    console.log(`${chalk.redBright('No questions available! Exiting...')}`)
    process.exit(1)
}

export function endScreen() {
    figlet('G G !!!', async function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        const rainbowTitle = chalkAnimation.rainbow(
            data
        )
        await sleep(5000)
        rainbowTitle.stop()
    });
}

export function showAnswer(q) {
    if (q.isCorrect) {
        const msg = `\n\n${he.decode(q.question)}\n${chalk.blueBright(he.decode(q.playerAnswer))} is the ${chalk.greenBright('correct')} answer!`
        console.log(msg)
    } else {
        const msg = `\n\n${he.decode(q.question)}\n${chalk.blueBright(he.decode(q.playerAnswer))} is the ${chalk.redBright('wrong')} answer!\nCorrect is: ${chalk.yellowBright(he.decode(q.correct_answer))}`
        console.log(msg)
    }
}

export function showAnsewrsByType(t) {
    const easy = `${chalk.greenBright('Easy:')} ${t.easy.correct}/${t.easy.total} ${chalk.grey(`(${Math.round((t.easy.correct / t.easy.total) * 100).toFixed(1)}%)`)}`
    const medium = `${chalk.yellowBright('Medium:')} ${t.medium.correct}/${t.medium.total} ${chalk.grey(`(${Math.round((t.medium.correct / t.medium.total) * 100).toFixed(1)}%)`)}`
    const hard = `${chalk.redBright('Hard:')} ${t.hard.correct}/${t.hard.total} ${chalk.grey(`(${Math.round((t.hard.correct / t.hard.total) * 100).toFixed(1)}%)`)}`
    const total = `${chalk.blueBright('Total:')} ${t.total.correct}/${t.total.total} ${chalk.grey(`(${Math.round((t.total.correct / t.total.total) * 100).toFixed(1)}%)`)}`
    console.log(`\n${easy}`)
    console.log(`${medium}`)
    console.log(`${hard}`)
    console.log(`${total}\n`)
}

export function help() {
    const helpMsg = `
${chalk.blueBright('Usage:')}

    npx quizgame-cli [option]=[value] [option2]=[value2] ... [optionN]=[valueN]

    ${chalk.greenBright('Example:')} npx quizgame-cli -c=sport -a=20 -d=medium

${chalk.blueBright('Options:')}

    ${chalk.yellowBright('-h, --help, ?')}

    Shows this help screen. No value required.

    ${chalk.yellowBright('-a, --amount')}    

    Sets the amount of questions. Defaults to '10'.
    ${chalk.greenBright('Example:')}: -a=15, --amount=3

    ${chalk.yellowBright('-d, --difficulty')}

    Sets the questions difficulty. Possible values: 'easy', 'medium', 'hard'. If not passed, loads questions with random difficulties.
    ${chalk.greenBright('Example:')}: -d=easy, --difficulty=medium

    ${chalk.yellowBright('-c, --category')}

    Sets the questions category. If not passed, or category does not exist, loads questions from random categories.
    ${chalk.greenBright('Example:')}: -c=sport, --category=math

${chalk.redBright('Note:')} Incorrect options and values will not trigger errors and the default values will be used instead.

${chalk.magentaBright('Have a nice game!')}
`
    console.log(helpMsg)
}