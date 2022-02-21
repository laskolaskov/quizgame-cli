import he from 'he'
import chalk from 'chalk'
import { noQuestionsLoaded, showAnsewrsByType, showAnswer } from "./render.js";

export const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t))


export function shuffle(arr) {
    let i = arr.length, j, temp;
    while (--i) {
        j = Math.floor(Math.random() * (i));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
}

export function prepareQuestions(questions) {
    if (questions.results.length === 0) {
        noQuestionsLoaded()
    }
    return questions.results.map((q) => ({ answers: shuffle([q.correct_answer, ...q.incorrect_answers]), ...q }))
}

export function prepareCategories(categories) {
    return categories.trivia_categories
}

export function getCommands(input) {
    const commands = {}
    for (const arg of input) {
        const [command, value] = arg.split('=')
        switch (command) {
            case '--category':
            case '-c':
                commands.category = value
                break
            case '--amount':
            case '-a':
                commands.amount = value
                break
            case '--difficulty':
            case '-d':
                commands.difficulty = value
                break
            case '-h':
            case '--help':
            case '?':
                commands.help = true
            default:
                break
        }
    }
    return commands
}

export function score(questions) {
    const answersByType = {
        easy: {
            correct: 0,
            total: 0
        },
        medium: {
            correct: 0,
            total: 0
        },
        hard: {
            correct: 0,
            total: 0
        },
        total: {
            correct: 0,
            total: 0
        }
    }
    for (let q of questions) {
        answersByType[q.difficulty].total++
        answersByType.total.total++
        if(q.isCorrect) {
            answersByType[q.difficulty].correct++
            answersByType.total.correct++
        }
        showAnswer(q)
    }
    showAnsewrsByType(answersByType)
    return answersByType
}

export function ask(type, name, message, defaultVal = null, choices = [], other) {
    const answer = {
        type,
        name,
        message,
        default: function () {
            return typeof defaultVal === 'function' ? defaultVal() : defaultVal
        },
        choices,
        ...other
    }
    return answer
}

export function askQuestion(q, i) {
    return ask(
        'list',
        `${i}`,
        `${he.decode(q.question)} ${chalk.gray(`(${he.decode(q.difficulty)} / ${he.decode(q.category)}) \n`)}`,
        null,
        q.answers.map(e => he.decode(e))
    )
}

export function checkAnswers(q, a) {
    const answered = []
    for (let [key, value] of Object.entries(a)) {
        if (he.decode(q[key].correct_answer) === he.decode(value)) {
            answered.push({...q[key], isCorrect: true, playerAnswer: value })
        } else {
            answered.push({ ...q[key], isCorrect: false, playerAnswer: value })
        }
    }
    return answered
}