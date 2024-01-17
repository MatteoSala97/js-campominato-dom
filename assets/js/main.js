const gridHtml = document.getElementById("grid")
const btnHtml = document.getElementById("btn")

let divisor = 10

function generateGrid(){

    gridHtml.innerHTML =""

    for (let i = 1; i <= divisor * divisor; i++){
        //creates an empty div
        let box = document.createElement("div")

        if (selectedDifficulty === "Easy"){
            divisor = 10
        } else if ( selectedDifficulty === "Medium"){
            divisor = 9
        } else {
            divisor = 7
        }

        //adds the class to the div
        box.classList.add("box")
        box.style.width = `calc( 100% / ${divisor})`

        //numerates the cells 
        box.innerText = i

        //creates the grid
        gridHtml.append(box)
    
        box.addEventListener("click", function(){
            this.classList.toggle("active")
            console.log(i)
        })
    }
}

const radioButtons = document.querySelectorAll('input[name="difficulty"]')

let selectedDifficulty 

btnHtml.addEventListener("click", function () {

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





