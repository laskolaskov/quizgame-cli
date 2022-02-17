import fetch from "node-fetch"
import { createSpinner } from "nanospinner"

const base = 'https://opentdb.com/'

export async function getQuestions(categories, commands = {}) {
    let url = `${base}api.php?type=multiple`

    const params = {
        amount: 10,
        ...commands
    }

    for (let [key, value] of Object.entries(params)) {
        if(key === 'category') {
            for (let i in categories) {
                if(categories[i].name.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                    url += `&${key}=${categories[i].id}`
                    break
                }
            }
        } else {
            url += `&${key}=${value}`
        }
    }

    try {
        const spinner = createSpinner('Loading questions...').start()
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`)
        }
        spinner.success({ text: 'Questions loaded!'})
        return await res.json()
    } catch (e) {
        spinner.error({ text: 'Error!', mark: ':(' })
        console.error(e)
    }
}

export async function getCategories() {
    let url = `${base}api_category.php`
    try {
        const spinner = createSpinner('Loading categories...').start()
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`)
        }
        spinner.success({ text: 'Categories loaded!'})
        return await res.json()
    } catch (e) {
        spinner.error({ text: 'Error!',  })
        console.error(e)
    }    
}