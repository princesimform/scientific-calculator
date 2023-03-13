let output = document.getElementById('output');
let memory = document.getElementById('memory');
let redToDegree = "degree";
const errorMsg = () => {
    document.getElementById('error').innerText = "Malformed expression";
    output.value = '';
    setTimeout(() => {
        document.getElementById('error').innerText = '';
    }, 3000);
}
if (localStorage.getItem("Memory")) {
    memory.innerText = localStorage.getItem("Memory")
}
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

        console.log(btnChange);
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
function Equation(operator) {
    let isError = false;
    try {
        var EvaluateVal = Evaluate(output.value)
    } catch (error) {
        isError = true;
        errorMsg();
    }
    switch (operator) {
        case "ln":
            output.value = Evaluate(output.value + "log2");
            break;
        case "log":
            output.value = Evaluate(output.value + "log10");
            break;
        case "pow10":
            console.log("10^" + output.value);
            output.value = Evaluate("10^" + output.value);
            break;
        case "pow2":
            console.log("2^" + output.value);
            output.value = Evaluate("2^" + output.value);
            break;
        case "square-root":
            console.log(output.value + "^0.5");
            output.value = Evaluate(`2√${output.value}`);
            break;
        case "cube-root":
            output.value = Evaluate(`3√${output.value}`);
            break;
        case "square":
            output.value = Evaluate(output.value + "^2");
            break;
        case "cube":
            output.value = Evaluate(`${output.value}^3`);
            break;
        case "oneByNum":
            output.value = Evaluate("1/" + output.value);
            break;
        case "fact":
            let value = parseFloat(output.value)
            var fact = 1;
            for (let i = 1; i <= value; i++) {
                fact *= i;
            }
            output.value = fact;
            break;
        case "plusMinus":
            console.log(output.value);
            output.value = Math.sign(parseFloat(output.value)) == 1 ? "-" + output.value : output.value.substring(1);
            break;
        case "exp":
            // E = 2.79 , Math.exp()
            console.log("2.7183^" + output.value);
            output.value = Evaluate("2.7183^" + output.value);
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

function Deg() {
    let EvaluateVal = Evaluate(output.value)
    if (redToDegree == "degree") {
        output.value = (EvaluateVal * Math.PI / 180).toFixed(2);
        redToDegree = "redians";
    } else {
        output.value = (EvaluateVal * 180 / Math.PI).toFixed(2);
        redToDegree = "degree";
    }
}
function fixedExpo() {
    let EvaluateVal = parseFloat(Evaluate(output.value))
    output.value = EvaluateVal.toExponential(10);
}
$(".operand").click(function () {
    output.value += $(this).val();
    // output.focus();
})

$(".operator").click(function () {
    let value = $(this).val();
    if (value != '=') {
        output.value += $(this).val();
    }
    // output.focus();
})
$(".clear").click(function () {
    let value = $(this).val();
    //Clear All Value
    if (value == 'ac') {
        output.value = '';
    }
    if (value == 'c') {
        //Clear single Char 
        output.value = output.value.slice(0, -1)
    }
    // output.focus();
})



$(".mc").click(function () {
    localStorage.removeItem("Memory")
    memory.innerHTML = localStorage.getItem("Memory");

})

$(".mr").click(function () {
    output.value = memory.innerText = localStorage.getItem("Memory");
})
$(".m-plus").click(function () {
    localStorage.setItem("Memory", parseFloat(localStorage.getItem("Memory")) + parseFloat(output.value))
    output.value = memory.innerText = localStorage.getItem("Memory");
})
$(".m-minus").click(function () {
    localStorage.setItem("Memory", parseFloat(localStorage.getItem("Memory")) - parseFloat(output.value))
    output.value = memory.innerText = localStorage.getItem("Memory");
})

$(".ms").click(function () {
    localStorage.setItem("Memory", parseFloat(output.value))
    memory.innerHTML = localStorage.getItem("Memory");
})





// Implementation of Stack for Evaluation
var EX = {};
EX.stackNode = function () {
    this.item = null;
    this.next = null;
}

EX.LinkedStack = function () {
    var head = null;
    var size = null;

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

    this.isStackEmpty = function () {
        return (size < 1) ? true : false;
    }

    this.stackTop = function () {
        var current = head;
        if (size > 0 && head != null) {
            while (current.next != null) {
                current = current.next;
            }
            return current.item;
        } else {
            console.log("There is No item in Stack");
            return null;
        }
    }

    this.printStack = function () {
        var current = head;
        while (current.next !== null) {
            console.log("Item " + current.item + " is on the stack.");
            current = current.next;
        }
        console.log("Item " + current.item + " is on the stack.");
    }
}

// InFix to PostFix Convernsion
EX.InfixToPostfix = function (exp) {
    console.log(exp);
    var pfixNumber = [];
    var stk = [];
    stk.push("#");


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

    for (var i = 0; i < exp.length; i++) {
        var c = exp.charAt(i);
        // Add to List if it is Number
        console.log("-----------------------------------");
        console.log("pfix", pfixNumber);
        console.log("stk", stk);
        console.log(c);
        let log = exp.substring(i, i + 3);
        console.log(exp);
        console.log("My log is " + log);
        if (!isNaN(parseInt(c)) || c == ".") {
            console.log(c + "It is number");

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
            stk.push(log);
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
            console.log(precedence(c));
            console.log(precedence(c) + ">" + precedence(stk[stk.length - 1]));
            if (precedence(c) > precedence(stk[stk.length - 1])) {
                stk.push(c);
            } else {
                console.log(stk[stk.length - 1] + "!=" + '#' + "&&" + precedence(c) + "<=" + precedence(stk[stk.length - 1]));
                while (stk[stk.length - 1] != '#' && precedence(c) <= precedence(stk[stk.length - 1])) {
                    console.log("Come to while");

                    pfixNumber.push(stk.pop());
                }
                stk.push(c)
            }
        }

        console.log("pfix", pfixNumber);
        console.log("stk", stk);
        console.log("-----------------------------------");
    }

    while (stk[stk.length - 1] != '#') {
        pfixNumber.push(stk.pop());
    }

    this.getPostfix = function () {
        return pfixNumber;
    }
}


// Evaluate PostFix
EX.PostFix = function (exp) {
    this.exp = exp;
    var numStack = new EX.LinkedStack();
    var operate = function (obj, operator) {
        var operand2 = obj.popFromStack().item;
        var operand1 = obj.popFromStack().item;
        console.log(operand2, operand1, operator);
        switch (operator) {
            case "+":
                console.log(operand1 + operand2);
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
                console.log(operand1, operand2);
                obj.pushToStack(Math.pow(operand1, operand2));
                break;
            case "√":
                let operand3 = 1 / operand1;
                obj.pushToStack(Math.pow(operand2, operand3));
                break;
            case "log":
                console.log("Come to log");
                obj.pushToStack(Math.log(operand1) / Math.log(operand2));
                break;
        }

    };
    for (var i = 0; i < exp.length; i++) {
        c = exp[i];
        if (!isNaN(parseInt(c))) {
            numStack.pushToStack(parseFloat(c));
        } else if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^' || c === '%' || c == 'log' || c === '√') {
            operate(numStack, c)
        }
    }
    this.getResult = function () {
        return numStack.stackTop();
    }

}

function Evaluate(equ) {
    var pfix = new EX.InfixToPostfix(equ);
    let postfixEqu = pfix.getPostfix();
    console.log(postfixEqu);

    // Evaluate Equation
    var EquEval = new EX.PostFix(postfixEqu);
    EquEval = EquEval.getResult();
    return EquEval.toFixed(2);
}
$("#equalTo").click(function () {
    // Infix To PostFix 
    try {
        output.value = Evaluate(output.value);
    } catch (error) {
        errorMsg();
    }
})


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
}

window.onclick = function (event) {
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