function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


function euclide() {
    let over = 21
    let down = 11
    // + 1 so that 0 never happens and 61 or 31 sometimes does 
    let xy1 = {
        x: Math.floor(Math.random() * over),
        y: Math.floor(Math.random() * down),
    }
    let xy2 = {
        x: Math.floor(Math.random() * over),
        y: Math.floor(Math.random() * down)
    }
    if (xy1.x == 0) {
        xy1.x += 1
    }
    if (xy1.y == 0) {
        xy1.y += 1
    }
    if (xy2.x == 0) {
        xy2.x += 1
    }
    if (xy2.y == 0) {
        xy2.y += 1
    }
    if (xy1.x === xy2.x && xy1.y === xy2.y) {
        // redo
        euclide()
    }


    let table = "<table id='euclide' border='1'>"
    for (let r = 0; r < down; r++) {
        table += "<tr>"
        for (let c = 0; c < over; c++) {
            if (r === xy1.y && c === xy1.x) {
                table += `<td class='tinyA'>A</td>`
            } else if (r === xy2.y && c === xy2.x) {
                table += `<td class='tinyB'>B</td>`
            } else if (c === 0) {
                table += `<td class='tiny'>${r}</td>`
            } else if (r == 0) {
                if (c < 10) {

                    table += `<td>0${c}</td>`
                } else {

                    table += `<td>${c}</td>`
                }
            } else {
                table += `<td></td>`
            }
        }
        table += "</tr>"

    }
    table += "</table>"

    const a = xy1.x - xy2.x;
    const b = xy1.y - xy2.y;
    const theDistance = Math.sqrt(a * a + b * b);
    const msg = `(${xy1.x},${xy1.y} and ${xy2.x},${xy2.y})`
    const obj = {
        'problem': `${msg}`,  //  <br/> ${table}`,
        'problem_display': table, 
        'answer': theDistance,
        'candidates': getWrongAnswers(theDistance, theDistance),
        'truncted': theDistance
    }
    return obj

}

function getWrongAnswers(distance, truncated) {
    let a = (Math.random() * truncated) + distance + (Math.random() * truncated)
    let b = 1 + (Math.random() * truncated) + distance + (Math.random() * (truncated * 2))
    let c = 4 + (Math.random() * truncated) + distance + (Math.random() * (truncated * 3))

    let array = []
    array.push(a) // tiny bit wrong
    array.push(b) // somewhat wrong
    array.push(c) // very wrong
    array.push(truncated) // correct ( per rounding )
    shuffle(array)
    return array
}

function getSquareRootProblem() {
    let r = Math.floor(Math.random() * 20)
    if (r < 1) {
        r = 1
    }
    const sqrt = Math.sqrt(r)
    const truncted = sqrt
    const distance = Math.abs(1 - (truncted / sqrt))
    const obj = {
        'problem': `<math><msqrt><mi>${r}</mi></msqrt></math>`,
        'problem_display':'',
        'answer': sqrt,
        'candidates': getWrongAnswers(distance, truncted),
        'truncted': truncted
    }
    return obj
}

function getCubeRootProblem() {
    let r = Math.floor(Math.random() * 100)
    if (r < 1) {
        r = 1
    }
    const cube = Math.cbrt(r)
    const truncted = cube

    // How far away from perfect answer is the truncted one?
    // This will be used to help make 'incorrect' answers 
    const distance = Math.abs(1 - (truncted / cube))

    const obj = {
        'problem': `<math><mroot><mi>${r}</mi><mn>3</mn></mroot></math>`,
        'problem_display':'',
        'candidates': getWrongAnswers(distance, truncted),
        'answer': cube,
        'truncted': truncted
    }
    wrong = getWrongAnswers(distance, truncted)
    return obj
}

function makeProblem() {
    const r = Math.random()
    let obj = {}
    if (r < 0.33) {
        obj = getSquareRootProblem()
    } else if (r < .66) {
        obj = getCubeRootProblem()
    } else {
        obj = euclide()
    }
    document.getElementById("question").innerHTML = obj.problem
    document.getElementById("problem_display").innerHTML = obj.problem_display
    document.getElementById("A").innerHTML = obj.candidates[0]
    document.getElementById("B").innerHTML = obj.candidates[1]
    document.getElementById("C").innerHTML = obj.candidates[2]
    document.getElementById("D").innerHTML = obj.candidates[3]

    document.getElementById("real").innerHTML = obj.answer

    proper = obj.truncted
    the_problem = obj.problem
}
let proper = 0
let the_problem = ""
function selectMe(choice) {
    let verdict = "something"
    if (choice !== "next") {

        let selected = document.getElementById(choice).innerHTML
        if (selected == proper) {
            verdict = "YAY"
        } else {
            verdict = "BOO"
        }
        makeProblem()
        document.getElementById('r' + choice).checked = false
    } else {
        verdict = "SKIP"
    }

    addHistory(verdict, the_problem, proper)


}



function addHistory(verdict, the_problem, the_answer) {
    let table = document.getElementById("historyTable");
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    if ( verdict == "YAY") {
        cell2.className="good"
    } else {
        cell2.className="bad"
    }
    cell2.innerHTML = verdict + "&nbsp;";
    cell1.innerHTML = the_problem;
    cell3.innerHTML = the_answer;
}