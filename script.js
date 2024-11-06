/*
Author: Nathaniel David Crossan
File description: This is the javascript file for the index.html file that provides 
                  the event-driven capabilities of the website and ecrypts the user input with the
                  caesar_cipher and square_cipher functions.
*/

// global const variables of elements
const inputElement = document.getElementById("userText");
const rangeElement = document.getElementById("shift");
const btnElement = document.getElementById("updateSquare");
const rangeDisplay = document.getElementById("rangeValue");

// function to generate array of alphabetic letters
function get_alphabet() {
    let alphabetArr = [];

    for (i = 0; i < 26; i++) {
        alphabetArr.push(String.fromCharCode(i+65));
    }
    return alphabetArr;
}

// function to get grid characters
function get_grid_letters() {
    let gridArray = [];

    // collect grid values
    for (i = 1; i < 26; i++) {
        let gridVal = document.getElementById("gridItem"+i);
        gridArray.push(gridVal.innerText);
    }
    return gridArray;
}

function display_grid_text(gridArray) {
    for (i = 1; i < 26; i++) {
        let gridVal = document.getElementById("gridItem"+i);
        gridVal.innerText = gridArray[i-1];
    }
}

// function to shuffle array
function shuffle_array() {
    let gridArray = get_grid_letters();

    let currentIndex = gridArray.length;

    // shuffle algorithm via stackoverflow: https://stackoverflow.com/a/2450976
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [gridArray[currentIndex], gridArray[randomIndex]] = [gridArray[randomIndex], gridArray[currentIndex]];
    }
    // display new randomized grid
    display_grid_text(gridArray);
}

function display_encrypted_text(elementID, encryptedText) {
    const squareDivElement = document.getElementById(elementID);
    squareDivElement.innerText = encryptedText;
}

// function for caesar cipher encryption
function caesar_cipher() {
    let plainText = inputElement.value.toLowerCase();
    let shift = Number(rangeDisplay.innerText);
    const alphabetArr = get_alphabet();
    let encryptedText = "";

    // iterate over user input
    for (i = 0; i < plainText.length; i++) {
        if ((is_letter(plainText[i])) || (plainText[i].toLowerCase() == "z")) { // shift letter if alphabetic
            currentShift = (plainText[i].charCodeAt(0) - "a".charCodeAt(0));
            currentShift += shift;
            currentShift = currentShift % 26;
            encryptedText += alphabetArr[currentShift];
        }
        else { // keep character if non-alphabetic
            encryptedText += plainText[i];
        }
    }
    display_encrypted_text("caesar", encryptedText);
}

// function for square cipher encrpytion
function square_cipher() {
    let plainText = inputElement.value.toLowerCase();
    let randomizedLetters = get_grid_letters();
    let encryptedText = "";

    // iterate over user input
    for (i = 0; i < plainText.length; i++) {
        if (is_letter(plainText[i])) { // check if current character is letter and not "z"
            encryptedText += randomizedLetters[plainText[i].charCodeAt(0) - "a".charCodeAt(0)]; // map letter through ascii values
        }
        else {
            encryptedText += plainText[i].toUpperCase();
        }
    }
    display_encrypted_text("square", encryptedText);
}

function is_letter(str) {
    return str.length == 1 && str.match(/[a-y]/i);
}

function update_range_value() {
    rangeDisplay.innerText = rangeElement.value;
}

// event handler functions below:
function oninput_event_handler() {
    caesar_cipher();
    square_cipher();
}

function range_event_handler() {
    update_range_value();
    caesar_cipher();
}

function btn_event_handler() {
    shuffle_array();
    square_cipher();
}

inputElement.addEventListener("input", oninput_event_handler);
btnElement.addEventListener("click", btn_event_handler);
rangeElement.addEventListener("input", range_event_handler);
rangeElement.addEventListener("input", update_range_value);