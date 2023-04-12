/*
need to

- implement solution to put in the scientific keys


BUGS FIXED
- simple calculations not working, 
 1- need to allow several numbers to display and then be used in a calculation
 2- currently calculation is returning a long concatenated string

*/

document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is Ready");

    // function evaluate(calculation){
    //     result = eval(calculation);
    //     display.value = result;
    // }

    const calcButtons = document.querySelectorAll('.calculator')
    const sciButtons = document.querySelectorAll('.sci-calculator')
    // set variable on first page load;
    let calculation="";

    // Listen for regular calculator button press
    // for each button listen to a press
    calcButtons.forEach(button =>{
        // on a click event
        button.addEventListener('click', function(event){
            // store the text content into the variable text
            const buttonText = event.target.innerText;
            // output the value to the screen display using function
            let button = checkText(buttonText)
            
            
            if (buttonText == "="){
                const result = evaluateCalculation(calculation);
                screenDisplay(result);
                calculation = result;
                calcTrackDisplay(calculation);
            } else if (button == "AC") {
                calculation="";
                screenDisplay("");
                calcTrackDisplay(calculation);
            } else {
                /*
                    REFACTOR OPPORTUNITY:
                     - pull out into a seperate function and incorporate with the other display function
                */
                // update the calculation variable with the button data entry
                calculation+=button;
                // store the displa of the calculator in variable
                let currentDisplay = document.getElementById('calc-display');
                // check if the calculator is displaying a number
                let numCheck = Number(currentDisplay.value);
                // check if the button pressed is a number
                let keyCheck = Number(button);
                // if either is not a number then 
                if (isNaN(numCheck) || isNaN(keyCheck)) {
                    // following will put the button pressed onto the cacluator display if the button was not a number
                    // if the button was a number but then previous value was an operator it will wipe screen and put new number
                    // if button pressed wasn't a number the screen will be wiped with the operator value in place
                    console.log("calc: ", calculation)
                    // display the button pressed in the calculator
                    screenDisplay(button);
                    // display the current calculation in the smaller display
                    calcTrackDisplay(calculation);
                } else {
                    // used to ensure numbers are increased in display instead of being wiped
                    currentDisplay.value = currentDisplay.value + button;
                }
                
            }

        });
    });
    
});

// Used to carry out the calculation
/*
DEVELOPMENT ONLY PRODUCTIION REFACTOR NEEDED: 
    - this currently uses eval which is not safe for production purporses
*/
function evaluateCalculation(calculation) {
    const result = eval(calculation);
    return result;
}

// Used to update the the main calculator display
function screenDisplay(text) {
    
    const display = document.getElementById('calc-display');
    console.log("Screen Display: ", text)
    display.value = text;
    console.log(text)

}

// Used to update the display of the calcuation tracker (the smaller display)
function calcTrackDisplay(text) {
    
    const display = document.getElementById('calc-track');
    console.log("Calc Track: ", text)
    display.value = text;
    console.log(text)
}

// Used to convert the text of a button into its mathematical equivalent
function checkText(text) {

    console.log("Screen Display: ", text)
    console.log(text)

            if (text == 'x') {
                return '*'
            } else if (text == '÷') {
                return '/'
            } else if (text == '%') {
                return'*0.01' 
            } else {
                return text;
            }
         
            // BETTER IN HERE?
        // } else if (text == 'AC') {
        //     console.log("AC: clear display")
        //     return "0"

        // 
            // } else if (keyPressed == 'Inv') {
                // NEEDS REFINING< NEED TO KEEP RUNNING TOTAL ON DISPLAY AFTER EACH NUMBER PRESS
            //     keyPressed = `math.inv(${value})` 
            //     value = `Inv(${value}`;
            //     calculation+=keyPressed;
            //     display.value = value;
            // } else if (keyPressed == 'RAD') {
            //     keyPressed = `${value} * Math.PI / 180`
            //     calculation+=keyPressed;
            //     display.value = 'RAD';
            // }  else if (keyPressed == 'DEG') {
            //     keyPressed = `${value} * 180 / Math.PI`; 
            //     value = keyPressed;
            //     calculation+=keyPressed;
            //     display.value = 'DEG';
            // } else if (keyPressed == 'x!') {
            //     keyPressed = `Math.factorial(${value})` 
            //     value = `${value}!`;
            //     calculation+=keyPressed;
            //     display.value = value;
            // }  else if (keyPressed == 'sin') {
            //     keyPressed = `Math.sin(${value})`
            //     calculation+=keyPressed;
            //     display.value = `sin(${value})`;
            //     // NOT SURE WHAT THIS IS??? LN
            // } else if (keyPressed =='ln') {
            //     keyPressed = 'Math.LOG10E' 
            //     value = keyPressed;
            //     display.value = keyPressed;
            // } else if (keyPressed == 'π') {
            //     keyPressed = 'Math.PI' 
            //     value = keyPressed;
            //     display.value = keyPressed;
            // } else if (keyPressed == 'cos') {
            //     keyPressed = `Math.cos(${value})`
            //     value = keyPressed;
            //     display.value = keyPressed;
            //     // NOT SURE THIS BELOW IS RIGHT
            // } else if (keyPressed == 'log') {
            //     keyPressed = 'Math.LOG10E' 
            //     value = keyPressed;
            //     display.value = keyPressed;
            //     // NOT SURE THIS BELOW IS RIGHT
            // } else if (keyPressed == 'e') {
            //     keyPressed = 'Math.E' 
            //     value = keyPressed;
            //     display.value = keyPressed;
            // } else if (keyPressed == 'tan') {
            //     keyPressed = `Math.tan(${value})`
            //     value = keyPressed;
            //     display.value = keyPressed;
            //     // NOT SURE THIS BELOW IS RIGHT
            // } else if (keyPressed == 'Ans') {
            //     keyPressed = '*0.01' 
            //     value = keyPressed;
            //     display.value = keyPressed;
            //     // NOT SURE THIS BELOW IS RIGHT
            // } else if (keyPressed == 'EXP') {
            //     keyPressed = '*0.01' 
            //     value = keyPressed;
            //     display.value = keyPressed;
            // } else if (keyPressed == 'Xy') {
            //     keyPressed = `${value}^` 
            //     value = keyPressed;
            //     display.value = keyPressed;
            // } else if (keyPressed == '√') {
            //     keyPressed = `Math.sqrt(${value})`
            //     value = keyPressed;
            //     display.value = keyPressed;
            // } 
            // else if (keyPressed >=0 && keyPressed <=9){ 
            //     value+=keyPressed
            //     display.value = value;
            //     calculation+=value;
            //     console.log('calculation:', calculation)
            // } else if (keyPressed == NaN){
            //     value="";
            //     console.log("not number");
            // } 

}
