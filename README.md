# Quiz Game for your terminal

## Usage:

```sh
npx quizgame-cli [option]=[value] [option2]=[value2]...[optionN]=[valueN]
```
Example: `npx quizgame-cli -c=sport -a=20 -d=medium`

## Options:

```sh
-h, --help, ?
```

Shows this help screen. No value required.

```sh
-a, --amount
``` 

Sets the amount of questions. Defaults to '10'.  
Example: `-a=15`, `--amount=3`

```sh
-d, --difficulty
```

Sets the questions difficulty. Possible values: 'easy', 'medium', 'hard'. If not passed, loads questions with random difficulties.  
Example: `-d=easy`, `--difficulty=medium`

```sh
-c, --category
```

Sets the questions category. If not passed, or category does not exist, loads questions from random categories.  
Example: `-c=sport`, `--category=math`

## Note: 

Incorrect options and values will not trigger errors and the default values will be used instead.

Have a nice game!