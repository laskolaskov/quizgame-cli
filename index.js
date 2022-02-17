#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
//import gradient from 'gradient-string'
//import chalkAnimation from 'chalk-animation'
//import figlet from 'figlet'
import he from 'he'
import { getCategories, getQuestions } from './api.js'
import { getCommands, prepareCategories, prepareQuestions, sleep } from './functions.js'
import { welcome, gameStart } from './render.js'

//const ui = new inquirer.ui.BottomBar()
//ui.log.write('test bottom bar')

function ask(type, name, message, defaultVal = null, choices = [], other) {
    const answer = {
        type,
        name,
        message,
        default: function () {
            //console.log(arguments)
            return typeof defaultVal === 'function' ? defaultVal() : defaultVal
        },
        choices,
        ...other
    }
    return answer
}

function askQuestion(q, i) {
    return ask(
        'list',
        `${i}`,
        `${he.decode(q.question)} ${chalk.gray(`(${he.decode(q.difficulty)} / ${he.decode(q.category)}) \n`)}`,
        null,
        q.answers.map(e => he.decode(e))
    )
}

function score(q, a) {
    for (const prop in a) {
        //console.log(`${prop}: ${answers[prop]}`)
        if (he.decode(q[prop].correct_answer) === he.decode(a[prop])) {
            const msg = `\n\n${he.decode(q[prop].question)}\n${chalk.blueBright(he.decode(a[prop]))} is the ${chalk.greenBright('correct')} answer!`
            console.log(msg)
        } else {
            const msg = `\n\n${he.decode(q[prop].question)}\n${chalk.blueBright(he.decode(a[prop]))} is the ${chalk.redBright('wrong')} answer!\nCorrect is: ${chalk.yellowBright(he.decode(q[prop].correct_answer))}`
            console.log(msg)
        }
    }
    console.log(`\nNice ${chalk.inverse('GAME')} bruh !!!`)
}

const commands = getCommands(process.argv.slice(2))

await welcome()

//ui.updateBottomBar('new bottom bar content')

const categories = prepareCategories(await getCategories())
const questions = prepareQuestions(await getQuestions(categories, commands))

await gameStart()

const answers = await inquirer.prompt(questions.map((q, i) => askQuestion(q, i)))

score(questions, answers)

//console.log(categories)
//console.log(questions)
//console.log(answers)