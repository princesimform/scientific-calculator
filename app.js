let output = document.getElementById('output');
output.focus();
let bracket = '';

// Set Operand to Input 
$(".operand").click(function () {
    let value = $(this).val();
    output.value += $(this).val();

    output.focus();
})

$(".operator").click(function () {
    let value = $(this).val();
    if (value != '=' && value != '()') {
        output.value += $(this).val();
    }
    output.focus();
})

// Clear Input 
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
    output.focus();
})

$("#bracket").click(function () {
    let openBracketNum = 0;
    let closeBracketNum = 0;
    output.focus();
})

// Evaluate Equation Here
$(".equal-to").click(function () {
    console.log("eveluate your equation here");
})



//Bracket Panding