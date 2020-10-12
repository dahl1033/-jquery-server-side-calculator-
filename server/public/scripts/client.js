$(document).ready(onReady);

function onReady() {
    // event listeners
    $('#submit').on('click', calculate);
    $('#clearInputs').on('click', clearInput);
    $('.operator').on('click', getOperator);
} // end onReady

let operator = '';

// updates our global operator variable from user input on DOM
function getOperator(){
    operator = $(this).text();
} // end getOperator

// a function to clear the input fields on DOM
function clearInput() {
    $('#numInput1').val('');
    $('#numInput2').val('');
}// end clearInput

// POST new calculation object to server and for calculation 
function calculate(){
    // checks to see that all input fields are inputted
    if($('#numInput1').val() == '' || $('#numInput2').val() == ''){
        alert('Please enter numbers for calulation!')
        return false;
    }
    let numbers = {
        inputOne: $('#numInput1').val(),
        operator: operator,
        inputTwo: $('#numInput2').val(),
        answer: null
    }
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: numbers
    }).then(function(response){
        // a GET route to grab the data from the server and to append to DOM
            $('#history').empty();
            $.ajax({
                method: 'GET',
                url: '/calculator'
            }).then(function(response){
                $('#history').empty();
                // append new calculation object to the DOM in history list
                for (let result of response) {
                    $('#history').append(`<li>${result.inputOne}
                                            ${result.operator}
                                            ${result.inputTwo} =
                                            ${result.answer}
                                            </li>
                        `)
                }
                // empty out current answer out put from previous calculation
                $('#resultOutput').empty();
                // append new answer to resultsOutput
                $('#resultOutput').append(`<p>Answer: ${response[0].answer}</p>`);
                })
            })
}// end calculate