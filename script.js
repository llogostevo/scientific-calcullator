/*
need to

- RAD/DEG Toggle
 - implement rad / deg when toggled on and off

 need to put in something so that math.sin is replace with the following when degrees is on
 - math.sin(math.unit(90, 'deg'))

use this approach

if deg is true, and sin / tan / cos pressed

convert value to radians, then put into  sin / tan / cos

 function toRadians (angle) {
  return angle * (Math.PI / 180);
}

- Ans to multiply


- try catch error messages as a popup above the calculator

 - refactor code so its more readable   
*/


document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is Ready");

    // set variable to track a calculator button click
    const calculatorButtons = document.querySelectorAll('.calculatorButton');

    // set varaiables to hide the sci calculator div vs the calculator div
    const sciCalc = document.getElementById("sci-calc");
    const calc = document.getElementById("calc");


    // set variable on first page load
    // this tracks the text being inputted for the calculation
    let calculation = "";
    // to keep track of the last button pressed
    // start with AC so that on page load the lastbutton is not considered a number
    let lastButton = "AC"
    // set a variable to track the last answer for the ans button
    let ans = 0;
    // Listen for calculator button press
    // for each button listen to a press
    calculatorButtons.forEach(button => {
        // on a click event
        button.addEventListener('click', function (event) {
            // store the text content into the variable text
            let buttonText = button.innerText;
            // output the value to the screen display using function
            buttonText = checkText(buttonText)

            // create a variable to use as a result (IS THIS NEEDED?)
            // let result


            // Check for each of the current buttons being pressed
            if (buttonText == "=" && (lastButton != "=" && lastButton != "AC")) {
                // evaluate the current calculation and store in result
                ans = evaluateCalculation(calculation);
                //change the main calculator display to show the result of the calculation
                mainCalcDisplay(ans);
                //change the value in calculation to be the total result
                // change the value in the calcuator tracking display to equal the result
                calcTrackDisplay("Ans: " + ans);
                // reset the value in calculation to start again
                calculation = "";
                // Check ti see if last button was an = or AC so that screen starts again prir to a number input. 
            } else if (buttonText == "=" && (lastButton == "=" || lastButton == "AC")) {
                mainCalcDisplay("");
                calcTrackDisplay("");
                calculation = "";
            } else if (buttonText == "AC") {
                // reset the calculation to start again
                calculation = "";
                // reset the main calculator to display to be emtpy
                mainCalcDisplay("");
                // set the tracking display to be AC to show reset
                calcTrackDisplay("AC");
            } else if (buttonText == "Ans") {
                buttonText = ans;
                mainCalcDisplay(`Ans: ${buttonText}`);
                calculation += buttonText
                calcTrackDisplay(calculation);

            } else if (buttonText == '√') {
                // check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    console.log(lastButton);
                    calculation += `${buttonText}(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(`${buttonText}(`);
                } else {
                    // if it is a number then multiply the current caclulation against pi
                    console.log("display");
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by pi
                    calculation += `*${buttonText}(`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(`${buttonText}(`);
                }
            } else if (buttonText == 'π') {

                //check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    // if not a number just put Math.Pi into calcuation
                    console.log(lastButton);
                    calculation += buttonText;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(buttonText);
                } else {
                    // if it is a number then multiply the current caclulation against pi
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by pi
                    calculation += `*${buttonText}`;
                    calcTrackDisplay(calculation);
                }


            } else if (buttonText == "x!") {
                let lastNum = 0;
                if ((isNaN(lastButton))) {
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
                calculation += String(lastNum);
                calcTrackDisplay(calculation);

            } else if (buttonText == "Inv") {
                // just used for log purposes currently
                console.log("Inverse Mode")
                // IN HERE PUT THE POPUP IN BOOTSTRAP SO CAN BE SEEN INVERSE MODE IS SET

            } else if (buttonText == "Rnd") {
                let random = Math.random();
                // check if the last button was not a number or if it was a random number
                if ((isNaN(lastButton)) && lastButton != "Rnd") {
                    // put the random number into the calculation
                    calculation += `${String(random)}`;
                    mainCalcDisplay(`${String(random)}`);
                } else {
                    // multiply the random number to the last value in the calculation
                    calculation += `*${String(random)}`;
                    mainCalcDisplay(`*${String(random)}`)

                }
                // display the calculation to the tracker
                calcTrackDisplay(calculation);


            } else if (buttonText == "ln") {
                console.log(buttonText)
                //check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    // if not a number just put LN into equation
                    console.log(lastButton);
                    calculation += `${buttonText}(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(buttonText);
                } else {
                    // if it is a number then multiply the current caclulation against ln(number)
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by ln(number)
                    calculation += `*${buttonText}(`;
                    calcTrackDisplay(calculation);
                }

            } else if (buttonText == "e") {
                console.log(buttonText)
                //check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    // if not a number just put into calcuation
                    console.log(lastButton);
                    calculation += buttonText;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(buttonText);
                } else {
                    // if it is a number then multiply the current caclulation against 
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation
                    calculation += `*${buttonText}`;
                    calcTrackDisplay(calculation);
                }


            } else if (buttonText == "log") {
                console.log(buttonText)
                //check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    // if not a number just put log10 into equation
                    console.log(lastButton);
                    calculation += `${buttonText}(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(buttonText);
                } else {
                    // if it is a number then multiply the current caclulation against log10(number)
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by log10(number)
                    calculation += `*${buttonText}(`;
                    calcTrackDisplay(calculation);
                }

            } else if (buttonText == "EXP") {
                console.log(buttonText)
                //check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    // if not a number just put EXP into equation
                    console.log(lastButton);
                    calculation += `${buttonText}(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(buttonText);
                } else {
                    // if it is a number then multiply the current caclulation against EXP(number)
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by EXP(number)
                    calculation += `*${buttonText}(`;
                    calcTrackDisplay(calculation);
                }

            } else if (buttonText == "x2") {
                console.log(buttonText)

                let lastNum = 0;
                //check if the last button is a number or not
                if ((isNaN(lastButton))) {
                    //if not
                    // remove the last non integer from calculation
                    calculation = removeLastNonInteger(calculation)
                }
                //get the last integer
                lastNum = findLastInteger(calculation)
                //display last integer as a sqaure
                mainCalcDisplay(`${String(lastNum)}**2`);
                //claculate the square
                lastNum = lastNum ** 2;
                // remove the last integer from the calc
                calculation = removeLastInteger(calculation);
                // replace the last integer with the square of itself
                calculation += String(lastNum);
                // display the calculation to the tracking display
                calcTrackDisplay(calculation);

            } else if (buttonText == "Xy") {
                console.log(buttonText)
                let lastNum = 0;
                //check if the last button is a number or not
                if ((isNaN(lastButton))) {
                    //if not
                    // remove the last non integer from calculation
                    calculation = removeLastNonInteger(calculation)
                }
                //get the last integer
                lastNum = findLastInteger(calculation);
                //display last integer as a sqaure
                mainCalcDisplay(`${String(lastNum)}**`);

                calculation += `${String(lastNum)}**`;

                // display the calculation to the tracking display
                calcTrackDisplay(calculation);

            } else if (buttonText == "y√x") {
                console.log(buttonText)

                //check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    // if not a number just put log10 into equation
                    //if not
                    // remove the last non integer from calculation
                    calculation = removeLastNonInteger(calculation)
                    //get the last integer
                }

                let x = findLastInteger(calculation);
                calculation = removeLastInteger(calculation);
                // display last integer as a sqaure
                mainCalcDisplay(`y?√(${x}`);
                calculation += `Math.pow(${x}, 1/`;

                // display the calculation to the tracking display
                calcTrackDisplay(calculation);

            } else if (buttonText == "10x") {

                console.log(buttonText);
                buttonText = `10^x?`
                //check if the last button was a number or not   
                if ((isNaN(lastButton))) {
                    // if not a number just put log10 into equation
                    //if not
                    // remove the last non integer from calculation
                    // display last integer as a sqaure
                    calculation += `*10**`;

                } else {
                    // set the calculation to be the current result for the calculation * 10x
                    calculation += `10**`;
                }

                mainCalcDisplay(buttonText);
                calcTrackDisplay(calculation);

            } else {
                // update the calculation variable with the button data entry
                // store the display of the calculator in variable
                let currentDisplay = document.getElementById('calc-display');
                // check if the calculator is displaying a number
                let numCheck = Number(currentDisplay.value);
                // check if the button pressed is a number
                let keyCheck = Number(buttonText);
                // boolean to check if number is entered or if the last button was an equals / AC to decide if the display is a continuation
                if (((isNaN(numCheck) || isNaN(keyCheck)) && buttonText != ".") || (!(isNaN(buttonText)) && (lastButton == "=" || lastButton == "AC"))) {
                    // following will put the button pressed onto the cacluator display if the button was not a number
                    // if the button was a number but then previous value was an operator it will wipe screen and put new number
                    // if button pressed wasn't a number the screen will be wiped with the operator value in place
                    console.log("calc: ", calculation)
                    // display the button pressed in the calculator
                    mainCalcDisplay(buttonText);
                    calculation += buttonText;
                    // display the current calculation in the smaller display
                    calcTrackDisplay(calculation);
                } else {
                    // used to ensure numbers are increased in display instead of being wiped
                    currentDisplay.value = currentDisplay.value + buttonText;
                    calculation += buttonText;
                    calcTrackDisplay(calculation);
                }

            }


            lastButton = buttonText;

        });

    });

    // END OF BUTTON CLICK FOR

    // toggles the mode between scientific and regular calculator
    let lastModeClicked = null; // initialize the variable to null
    // VARIABLES TO HOLD THE MODE BUTTONS
    const sciMode = document.getElementById("sci-mode")
    const calcMode = document.getElementById("calc-mode")
    // variable to manipulate the equals in the scientific buttons
    const sciEqual = document.getElementById("sci-equals")

    sciMode.addEventListener('click', function (event) {
        console.log(" click")
        if (lastModeClicked === sciMode) {
            return; // do nothing if the same button was clicked twice
        }
        calc.classList.add("d-none");
        sciCalc.classList.remove("d-none");
        sciMode.style.backgroundColor = "#F0F8FF";
        sciMode.style.color = "#0d6efd";
        calcMode.style.backgroundColor = "#EFEFEF";
        calcMode.style.color = "#000000";

        lastModeClicked = sciMode; // update the lastModeClicked variable
    });

    // regular calculator click
    calcMode.addEventListener('click', function (event) {
        if (lastModeClicked === calcMode) {
            return; // do nothing if the same button was clicked twice
        }
        calc.classList.remove("d-none");
        sciCalc.classList.add("d-none");
        calcMode.style.backgroundColor = "#F0F8FF";
        calcMode.style.color = "#0d6efd";
        sciMode.style.backgroundColor = "#EFEFEF";
        sciMode.style.color = "#000000"

        lastModeClicked = calcMode; // update the lastModeClicked variable
    });

    let mq = window.matchMedia('(max-width: 992px)');
    mq.addEventListener('change', showHideSciButtons);
    showHideSciButtons(mq);

    function showHideSciButtons(mq) {
        const sciSwitchButtons = document.getElementById("scientific-switch");
        if (mq.matches) {
            sciSwitchButtons.classList.remove("d-none");
            sciCalc.classList.add("d-none");
            calc.classList.remove("d-none");
            calcMode.style.backgroundColor = "#F0F8FF";
            calcMode.style.color = "#0d6efd";
            sciMode.style.backgroundColor = "#EFEFEF";
            sciMode.style.color = "#000000";
            sciEqual.classList.remove("d-none");
            lastModeClicked = calcMode;
        } else {
            sciSwitchButtons.classList.add("d-none");
            sciCalc.classList.remove("d-none");
            calc.classList.remove("d-none");
            sciEqual.classList.add("d-none");

            lastModeClicked = calcMode;

        }
    }


    // Code for the Toggle RAD and DEG Buttons
        const radbutton1 = document.getElementById("rad-button");
        const degbutton2 = document.getElementById("deg-button");
        // set initial load so that rad is on as default start
        let radDegFlag = "rad";

        // event listener to toggle the rad button on and deg off
        radbutton1.addEventListener("click", () => {
            radbutton1.classList.add("active");
            radbutton1.classList.remove("opacity-25");
            radbutton1.classList.remove("text-black");
            degbutton2.classList.remove("active");
            degbutton2.classList.add("opacity-25");
            degbutton2.classList.add("text-black");
            radDegFlag = "rad";

        });
        
        // event listener to toggle the rad off and deg on
        degbutton2.addEventListener("click", () => {
          degbutton2.classList.add("active");
          degbutton2.classList.remove("opacity-25");
          degbutton2.classList.remove("text-black");
          radbutton1.classList.remove("active");
          radbutton1.classList.add("opacity-25");
          radbutton1.classList.add("text-black");
          radDegFlag = "deg";
          
        });

    // Code to check if the inverse button has been clicked

    // set inverse variable to track inverse toggle button click
    const inverse = document.getElementById("inv-button")
    // select all inverse buttons
    const inverseButtons = document.querySelectorAll(".inverse");
    // select all non inverse buttons
    const nonInverseButtons = document.querySelectorAll(".non-inverse")

    // on click of the inverse toggle
    inverse.addEventListener('click', function (event) {
        console.log("Inverse Clicked");

        // change the background of the inverse toggle button to show it is toggled on or off
        if (inverse.classList.contains("btn-secondary")) {
            inverse.classList.remove("btn-secondary");
            inverse.classList.add("btn-light");
        } else {
            inverse.classList.add("btn-secondary");
            inverse.classList.remove("btn-light");
        }


        inverseButtons.forEach(button => {
            // show the inverse buttons if they are hidden
            if (button.classList.contains("d-none")) {
                button.classList.remove("d-none");
            } else {
                //hide the inverse buttons if they are shown
                button.classList.add("d-none");
            }
        });

        nonInverseButtons.forEach(button => {
            // show the non inverse buttons if they are hidden
            if (button.classList.contains("d-none")) {
                button.classList.remove("d-none");
            } else {
                // hide the non inverse buttons if they are shown
                button.classList.add("d-none");
            }
        });
    });



    // SUPPORTING FUNCTIONS

    /*
    DEVELOPMENT ONLY PRODUCTIION REFACTOR NEEDED: 
        - this currently uses eval which is not safe for production purporses
    */
    function evaluateCalculation(calculation) {
        let result = 0;
        result = calculation
            .replace("π", "Math.PI")
            .replace("√", "Math.sqrt")
            .replace("sin(", "Math.sin(")
            .replace("tan(", "Math.tan(")
            .replace("cos(", "Math.cos(")
            .replace("sin-1(", "Math.asin(")
            .replace("tan-1(", "Math.atan(")
            .replace("cos-1(", "Math.acos(")
            .replace("ln(", "Math.log(")
            .replace("log(", "Math.log10(")
            .replace("e", "Math.E")
            .replace("EXP(", "Math.exp(")

        console.log(calculation);
        result = eval(result)
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
        console.log(text)

    }

    // Used to update the display of the calcuation tracker (the smaller display)
    function calcTrackDisplay(text) {

        const display = document.getElementById('calc-track');
        console.log("Calc Track: ", text)

        if (typeof text !== 'string') {
            text = String(text); // Convert text to a string if it's not already one
        }

        //   ************************************************
        //   TESTING REQUIRED< ARE THESE NEEDED, NEED MORE?
        display.value = text
            .replace("Math.PI", "π")
            .replace("Math.sqrt", "√");
        console.log(text)
    }

    // Used to convert the text of a button into its mathematical equivalent with brackets
    // could be dropped for replace instead, or used within if statements. 
    function checkText(text) {

        console.log("Screen Display: ", text)
        console.log(text)

        if (text == 'x') {
            return '*';
        } else if (text == '÷') {
            return '/';
        } else if (text == '%') {
            return '*0.01';
        } else if (text == 'Xy') {
            return '**';
        } else if (text == 'cos') {
            return 'cos(';
        } else if (text == 'tan') {
            return 'tan(';
        } else if (text == 'sin') {
            return 'sin(';
        } else if (text == 'cos-1') {
            return 'cos-1(';
        } else if (text == 'tan-1') {
            return 'tan-1(';
        } else if (text == 'sin-1') {
            return 'sin-1(';
        } else {
            return text;
        }
    }

    // add a bracket to a key
    function addBracketMult(prevButton, currentButton, calculation) {
        if ((isNaN(prevButton))) {
            calculation += `${currentButton}(`;
            calcTrackDisplay(calculation)
            mainCalcDisplay(`${currentButton}(`);
        } else {
            // if it is a number then multiply the current caclulation against 
            result = evaluateCalculation(calculation);
            // set the calculation to be the current result for the calculation * by 
            calculation += `*${currentButton}(`;
            calcTrackDisplay(calculation);
            mainCalcDisplay(`${currentButton}(`);
        }

        return calculation;

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
    function factorialise(num) {
        //factorial of 1 and factorial of - is 1
        if ((num == 0) || (num == 1)) {
            return 1;
        } else {
            for (let i = num - 1; i > 0; i--) {
                num = num * i;
            }
            return num
        }

    }






});