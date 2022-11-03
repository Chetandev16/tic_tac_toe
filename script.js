window.addEventListener("load", initEvents);

let btns;
let counter = 0;
let winningCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


function initEvents() {
    btns = document.querySelectorAll(".btn");

    for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute("title", i);
        btns[i].addEventListener("click", userMove);
    }
}


function userMove() {
    console.log(counter);
    if (counter <= 9) {
        this.innerHTML = "X";
        this.setAttribute("disabled", true);
        checkWinner(this.title, "X");
        cpuMove();
    }
    counter++;
}

function cpuMove() {
    let cpuPos = parseInt(Math.random() * 9);
    console.log("CPU moved : " + cpuPos);

    if (btns[cpuPos].innerHTML == "") {
        btns[cpuPos].innerHTML = "0";
        btns[cpuPos].setAttribute("disabled", true);
        checkWinner(cpuPos, "0");
    } else {
        cpuMove();
    }

    counter++;
}


function checkWinner(pos, choice) {
    for (let i = 0; i < winningCombination.length; i++) {
        for (let j = 0; j < 3; j++) {
            if (winningCombination[i][j] == pos) {
                winningCombination[i][j] = choice;
            }
        }
    }
    for (let i = 0; i < winningCombination.length; i++) {
        if (winningCombination[i][0] == choice && winningCombination[i][1] == choice && winningCombination[i][2] == choice) {
            const Ptag = result(choice);
            document.getElementById('win').appendChild(Ptag);
            flag = true;
            break;
        }
    }
}

function result(choice) {
    const ptag = document.createElement('h1');
    if (choice === "X") {
        ptag.innerHTML = "USER WINS!!!";
    } else {
        ptag.innerHTML = "CPU WINSS!!!";
    }
    if (counter > 9) {
        ptag.innerHTML = "DRAW";
    }
    return ptag;
}