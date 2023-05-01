/*
FURTHER DEVELOPMENTS

- CE button to be implemnted

- hovers in place on normal buttons but not on sci buttons
- using bootstrap buttons but then overidden with Js, so obsolete code in places needs removing

- try catch error messages as a popup above the calculator

- refactor code so its more readable and reduce repeated code
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

    // startFlag used to highlight if at the beginning of a new calculation
    // potential to remove this on a refactor of code, placed in to solve bugs with default 0
    let startFlag = true;

    // Listen for calculator button press
    // for each button listen to a press
    calculatorButtons.forEach(button => {
        // on a click event
        button.addEventListener('click', function (event) {
            // store the text content into the variable text
            let currentButton = button.innerText;
            // output the value to the screen display using function
            currentButton = checkText(currentButton)

            // create a variable to use as a result (IS THIS NEEDED?)
            // let result


            // Check for each of the current buttons being pressed
            if (currentButton == "=" && (lastButton != "=" && lastButton != "AC")) {


                // evaluate the current calculation and store in result
                ans = evaluateCalculation(calculation);
                //change the main calculator display to show the result of the calculation
                mainCalcDisplay(ans);
                //change the value in calculation to be the total result
                // change the value in the calcuator tracking display to equal the result
                calcTrackDisplay("Ans: " + ans);
                // reset the value in calculation to start again
                calculation = "";
                // reset the start flag as new calculation to be started
                startFlag = true;
                // Check to see if last button was an = or AC so that screen starts again prir to a number input. 
            } else if (currentButton == "=" && (lastButton == "=" || lastButton == "AC")) {
                mainCalcDisplay("");
                calcTrackDisplay("");
                calculation = "";
                // reset the start flag as new calculation to be started
                startFlag = true;
            } else if (currentButton == "AC") {
                // reset the calculation to start again
                calculation = "";
                // reset the main calculator to display to be emtpy
                mainCalcDisplay("");
                // set the tracking display to be AC to show reset
                calcTrackDisplay("AC");
                // reset the start flag as new calculation to be started
                startFlag = true;
            } else if (currentButton == "Ans") {


                if ((isNaN(lastButton)) && ((lastButton != "Rnd") && (lastButton != "Ans") && (lastButton != "e") && (lastButton != 'π') && (lastButton != 'x!'))) {
                    calculation += `${ans}`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(`Ans: ${ans}`);
                } else {
                    calculation += `*${ans}`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(`Ans: ${ans}`);
                }

            } else if (currentButton == '√') {
                // check if the last button was a number or not   
                if ((isNaN(lastButton)) && (lastButton != "Ans")) {
                    calculation += `${currentButton}(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(`${currentButton}(`);
                } else {
                    // set the calculation to be the current result for the calculation * square root
                    calculation += `*${currentButton}(`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(`${currentButton}(`);
                }
                // reset the start flag as now in the middle of a calculation
                startFlag = false;
            } else if (currentButton == 'π') {

                //check if the last button was a number or not   
                if ((isNaN(lastButton)) && ((lastButton != "Rnd") && (lastButton != "Ans") && (lastButton != "e") && (lastButton != 'π') && (lastButton != 'x!'))) {
                    // if not a number just put Math.Pi into calcuation
                    console.log(lastButton);
                    calculation += currentButton;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(currentButton);
                } else {
                    // if it is a number then multiply the current caclulation against pi
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by pi
                    calculation += `*${currentButton}`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(currentButton);
                }

                //used to identify if pi is last button pressed, and add an * before integers
                checkPi = true;
                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "x!") {
                let lastNum = 0;
                if (startFlag) {
                    mainCalcDisplay(`${String(0)}!`);
                    lastNum = factorialise(lastNum);

                } else if ((isNaN(lastButton))) {
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
                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "Inv") {
                // just used for log purposes currently
                console.log("Inverse Mode")
                currentButton = lastButton;

            } else if (currentButton == "Rnd") {
                let random = Math.random();
                // check if the last button was not a number or if it was a random number
                if ((isNaN(lastButton)) && ((lastButton != "Rnd") && (lastButton != "Ans") && (lastButton != "e") && (lastButton != 'π') && (lastButton != 'x!'))) {
                    // put the random number into the calculation
                    calculation += `${String(random)}`;
                    mainCalcDisplay(`Rnd: ${String(random)}`);
                } else {
                    // multiply the random number to the last value in the calculation
                    calculation += `*${String(random)}`;
                    mainCalcDisplay(`Rnd: ${String(random)}`)
                }
                // display the calculation to the tracker
                calcTrackDisplay(calculation);
                // reset the start flag as now in the middle of a calculation
                startFlag = false;


            } else if (currentButton == "ln") {
                console.log(currentButton)
                //check if the last button was a number or not   
                if ((isNaN(lastButton)) && (lastButton != "Ans")) {
                    // if not a number just put LN into equation
                    console.log(lastButton);
                    calculation += `${currentButton}(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(currentButton);
                } else {
                    // if it is a number then multiply the current caclulation against ln(number)
                    result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation * by ln(number)
                    calculation += `*${currentButton}(`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(currentButton);
                }
                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "ex") {

                console.log(currentButton);
                currentButton = `e**`
                //check if the last button was a number or not

                if ((isNaN(lastButton)) && (lastButton != "Ans")) {
                    console.log(lastButton);
                    calculation += currentButton;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(currentButton);
                } else if (!(isNaN(lastButton))) {
                    // set the calculation to be the current result for the calculation
                    calculation += `*${currentButton}`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(currentButton);

                }
                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "e") {
                console.log(currentButton)
                //check if the last button was a number or not   
                if ((isNaN(lastButton)) && ((lastButton != "Rnd") && (lastButton != "Ans") && (lastButton != "e") && (lastButton != 'π') && (lastButton != 'x!'))) {
                    // if not a number just put into calcuation
                    console.log(lastButton);
                    calculation += currentButton;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(currentButton);
                } else {
                    // if it is a number then multiply the current caclulation against 
                    // result = evaluateCalculation(calculation);
                    // set the calculation to be the current result for the calculation
                    calculation += `*${currentButton}`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(currentButton);
                }

                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "log") {
                //check if the last button was a number or not   
                if ((isNaN(lastButton)) && (lastButton != "Ans")) {
                    // if not a number just put log into equation
                    calculation += `${currentButton}(`;
                    calcTrackDisplay(calculation)
                    mainCalcDisplay(currentButton);
                } else {
                    // set the calculation to be the current result for the calculation * by log10(number)
                    calculation += `*${currentButton}(`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay(currentButton);
                }
                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "EXP") {
                // set the calculation to be the current result for the calculation
                if ((lastButton == "Ans") || !(isNaN(lastButton))) {
                    calculation += `*${currentButton}`;
                    calcTrackDisplay(calculation);
                    mainCalcDisplay("E");
                }

                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "%") {
                // set the lastNum variable to 0
                let lastNum = 0;
                //check the start flag to see if this is a default zero
                if (startFlag) {
                    // reset the calculation to be nothing
                    //potentially not needed here, 
                    //but kept for time being to insure no inconsistency from other calculations
                    calculation = "";
                } else if ((isNaN(lastButton))) {
                    // remove the last non integer from calculation
                    calculation = removeLastNonInteger(calculation)
                    lastNum = findLastInteger(calculation)
                } else {
                    lastNum = findLastInteger(calculation)
                }

                // perform % on the last number
                mainCalcDisplay(`${String(lastNum)}*0.01`);
                lastNum = lastNum * 0.01;

                calculation = removeLastInteger(calculation);
                calculation += String(lastNum);
                calcTrackDisplay(calculation);
                // reset the start flag as now in the middle of a calculation
                startFlag = false;


            } else if (currentButton == "x2") {


                let lastNum = 0;

                if (startFlag) {
                    // reset the calculation to be nothing
                    //potentially not needed here, 
                    //but kept for time being to insure no inconsistency from other calculations
                    calculation = "";
                } else if ((isNaN(lastButton))) {
                    //check if the last button is not a number
                    //if not
                    // remove the last non integer from calculation i.e. the last button
                    calculation = removeLastNonInteger(calculation)
                }

                // get the last integer, and reset the lastNum value
                if (calculation != "") {
                    //get the last integer
                    lastNum = findLastInteger(calculation)
                }

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

                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "Xy") {

                let lastNum = 0;

                console.log(startFlag);
                if (startFlag) {
                    // reset the calculation to be nothing
                    //potentially not needed here, 
                    //but kept for time being to insure no inconsistency from other calculations
                    calculation = "";
                } else if ((isNaN(lastButton))) {
                    //check if the last button is a number or not
                    //if not
                    // remove the last non integer from calculation
                    calculation = removeLastNonInteger(calculation)
                }

                //
                if (calculation != "") {
                    //get the last integer
                    lastNum = findLastInteger(calculation)
                    calculation = removeLastInteger(calculation)
                }

                console.log("LastNum: ", lastNum);

                //display last integer to allow next value to be power of
                mainCalcDisplay(`${String(lastNum)}**`);

                calculation += `${String(lastNum)}**`;

                // display the calculation to the tracking display
                calcTrackDisplay(calculation);
                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "y√x") {
                console.log(currentButton)
                let lastNum = 0;

                if (startFlag) {
                    // reset the calculation to be nothing
                    //potentially not needed here, 
                    //but kept for time being to insure no inconsistency from other calculations
                    calculation = "0";
                } else if ((isNaN(lastButton))) {
                    //check if the last button was a number or not   
                    // remove the last non integer from calculation if it wasn't a number
                    calculation = removeLastNonInteger(calculation)
                }

                // value of x is the last integer in the calculation tracker
                let x = findLastInteger(calculation);
                calculation = removeLastInteger(calculation);
                // display last integer as a sqaure
                mainCalcDisplay(`y?√(${x}`);
                // take input of y
                calculation += `Math.pow(${x}, 1/`;

                // display the calculation to the tracking display
                calcTrackDisplay(calculation);
                // reset the start flag as now in the middle of a calculation
                startFlag = false;

            } else if (currentButton == "10x") {

                console.log(currentButton);
                currentButton = `10^x?`
                //check if the last button was a number or not
                // 10x is applied on its own

                if ((isNaN(lastButton))) {
                    calculation += `10**`;

                } else {
                    // set the calculation to be the current result for the calculation * 10x

                    calculation += `*10**`;
                }

                mainCalcDisplay(currentButton);
                calcTrackDisplay(calculation);
                // reset the start flag as now in the middle of a calculation
                startFlag = false;


            } else if (currentButton == "Rad" || currentButton == "Deg") {
                // used to remove rad / deg text from calculation
                // set the current button text to match the last button for the next click event i.e remove rad/deg as the last button clicked
                currentButton = lastButton;

            } else if ((currentButton == "+") || (currentButton == "-")) {

                if (startFlag) {
                    // set the calculation to be 0 as default
                    calculation = "0";
                }

                calculation += currentButton;
                mainCalcDisplay(currentButton);
                calcTrackDisplay(calculation);
                startFlag = false;


            } else {
                // update the calculation variable with the button data entry
                // store the display of the calculator in variable
                let currentDisplay = document.getElementById('calc-display');
                // check if the calculator is displaying a number
                let numCheck = Number(currentDisplay.value);
                // check if the button pressed is a number
                let keyCheck = Number(currentButton);
                // boolean to check if number is entered or if the last button was an equals / AC to decide if the display is a continuation
                if (((isNaN(numCheck) || isNaN(keyCheck)) && currentButton != ".") || (!(isNaN(currentButton)) && (lastButton == "=" || lastButton == "AC"))) {
                    // following will put the button pressed onto the cacluator display if the button was not a number
                    // if the button was a number but then previous value was an operator it will wipe screen and put new number
                    // if button pressed wasn't a number the screen will be wiped with the operator value in place
                    console.log("calc: ", calculation)
                    if (((lastButton == "sin(") || (lastButton == "cos(") || (lastButton == "tan(") || (lastButton == "sin-1(") || (lastButton == "cos-1(") || (lastButton == "tan-1(")) && (degFlag == true)) {
                        calculation += "deg"

                        // IN HERE COULD USE FOLLOWING INSTEAD - refactor opportunity
                        /*
                        sin(math.unit(90, 'deg'))
                         */
                    }

                    // used to perform a multiply prior to another number being put into the calculator for the following buttons
                    if ((lastButton == 'π') || (lastButton == 'Ans') || (lastButton == 'Rnd') || (lastButton == 'x!') || (lastButton == 'e') || (lastButton == 'x2')) {
                        calculation += `*`;
                    }

                    // remove the last character from calc if a close brackets has been put in and there is a operator in place already
                    let lastChar = (calculation.slice(-1));
                    if ((currentButton == ")") && ((lastChar == "*") || (lastChar == "/") || (lastChar == "-") || (lastChar == "+"))) {
                        calculation = removeLastNonInteger(calculation);
                    }

                    // add in a * if a number and a ( have been placed next to each other
                    if ((currentButton == "(") && (!isNaN(Number(lastButton)))) {
                        calculation += "*";
                    }


                    // join the current button text to the calculation
                    calculation += currentButton;
                    // display the button pressed in the calculator
                    mainCalcDisplay(currentButton);

                    // display the current calculation in the smaller display
                    calcTrackDisplay(calculation);
                    // reset the start flag as now in the middle of a calculation
                    startFlag = false;

                } else {



                    // used to ensure numbers are increased in display instead of being wiped   
                    currentDisplay.value = currentDisplay.value + currentButton;
                    calculation += currentButton;
                    calcTrackDisplay(calculation);
                    // reset the start flag as now in the middle of a calculation
                    startFlag = false;

                }

            }


            lastButton = currentButton;

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
    //triggers 1px before the media quer in css
    let mq = window.matchMedia('(max-width: 991px)');
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
    const radDegbutton = document.getElementById("rad-deg-button");
    // set initial load so that rad is on as default start
    let degFlag = false;

    // event listener to toggle the rad button on and deg off
    radDegbutton.addEventListener("click", () => {

        if (degFlag == false) {
            degbutton2.classList.remove("text-secondary");
            radbutton1.classList.add("text-secondary");
            degFlag = true;

        } else if (degFlag == true) {
            radbutton1.classList.remove("text-secondary");
            degbutton2.classList.add("text-secondary");
            degFlag = false;
        }


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
        // uses the secondary class to check if on or off
        // this could be refactored with a flag rather than the secondary check. 
        if (inverse.classList.contains("btn-secondary")) {
            inverse.classList.remove("btn-secondary");
            inverse.classList.add("btn-light");
            inverse.classList.add("border-dark");
        } else {
            inverse.classList.add("btn-secondary");
            inverse.classList.remove("btn-light");
            inverse.classList.remove("border-dark");

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
    DEVELOPMENT ONLY - PRODUCTIION REFACTOR NEEDED: 
        - this currently uses eval which is not safe for production purporses
    */
    function evaluateCalculation(calculation) {
        let result = 0;
        result = calculation
            .replace(/π/g, "Math.PI")
            .replace("√", "Math.sqrt")
            .replace("log(", "Math.log10(") // order important to not impact ln
            .replace("ln(", "Math.log(")
            .replace("EXP", "10**")
            .replace("sin(deg", "sin((Math.PI / 180)*") // order of these is important, sin/cos/tan will be replaced further down
            .replace("tan(deg", "tan((Math.PI / 180)*")
            .replace("cos(deg", "cos((Math.PI / 180)*")
            .replace("sin-1(deg", "(180 / Math.PI)*sin-1(") // order of these is important, sin-1/cos-1/tan-1 will be replaced further down
            .replace("tan-1(deg", "(180 / Math.PI)*tan-1(")
            .replace("cos-1(deg", "(180 / Math.PI)*cos-1(")
            .replace(/e/g, "Math.E") // order important to not impact exp
            .replace("sin(", "Math.sin(")
            .replace("tan(", "Math.tan(")
            .replace("cos(", "Math.cos(")
            .replace("sin-1(", "Math.asin(")
            .replace("tan-1(", "Math.atan(")
            .replace("cos-1(", "Math.acos(")

        console.log("calc:, ", result);
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
        // could use this to provide better output of the tracking display
        // would require some work in refactoring process and maybe new functions
        // e.g. to support 
        display.value = text
            .replace("Math.PI", "π")
            .replace("Math.sqrt", "√")
            .replace("EXP", "E");

        console.log(text)
    }

    // Used to convert the text of a button into its mathematical equivalent with brackets

    function checkText(text) {

        console.log("Screen Display: ", text)
        console.log(text)

        if (text == 'x') {
            if (startFlag == true) {
                // if x is the button pressed and its the start then 0 multiply following number
                return '0*';
            } else {
                return '*';
            }
        } else if (text == '÷') {
            if (startFlag == true) {
                // if ÷ is the button pressed and its the start then 0 ÷ following number
                return '0/';
            } else {
                return '/';
            }
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

    // add a bracket to a key (NOT IN USE: Needs to be refactored as all have slight differences in approach)
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

    //   produce the factorial of a number for X! button
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