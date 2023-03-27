// Global variables  
let output = document.getElementById('output');
let memory = document.getElementById('memory');
let redToDegree = "degree";
let validDecimal = false;

//Error Message If the User Enter Malformed expression
const errorMsg = () => {
    document.getElementById('error').innerText = "Malformed expression";
    output.value = '';
    setTimeout(() => {
        document.getElementById('error').innerText = '';
    }, 3000);
}

// Generate the operand (1,2,3,..) from the Equation
function operand(val) {
    output.value += val;
}

document.getElementById('point').addEventListener('click', function () {
    if (!validDecimal) {
        document.getElementById("point").disabled = true;
    }
    validDecimal = true;
})

// Generate the operator (+,-,*,..) from the Equation
function operator(val) {
    let value = val;
    if (value != '=') {
        output.value += val;
    }
    validDecimal = false;
    document.getElementById("point").disabled = false;
}
// Gte the Memory from Storage
if (localStorage.getItem("Memory")) {
    memory.innerText = localStorage.getItem("Memory")
}

// Changing the First Column Equations
let second = document.getElementById("second");
second.addEventListener('click',
    function () {
        if (second.classList.contains('active')) {
            second.classList.remove('active')
        }
        else {
            second.classList.add('active')
        }

        let btnChange = document.getElementsByClassName('btn-change');

        for (let i = 0; i < btnChange.length; i++) {
            const element = btnChange[i];
            if (element.classList.contains('btn-hide')) {
                element.classList.add('btn-show')
                element.classList.remove('btn-hide')
            } else {
                element.classList.add('btn-hide')
                element.classList.remove('btn-show')
            }
        }
    })

//Woking for Equations Which are Define in the calculator
function Equation(operator) {
    try {
        var EvaluateVal = Evaluate(output.value)
    } catch (error) {
        errorMsg();
    }
    switch (operator) {
        case "ln":
            output.value = Evaluate(EvaluateVal + "log2.718");
            break;
        case "log":
            output.value = Evaluate(EvaluateVal + "log10");
            break;
        case "pow10":
            output.value = Evaluate("10^" + EvaluateVal);
            break;
        case "pow2":
            output.value = Evaluate("2^" + EvaluateVal);
            break;
        case "square-root":
            output.value = Evaluate(`2√${EvaluateVal}`);
            break;
        case "cube-root":
            output.value = Evaluate(`3√${EvaluateVal}`);
            break;
        case "square":
            output.value = Evaluate(EvaluateVal + "^2");
            break;
        case "cube":
            output.value = Evaluate(`${EvaluateVal}^3`);
            break;
        case "oneByNum":
            output.value = Evaluate("1/" + EvaluateVal);
            break;
        case "fact":
            let value = parseFloat(EvaluateVal)
            var fact = 1;
            for (let i = 1; i <= value; i++) {
                fact *= i;
            }
            output.value = fact;
            break;
        case "exp":
            // E = 2.79 , Math.exp()
            output.value = Evaluate("2.7183^" + EvaluateVal);
            break;
        case "pi":
            if (output.value) {
                output.value = Evaluate(`${EvaluateVal}*${Math.PI.toFixed(2)}`)
            } else {
                output.value = Math.PI.toFixed(2)
            }
            break;
        case "euler":
            if (output.value) {
                output.value = Evaluate(`${EvaluateVal}*${Math.E.toFixed(2)}`)
            } else {
                output.value = Math.E.toFixed(2)
            }
            break;
        case "sin":
            output.value = Math.sin(EvaluateVal).toFixed(2);
            break;
        case "asin":
            output.value = Math.asin(EvaluateVal).toFixed(2);
            break;
        case "cos":
            output.value = Math.cos(EvaluateVal).toFixed(2);
            break;
        case "acos":
            output.value = Math.acos(EvaluateVal).toFixed(2);
            break;
        case "tan":
            output.value = Math.tan(EvaluateVal).toFixed(2);
            break;
        case "atan":
            output.value = Math.atan(EvaluateVal).toFixed(2);
            break;
        case "sinh":
            output.value = Math.sinh(EvaluateVal).toFixed(2);
            break;
        case "cosh":
            output.value = Math.cosh(EvaluateVal).toFixed(2);
            break;
        case "tanh":
            output.value = Math.tanh(EvaluateVal).toFixed(2);
            break;
        case "abs":
            output.value = Math.abs(EvaluateVal);
            break;
        case "floor":
            output.value = Math.floor(EvaluateVal);
            break;
        case "ceil":
            output.value = Math.ceil(EvaluateVal);
            break;
        default:
            break;
    }
}
// Convert Degree To Redians
function Deg() {
    let EvaluateVal = Evaluate(output.value)
    if (redToDegree == "degree") {
        output.value = (EvaluateVal * Math.PI / 180).toFixed(2);
        document.getElementById('DEGREG').innerHTML = "RED"
        redToDegree = "redians";
    } else {
        output.value = (EvaluateVal * 180 / Math.PI).toFixed(2);
        document.getElementById('DEGREG').innerHTML = "DEG"

        redToDegree = "degree";
    }
}
// Changing the Equation Sign
function plusMinus() {
    output.value = Math.sign(parseFloat(output.value)) == -1 ? output.value.substring(1) : "-" + output.value;
}
// Work when user Click on F-E
function fixedExpo() {
    let EvaluateVal = parseFloat(Evaluate(output.value))
    output.value = EvaluateVal.toExponential(10);
}
//Clearing the Input

function clearInput(val) {
    let value = val;
    //Clear All Value
    if (value == 'ac') {
        output.value = '';
        validDecimal = false;
        document.getElementById('point').disabled = false;
    }
    if (value == 'c') {
        //Clear single Char 
        output.value = output.value.slice(0, -1)
        if (isNaN(output.value[output.value.length - 1]) && output.value[output.value.length - 1] != undefined) {
            document.getElementById('point').disabled = true;
        } else if (output.value[output.value.length] == ".") {
            document.getElementById('point').disabled = false;
        } else {
            document.getElementById('point').disabled = false;
        }
    }
}

// Memory Storage Functions

// Clear the Memory

document.getElementById('mc').addEventListener('click', function () {
    localStorage.removeItem("Memory")
    memory.innerHTML = localStorage.getItem("Memory");
})

// Recall the Memory
document.getElementById('mr').addEventListener('click', function () {
    output.value = memory.innerText = localStorage.getItem("Memory");
})

// Addtion to Memory
document.getElementById('m-plus').addEventListener('click', function () {
    localStorage.setItem("Memory", parseFloat(localStorage.getItem("Memory")) + parseFloat(output.value))
    output.value = memory.innerText = localStorage.getItem("Memory");
})


// Subtraction to Memory
document.getElementById('m-minus').addEventListener('click', function () {
    localStorage.setItem("Memory", parseFloat(localStorage.getItem("Memory")) - parseFloat(output.value))
    output.value = memory.innerText = localStorage.getItem("Memory");
})

// Store value to Memory
document.getElementById('ms').addEventListener('click', function () {
    localStorage.setItem("Memory", parseFloat(Evaluate(output.value)))
    output.value = memory.innerHTML = localStorage.getItem("Memory");
})


// Hide and Show Trigo and Functions
function myFunction() {
    document.getElementById("funcList").classList.toggle("show");
}
function myTrigo() {
    document.getElementById("trigoList").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.btn-func')) {
        var dropdowns = document.getElementsByClassName("func-list");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }

    if (!event.target.matches('.btn-trigo')) {
        var dropdowns = document.getElementsByClassName("trigo-list");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}



// Start the Equation Evaluation using prefix -> postfix
// First Equation will convert into postfix after that
// Postfix will Evaluated uisng precedance order so that we can get Equarate answer

// Implementation of Stack for Evaluation
var EX = {};
EX.stackNode = function () {
    this.item = null;
    this.next = null;
}


// Define Stack Opration
EX.LinkedStack = function () {
    var head = null;
    var size = null;

    // Push the Item to Stack
    this.pushToStack = function (item) {
        var node = new EX.stackNode();
        node.item = item;
        node.next = null;

        if (size < 1 && head === null) {
            head = node;
            head.next = null;
            size = 1;
        } else {
            var current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
            size += 1;
        }
    }

    // Pop the Item to Stack
    this.popFromStack = function () {
        var current = head;
        if (size === 0) {
            return;
        } if (size === 1) {
            head = null;
            size = 0;
            return current;
        }

        var prev = current;
        while (current.next != null) {
            prev = current;
            current = current.next;
        }

        prev.next = null;
        size -= 1;
        return current;
    }

    // Check the Stack in Empty or not
    this.isStackEmpty = function () {
        return (size < 1) ? true : false;
    }

    // Return the which is the stack top
    this.stackTop = function () {
        var current = head;
        if (size > 0 && head != null) {
            while (current.next != null) {
                current = current.next;
            }
            return current.item;
        } else {
            return null;
        }
    }

    // Return Complete Stack
    this.printStack = function () {
        var current = head;
        while (current.next !== null) {
            current = current.next;
        }
    }
}

// InFix to PostFix Convernsion
EX.InfixToPostfix = function (exp) {
    var pfixNumber = [];
    var stk = [];
    stk.push("#");
    // Define the precedence of the Opetator
    var precedence = function (operator) {
        switch (operator) {
            case "log":
                return 4;
            case "^":
                return 3;
            case "*":
                return 2;
            case "√":
                return 3;
            case "/":
                return 2;
            case "%":
                return 2;
            case "+":
                return 1;
            case "-":
                return 1;
            default:
                return 0;
        }
    }
    // Get the Equation and Convert into  PostFix 
    for (var i = 0; i < exp.length; i++) {
        var c = exp.charAt(i);
        // Add to List if it is Number
        let log = exp.substring(i, i + 3);
        if (!isNaN(parseInt(c)) || c == "." || (i == 0 && (exp[i] == "+" || exp[i] == "-"))) {
            var val = c;
            for (var j = i + 1; j < exp.length; j++) {
                if (!isNaN(exp.charAt(j)) || exp.charAt(j) == ".") {
                    val += exp.charAt(j);
                    i++;
                } else {
                    break;
                }
            }
            pfixNumber.push(val);
        }
        else if (log == "log") {
            stk.push('log');
            i = i + 2;
        }
        else if (c == "(") {
            stk.push("(");
        }
        else if (c == ")") {
            while (stk[stk.length - 1] != "#" && stk[stk.length - 1] != '(') {
                pfixNumber.push(stk.pop())
            }
            stk.pop();
        } else {
            if (precedence(c) > precedence(stk[stk.length - 1])) {
                stk.push(c);
            } else {
                while (stk[stk.length - 1] != '#' && precedence(c) <= precedence(stk[stk.length - 1])) {
                    pfixNumber.push(stk.pop());
                }
                stk.push(c)
            }
        }

    }

    while (stk[stk.length - 1] != '#') {
        pfixNumber.push(stk.pop());
    }

    this.getPostfix = function () {
        return pfixNumber;
    }
}


// Evaluate PostFix and Get Answer
EX.PostFix = function (exp) {
    this.exp = exp;
    var numStack = new EX.LinkedStack();
    // Use The Operator and oprand and return evaluated value
    var operate = function (obj, operator) {
        var operand2 = obj.popFromStack().item;
        var operand1 = obj.popFromStack().item;
        switch (operator) {
            case "+":
                obj.pushToStack(operand1 + operand2);
                break;
            case "-":
                obj.pushToStack(operand1 - operand2);
                break;
            case "*":
                obj.pushToStack(operand1 * operand2);
                break;
            case "%":
                obj.pushToStack(operand1 % operand2);
                break;
            case "/":
                obj.pushToStack(parseFloat(operand1 / operand2));
                break;
            case "^":
                obj.pushToStack(Math.pow(operand1, operand2));
                break;
            case "√":
                let operand3 = 1 / operand1;
                obj.pushToStack(Math.pow(operand2, operand3));
                break;
            case "log":
                obj.pushToStack(Math.log(operand1) / Math.log(operand2));
                break;
        }
    };
    // Use The Operator and oprand from stack 
    for (var i = 0; i < exp.length; i++) {
        c = exp[i];
        if (!isNaN(parseInt(c))) {
            numStack.pushToStack(parseFloat(c));
        } else if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^' || c === '%' || c == 'log' || c === '√') {
            operate(numStack, c)
        }
    }
    //Return The Result Of the Equation  
    this.getResult = function () {
        return numStack.stackTop();
    }

}


// Evaluate the Postfix Equation
function Evaluate(equ) {
    var pfix = new EX.InfixToPostfix(equ);
    let postfixEqu = pfix.getPostfix();

    document.getElementById('History').innerHTML += `<p onclick="getHistory('${equ}')">${equ}</p>`
    document.getElementById('History').scrollTo(0, document.getElementById('History').scrollHeight)
    // Evaluate Equation
    var EquEval = new EX.PostFix(postfixEqu);
    EquEval = EquEval.getResult();
    return EquEval.toFixed(2);
}
function getHistory(equation) {
    output.value += equation
}


// Run When  user Click on Equal To Sign
document.getElementById('equalTo').addEventListener('click', function () {
    // Infix To PostFix 
    try {
        output.value = Evaluate(output.value);
    } catch (error) {
        errorMsg();
    }

})

// Evaluate on Press Enter
window.addEventListener("keydown", function (e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        try {
            output.value = Evaluate(output.value);
        } catch (error) {
            errorMsg();
        }
    }
    if (e.code === "NumpadDecimal" || e.code === "Period") {
        if (validDecimal) {
            e.preventDefault();
        }
        validDecimal = true;
    }

    if (e.code === "NumpadAdd" || e.code === "NumpadSubtract" || e.code === "NumpadMultiply" || e.code === "NumpadDivide" || e.code === "Minus") {
        validDecimal = false;
    }
})

output.focus();

