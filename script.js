/*
need to

- implement following buttons
- RAD / DEG switch
    - if rad, then treat angles differently, if switch treat angles differently
- inv
    - understand how inv works
    - implement inv
- ln
- log
- e
- EXP
- Ans

 - implement solution for open brackets
    - if ( placed after a number, then put in * between them
    - if no ) bracket


- try catch error messages as a popup above the calculator

- hide scientific keys when reached smaller breakpoint but show at larger breakpoint
- restrict size of app at larger breakpoint

 - refactor code so its more readable   

FIXED
- simple calculations not working, 
 1- need to allow several numbers to display and then be used in a calculation
 2- currently calculation is returning a long concatenated string
- edit displays to align right values
- edit smaller display to have no border
- smaller display should show numbers when updating the calculator
    - smaller display to show numbers e.g. 2 entered twice needs to show 22 in smaller
        - could be done by updating calc only after the check
- implement solution to put in the scientific keys 
    - use button to show scientific keys

*/

document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is Ready");

    // set variable to track a calculator button click
    const calculatorButtons = document.querySelectorAll('.calculatorButton');

    // set varaiables to hide the sci calculator div vs the calculator div
    const sciCalc = document.getElementById("sci-calc");
    const calc = document.getElementById("calc");


    // OBSOLETE - REMOVE?
    const calcButtons = document.querySelectorAll('.calculator');
    const sciButtons = document.querySelectorAll('.sci-calculator');
    const modeButtons = document.querySelectorAll('.mode-button');
    // other classes not used?
    // sci-calculator-buttons  

    // set variable on first page load
    // this tracks the text being inputted for the calculation
    let calculation="";
    // to keep track of the last button pressed
    // start with AC so that on page load the lastbutton is not considered a number
    let lastButton ="AC"

    // Listen for calculator button press
    // for each button listen to a press
    calculatorButtons.forEach(button =>{
        // on a click event
        button.addEventListener('click', function(event){
            // store the text content into the variable text
            let buttonText = button.innerText;
            // output the value to the screen display using function
            buttonText = checkText(buttonText)
            
            // create a variable to use as a result (IS THIS NEEDED?)
            let result
            
            // Check for each of the current buttons being pressed
            if (buttonText == "=" && (lastButton != "=" && lastButton!="AC")){
                // evaluate the current calculation and store in result
                result = evaluateCalculation(calculation);
                //change the main calculator display to show the result of the calculation
                mainCalcDisplay(result);
                //change the value in calculation to be the total result
                // change the value in the calcuator tracking display to equal the result
                calcTrackDisplay("Ans: "+result);
                // reset the value in calculation to start again
                calculation = "";
            } else if (buttonText == "=" && (lastButton == "=" || lastButton=="AC")) {
                mainCalcDisplay("");
                calcTrackDisplay("");
                calculation="";
            } else if (buttonText == "AC") {
                // reset the calculation to start again
                calculation="";
                // reset the main calculator to display to be emtpy
                mainCalcDisplay("");
                // set the tracking display to be AC to show reset
                calcTrackDisplay("AC");
             } else if (buttonText == '√') {
                     // check if the last button was a number or not   
                if ( (isNaN(lastButton))) {
                    // if not a number just put Math.Pi into calcuation
                    console.log(lastButton);
                    calculation+=`Math.sqrt(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay("√");
                } else {
                    // if it is a number then multiply the current caclulation against pi
                    console.log("display");
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by pi
                    calculation += "*Math.sqrt(";
                    calcTrackDisplay(calculation);
                    mainCalcDisplay("√"); 
                }
            } else if (buttonText == 'π') {
                // check if the last button was a number or not   
                if ( (isNaN(lastButton))) {
                    // if not a number just put Math.Pi into calcuation
                    console.log(lastButton);
                    calculation+="Math.PI";
                    calcTrackDisplay(calculation)
                    mainCalcDisplay("π");
                } else {
                    // if it is a number then multiply the current caclulation against pi
                    console.log("display");
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by pi
                    calculation += "*Math.PI";
                    calcTrackDisplay(calculation);
                }
                calculation = evaluateCalculation(calculation)
                mainCalcDisplay(calculation); 
                
            } else if (buttonText == "x!"){
                let lastNum =0;
                if ( (isNaN(lastButton))) {
                    // remove the last non integer from calculation
                    calculation = removeLastNonInteger(calculation)
                    
                    lastNum = findLastInteger(calculation)
                    mainCalcDisplay(`${String(lastNum)}!`);
                    lastNum = factorialise(lastNum);
                } else {
                    lastNum = findLastInteger(calculation)
                    mainCalcDisplay(`${String(lastNum)}!`);
                    lastNum = factorialise(lastNum)
                }
                calculation = removeLastInteger(calculation);
                calculation+=String(lastNum);
                calcTrackDisplay(calculation);


            } else {
                // update the calculation variable with the button data entry
                // store the display of the calculator in variable
                let currentDisplay = document.getElementById('calc-display');
                // check if the calculator is displaying a number
                let numCheck = Number(currentDisplay.value);
                // check if the button pressed is a number
                let keyCheck = Number(buttonText);
                // if either is not a number then 
                if (isNaN(numCheck) || isNaN(keyCheck)) {
                    // following will put the button pressed onto the cacluator display if the button was not a number
                    // if the button was a number but then previous value was an operator it will wipe screen and put new number
                    // if button pressed wasn't a number the screen will be wiped with the operator value in place
                    console.log("calc: ", calculation)
                    // display the button pressed in the calculator
                    mainCalcDisplay(buttonText);
                    calculation+=buttonText;
                    // display the current calculation in the smaller display
                    calcTrackDisplay(calculation);
                } else {
                    // used to ensure numbers are increased in display instead of being wiped
                    currentDisplay.value = currentDisplay.value + buttonText;
                    calculation+=buttonText;
                    calcTrackDisplay(calculation);
                }
                
            }

            lastButton = buttonText;
            console.log("last button was:", lastButton)
            if (isNaN(lastButton)){
                console.log("NOT A NUMBER")
            }

        });
    });


// FOLLWING NEED RESEARCH
            // } else if (buttonText == "Inv") {
            //     // THIS DOESN'T WORK??
            //     result = evaluateCalculation(calculation);
            //     calculation = `Math.inv(${result})`
            //     calcTrackDisplay(calculation);
            //     calculation = evaluateCalculation(calculation);
            //     mainCalcDisplay(calculation); 
            //  } else if (buttonText == 'RAD') {
            //     // THIS SHOULD BE A SWITCH THAT ONLY WORKS WITH RAD/DEG
            //     result = evaluateCalculation(calculation);
            //     result = `${result} * Math.PI / 180`
            //     calculation=result;
            //     mainCalcDisplay(result); 
            //     calcTrackDisplay(calculation);

                
           
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




let lastClicked = null; // initialize the variable to null
// VARIABLES TO HOLD THE MODE BUTTONS
const sciMode = document.getElementById("sci-mode")
const calcMode = document.getElementById("calc-mode")

sciMode.addEventListener('click', function(event){
    console.log(" click")
  if (lastClicked === sciMode) {
    return; // do nothing if the same button was clicked twice
  }
  calc.classList.add("d-none");
  sciCalc.classList.remove("d-none");
  sciMode.style.backgroundColor = "#F0F8FF";
  sciMode.style.color = "#0d6efd";
  calcMode.style.backgroundColor = "#EFEFEF";
  calcMode.style.color = "#000000";

  lastClicked = sciMode; // update the lastClicked variable
});

// regular calculator click
calcMode.addEventListener('click', function(event){
  if (lastClicked === calcMode) {
    return; // do nothing if the same button was clicked twice
  }
  calc.classList.remove("d-none");
  sciCalc.classList.add("d-none");
  calcMode.style.backgroundColor = "#F0F8FF";
  calcMode.style.color = "#0d6efd";
  sciMode.style.backgroundColor = "#EFEFEF";
  sciMode.style.color = "#000000"


  lastClicked = calcMode; // update the lastClicked variable
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
function mainCalcDisplay(text) {
    
    const display = document.getElementById('calc-display');
    console.log("Screen Display: ", text)

    if (typeof text !== 'string') {
        text = String(text); // Convert text to a string if it's not already one
      }
      
    display.value = text
        .replace("Math.PI", "π")
        .replace("Math.sqrt", "√");
    console.log(text)

}

// Used to update the display of the calcuation tracker (the smaller display)
function calcTrackDisplay(text) {
    
    const display = document.getElementById('calc-track');
    console.log("Calc Track: ", text)

    if (typeof text !== 'string') {
        text = String(text); // Convert text to a string if it's not already one
      }
    
    display.value = text
        .replace("Math.PI", "π")
        .replace("Math.sqrt", "√");
    console.log(text)
}

// Used to convert the text of a button into its mathematical equivalent
function checkText(text) {

    console.log("Screen Display: ", text)
    console.log(text)

            if (text == 'x') {
                return '*';
            } else if (text == '÷') {
                return '/';
            } else if (text == '%') {
                return'*0.01';
            } else if (text =='Xy'){
                return '**';
            } else if (text =='cos'){
                return 'Math.cos(';
            } else if (text =='tan'){
                return 'Math.tan(';
            } else if (text =='sin'){
                return 'Math.sin(';
            } else {
                return text;
            }
}

// used to remove the last non integer value from the calculation where required
function removeLastNonInteger(str) {
    return str.replace(/[^0-9]$/, '');
  }

// find the last integer value in the calculation
  function findLastInteger(str) {
    const match = str.match(/(\d+)[^\d]*$/);
    return match ? parseInt(match[1], 10) : null;
  }

  // remove the last integer value in the calculation
  function removeLastInteger(str) {
    return str.replace(/\d+[^\d]*$/, '');
  }

//   produce the factorial of a number
  function factorialise(num){
    //factorial of 1 and factorial of - is 1
    if ((num == 0) || (num == 1)){
        return 1;
    } else {
        for (let i=num-1; i>0; i--) {
            num = num*i;
        }
        return num
    }
    
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

