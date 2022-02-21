import fetch from "node-fetch"
import { createSpinner } from "nanospinner"
import chalk from "chalk"
import { showError } from "./render.js"

const base = 'https://opentdb.com/'

export async function getQuestions(categories, commands = {}) {
    let url = `${base}api.php?type=multiple`

    const defaultAmount = 10
    const params = {
        amount: defaultAmount,
        ...commands
    }

    //basic validation
    for (let [key, value] of Object.entries(params)) {
        if (key === 'category') {
            for (let i in categories) {
                if (categories[i].name.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                    url += `&${key}=${categories[i].id}`
                    break
                }
            }
        }
        else if (key === 'difficulty') {
            if (['easy', 'medium', 'hard'].includes(value)) {
                url += `&${key}=${value}`
            }
        }
        else if (key === 'amount') {
            if (parseInt(value) && parseInt(value) > 0) {
                url += `&${key}=${value}`
            } else {
                url += `&${key}=${defaultAmount}`
            }
        }
    }

    const spinner = createSpinner('Loading questions...').start()

    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`)
        }
        spinner.success({ text: 'Questions loaded!' })
        return await res.json()
    } catch (e) {
        spinner.error({ text: `${chalk.redBright('Error while loading questions!')}`})
        showError(e.message)
        process.exit(1)
    }
}

export async function getCategories() {

    let url = `${base}api_category.php`
    const spinner = createSpinner('Loading categories...').start()

    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`)
        }
        spinner.success({ text: 'Categories loaded!' })
        return await res.json()
    } catch (e) {
        spinner.error({ text: `${chalk.redBright('Error while loading categories!')}`})
        showError(e.message)
        process.exit(1)
    }
}