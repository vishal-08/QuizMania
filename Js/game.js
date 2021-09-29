const questionEl = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName("choice-text"))
const questionNumber = document.getElementById("question-number")
const scoreDisplay = document.getElementById("score-display")
const progressBar = document.getElementById("progress-bar-full")
const game = document.getElementById("game")
const loader = document.getElementById("loader")


let currentQuestion = {}
let acceptingAnswer = false
let score = 0
let questionCounter =  0
let avaialableQuestions=[]

let questions = []

fetch("https://opentdb.com/api.php?amount=50&difficulty=medium&type=multiple")
    .then(res =>{
        return res.json();
    })

    .then(loadedQuestions => {
        console.log(loadedQuestions.results)
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question : loadedQuestion.question
            }

            const answerChoices = [ ... loadedQuestion.incorrect_answers]
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1
            //choices updated
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer)

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })
            return formattedQuestion
        })
        // questions = loadedQuestions
         startQuiz()
    })

const correctBonus = 10;
const maxQuestion = 5;

startQuiz = () => {
    questionCounter = 0
    score = 0
    avaialableQuestions = [ ... questions];
    //console.log(avaialableQuestions)
    getNewQuestion()
    game.classList.remove("hidden")
    loader.classList.add("hidden")
}

getNewQuestion = () => {
    if(avaialableQuestions === 0 || questionCounter >= maxQuestion)
    {
        localStorage.setItem("latestScore", score)
        return window.location.assign("../Html/endpage.html")
    }

    questionCounter++
    
    questionNumber.textContent = `Question ${questionCounter}/${maxQuestion}`
    
    progressBar.style.width = `${(questionCounter/maxQuestion) * 100}%`
    
    const questionIndex = Math.floor(Math.random() * avaialableQuestions.length)    
    currentQuestion = avaialableQuestions[questionIndex]
   // console.log(currentQuestion)
    questionEl.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    avaialableQuestions.splice(questionIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswer) return
        
        acceptingAnswer =false
        let selectedChoice = e.target
        let selectedAnswer = selectedChoice.dataset["number"]

        let correctIncorrect = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
        if(correctIncorrect === "correct"){
            incrementScore(correctBonus)
        }
        

        selectedChoice.parentElement.classList.add(correctIncorrect)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(correctIncorrect)
            getNewQuestion()
        },1000)
    })
})


incrementScore = (num) =>{
    score += num
    scoreDisplay.textContent = score
}
