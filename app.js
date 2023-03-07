let output = document.getElementById('output');
output.focus();

$(".operand").click(function () {
    let value = $(this).val();
    output.value += $(this).val();
    // output.focus();
})

$(".operator").click(function () {
    let value = $(this).val();
    if (value != '=' && value != '()') {
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
EX.InfixToPostfixUpdate = function (exp) {
    var infixStack = new EX.LinkedStack();
    var pfixString = "";
    var pfixNumber = [];

    var precedence = function (operator) {
        switch (operator) {
            case "^":
                return 3;
            case "*":
                return 2;
            case "/":
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
        if (!isNaN(parseInt(c))) {
            var val = parseInt(c);
            for (var j = i + 1; j < exp.length; j++) {
                if (!isNaN(parseInt(j))) {
                    val = val * 10 + parseInt(exp.charAt(j));
                } else {
                    break;
                }
            }
            pfixNumber.push(val);
            pfixString += c;
        } else if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^') {
            while (c != '^' && !infixStack.isStackEmpty() && (precedence(c) <= precedence(infixStack.stackTop()))) {
                pfixString += infixStack.popFromStack().item;
            }
            infixStack.pushToStack(c);
        }
    }

    while (!infixStack.isStackEmpty()) {
        pfixString += infixStack.popFromStack().item;
    }

    this.getPostfix = function () {
        return pfixString;
    }


}
EX.InfixToPostfix = function (exp) {

    var infixStack = new EX.LinkedStack();
    var pfixString = "";


    var precedence = function (operator) {
        switch (operator) {
            case "^":
                return 3;
            case "*":
                return 2;
            case "/":
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
        if (!isNaN(parseInt(c))) {
            pfixString += c;
        } else if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^') {
            while (c != '^' && !infixStack.isStackEmpty() && (precedence(c) <= precedence(infixStack.stackTop()))) {
                pfixString += infixStack.popFromStack().item;
            }
            infixStack.pushToStack(c);
        }
    }
    while (!infixStack.isStackEmpty()) {
        pfixString += infixStack.popFromStack().item;
    }

    this.getPostfix = function () {
        return pfixString;
    }
}

EX.PostFix = function (exp) {
    this.exp = exp;
    var numStack = new EX.LinkedStack();

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
            case "/":
                obj.pushToStack(parseInt(operand1 / operand2));
                break;
            case "^":
                obj.pushToStack(Math.pow(operand1, operand2));
                break;
        }

    };


    for (var i = 0; i < exp.length; i++) {
        c = exp.charAt(i);
        if (!isNaN(parseInt(c))) {
            numStack.pushToStack(parseInt(c));
        } else if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^') {
            operate(numStack, c)
        }
    }

    this.getResult = function () {
        return numStack.stackTop();
    }

}

console.log(" POSTFIX 42+351-");
var pfix = new EX.PostFix("55+10-68+");
console.log("Result for Expression: " + pfix.getResult())

$("#equalTo").click(function () {
    console.log(output.value);
    var postFixEqu = new EX.InfixToPostfix(output.value);
    postFixEqu = postFixEqu.getPostfix();
    console.log(postFixEqu);
    var Evaluation = new EX.PostFix(postFixEqu);
    console.log("Result for Expression:" + Evaluation.getResult());
})