/*
need to

- correct the scientific keys
- simple calculations not working, 

 1- need to allow several numbers to display and then be used in a calculation
 2- currently calculation is returning a long concatenated string




*/

document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is Ready");

    function evaluate(calculation){
        result = eval(calculation);
        display.value = result;
    }

    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('button')
    let calculation="";
    
    for (let i=0; i<buttons.length; i++){
        
        buttons[i].addEventListener('click', () => {
            let keyPressed = buttons[i].innerText;
            console.log(keyPressed);

            if (keyPressed == NaN){
                console.log ('not num true')
                display.value="";
            } 

            if (keyPressed == '='){
                evaluate(calculation);
                calculation="";
            } else if (keyPressed == 'x') {
                keyPressed = '*'
                calculation+=keyPressed;
                display.value = keyPressed;
            } else if (keyPressed == '÷') {
                keyPressed = '/'
                calculation+=keyPressed;
                display.value = '÷';
            } else if (keyPressed == '%') {
                keyPressed = '*0.01' 
                calculation+=keyPressed;
                display.value = '%';
            } else if (keyPressed == 'AC') {
                calculation="";
                keyPressed= "";
                display.value = keyPressed;
            } else if (keyPressed == 'Inv') {
                // NEEDS REFINING< NEED TO KEEP RUNNING TOTAL ON DISPLAY AFTER EACH NUMBER PRESS
                keyPressed = `math.inv(${value})` 
                value = `Inv(${value}`;
                calculation+=keyPressed;
                display.value = value;
            } else if (keyPressed == 'RAD') {
                keyPressed = `${value} * Math.PI / 180`
                calculation+=keyPressed;
                display.value = 'RAD';
            }  else if (keyPressed == 'DEG') {
                keyPressed = `${value} * 180 / Math.PI`; 
                value = keyPressed;
                calculation+=keyPressed;
                display.value = 'DEG';
            } else if (keyPressed == 'x!') {
                keyPressed = `Math.factorial(${value})` 
                value = `${value}!`;
                calculation+=keyPressed;
                display.value = value;
            }  else if (keyPressed == 'sin') {
                keyPressed = `Math.sin(${value})`
                calculation+=keyPressed;
                display.value = `sin(${value})`;
                // NOT SURE WHAT THIS IS??? LN
            } else if (keyPressed =='ln') {
                keyPressed = 'Math.LOG10E' 
                value = keyPressed;
                display.value = keyPressed;
            } else if (keyPressed == 'π') {
                keyPressed = 'Math.PI' 
                value = keyPressed;
                display.value = keyPressed;
            } else if (keyPressed == 'cos') {
                keyPressed = `Math.cos(${value})`
                value = keyPressed;
                display.value = keyPressed;
                // NOT SURE THIS BELOW IS RIGHT
            } else if (keyPressed == 'log') {
                keyPressed = 'Math.LOG10E' 
                value = keyPressed;
                display.value = keyPressed;
                // NOT SURE THIS BELOW IS RIGHT
            } else if (keyPressed == 'e') {
                keyPressed = 'Math.E' 
                value = keyPressed;
                display.value = keyPressed;
            } else if (keyPressed == 'tan') {
                keyPressed = `Math.tan(${value})`
                value = keyPressed;
                display.value = keyPressed;
                // NOT SURE THIS BELOW IS RIGHT
            } else if (keyPressed == 'Ans') {
                keyPressed = '*0.01' 
                value = keyPressed;
                display.value = keyPressed;
                // NOT SURE THIS BELOW IS RIGHT
            } else if (keyPressed == 'EXP') {
                keyPressed = '*0.01' 
                value = keyPressed;
                display.value = keyPressed;
            } else if (keyPressed == 'Xy') {
                keyPressed = `${value}^` 
                value = keyPressed;
                display.value = keyPressed;
            } else if (keyPressed == '√') {
                keyPressed = `Math.sqrt(${value})`
                value = keyPressed;
                display.value = keyPressed;
            } else if (keyPressed >=0 && keyPressed <=9){ 
                value+=keyPressed
                display.value = value;
                calculation+=value;
                console.log('calculation:', calculation)
            } else if (keyPressed == NaN){
                value="";
                console.log("not number");
            } 
            

        })
    }




















})
