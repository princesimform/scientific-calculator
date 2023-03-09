let output = document.getElementById('output');
let memory = document.getElementById('memory')
memory.innerText = output.focus();
function Equation(operator) {
    let value = parseFloat(output.value)
    switch (operator) {
        case "ln":
            output.value = Evaluate(output.value + "l2");
            break;
        case "log":
            output.value = Evaluate(output.value + "l10");
            break;
        case "pow10":
            console.log("10^" + output.value);
            output.value = Evaluate("10^" + output.value);
            break;
        case "square-root":
            console.log(output.value + "^0.5");
            output.value = Evaluate(output.value + "^0.5");
            break;
        case "square":
            console.log(output.value + "^2");
            output.value = Evaluate(output.value + "^2");
            break;
        case "oneByNum":
            console.log("1/" + output.value);
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
        default:
            break;
    }
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

$(".abs").click(function () {
    let value = parseFloat(output.value)
    output.value = Math.abs(value);
})



$(".pi").click(function () {
    output.value += Math.PI.toFixed(2);
})
$(".euler").click(function () {
    output.value += Math.E.toFixed(2);
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
            case "l":
                return 4;
            case "^":
                return 3;
            case "*":
                return 2;
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
        // console.log("-----------------------------------");
        // console.log("pfix", pfixNumber);
        // console.log("stk", stk);
        // console.log(c);

        if (!isNaN(parseInt(c)) || c == ".") {
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
        else if (c == "(") {
            stk.push("(");
        }
        else if (c == "^") {
            stk.push('^');
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
                stk.pop(c);
            }
        }

        // console.log("pfix", pfixNumber);
        // console.log("stk", stk);
        // console.log("-----------------------------------");

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
            case "l":
                console.log("Come to log");
                obj.pushToStack(Math.log(operand1) / Math.log(operand2));
                break;
        }

    };
    for (var i = 0; i < exp.length; i++) {
        c = exp[i];
        if (!isNaN(parseInt(c))) {
            numStack.pushToStack(parseFloat(c));
        } else if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^' || c === '%' || c === 'l') {
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
    output.value = Evaluate(output.value);
})