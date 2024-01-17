const gridHtml = document.getElementById("grid")
const btnHtml = document.getElementById("btn")

let divisor = 10
let selectedDifficulty

function customShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array
}

const gameOverHtml = document.getElementById("gameOver")

function generateGrid() {
    gridHtml.innerHTML = ""

    if (selectedDifficulty === "Easy") {
        divisor = 10
    } else if (selectedDifficulty === "Medium") {
        divisor = 9
    } else {
        divisor = 7
    }

    const totalCells = divisor * divisor

    // creates an array with numbers from 1 to totalCells (i copied this from internet)
    const allNumbers = Array.from({ length: totalCells }, (_, i) => i + 1)

    // shuffles the array using customShuffle function
    const shuffledNumbers = customShuffle(allNumbers)

    // chooses the first 16 numbers as bomb positions
    const bombNumbers = shuffledNumbers.slice(0, 16)

    for (let i = 1; i <= totalCells; i++) {
        let box = document.createElement("div")
        box.classList.add("box")
        box.style.width = `calc( 100% / ${divisor})`

        // checks if the current number is a bomb
        if (bombNumbers.includes(i)) {
            box.classList.add("bomb")
        }

        // this numerates the cells 
        box.innerText = i

        // creates the grid
        gridHtml.append(box)

        box.addEventListener("click", function() {

            if (gridHtml.classList.contains("disabled")) {
                return
            }

            this.classList.toggle("active")
            console.log(i)

            // checks if clicked box is a bomb
            if (bombNumbers.includes(i)) {
                console.log("Game Over! You clicked a bomb.")
                revealBombs()
                gameOverHtml.classList.remove("you-lost-none")
                gridHtml.classList.add("disabled")
            }
        })
    }
}

function revealBombs(){
    const bombBoxes = document.querySelectorAll(".bomb")
    bombBoxes.forEach((box)=>{
        box.classList.add("revealed-bomb")
    })
}


const radioButtons = document.querySelectorAll('input[name="difficulty"]');

const scoreboardHtml = document.createElement("div")

btnHtml.addEventListener("click", function() {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedDifficulty = radioButton.value
            console.log(selectedDifficulty)
            generateGrid()
            gridHtml.classList.remove("none")
            break
        }
    }
})

const resetBtnHtml = document.getElementById("resetBtn");

resetBtnHtml.addEventListener("click", function() {
    gridHtml.classList.remove("disabled")
    gameOverHtml.classList.add("you-lost-none")
    generateGrid()
})

