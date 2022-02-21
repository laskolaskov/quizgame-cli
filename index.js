#!/usr/bin/env node

import inquirer from 'inquirer'
import { getCategories, getQuestions } from './api.js'
import { askQuestion, checkAnswers, getCommands, prepareCategories, prepareQuestions, score } from './functions.js'
import { welcome, gameStart, showError, endScreen, help } from './render.js'

try {
    const commands = getCommands(process.argv.slice(2))

    //if asking for help, show the help screen and exit early
    if(commands.help) {
        help()
        process.exit(0)
    }

    await welcome()

    const categories = prepareCategories(await getCategories())
    const questions = prepareQuestions(await getQuestions(categories, commands))

    await gameStart()

    const answers = await inquirer.prompt(questions.map((q, i) => askQuestion(q, i)))

    score(checkAnswers(questions, answers))
    endScreen()
} catch (e) {
    showError(e.message)
    process.exit(1)
}