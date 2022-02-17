/**
 * 
 * 
{
    category: "Sports",
    type: "multiple",
    difficulty: "hard",
    question: "How many times did Martina Navratilova win the Wimbledon Singles Championship?",
    correct_answer: "Nine",
    incorrect_answers: [
        "Ten",
        "Seven",
        "Eight"
        ]
}
 */

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
    return questions.results.map((q) => ({answers: shuffle([q.correct_answer, ...q.incorrect_answers]), ...q}))
}

export function prepareCategories(categories) {
    return categories.trivia_categories
}

export function getCommands(input) {
    const commands = {}
    for(const arg of input) {
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
            default:
                break
        }
        //console.log(command, value)    
    }
    return commands
} 