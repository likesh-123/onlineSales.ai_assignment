const axios = require('axios');
const readline = require('readline');

const API_ENDPOINT = process.env.EXPRESSION_API; // Put the API uri in the EXPRESSION_API in .env file

const maxConcurrentRequests = 50; // API's rate limit
const maxQueueSize = 100; // Maximum number of expressions to queue

// creating a readable and writable stream
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// array for storing the input and keep track of the queue
const expressionQueue = [];
let activeRequests = 0;

// Function to make API requests
async function evaluateExpression(expression) {
    try {
        // storing the result with the api call
        const response = await axios.post(API_ENDPOINT, { expression });
        return response.data.result;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// Function to process the next expression in the queue
async function processQueue() {
    // here if the queue is empty or the activeRequests is greater than or equal to the maxConcurrentRequests that input should wait in the queue
    if (expressionQueue.length === 0 || activeRequests >= maxConcurrentRequests) {
        return;
    }

    // get the first element from the queue and remove it
    const expression = expressionQueue.shift();
    // increment the active request to keep track of the maxConcurrentRequests
    activeRequests++;

    const result = await evaluateExpression(expression);
    console.log(`${expression} => ${result}`);

    // decrement the active request
    activeRequests--;
    // recursively call the processQueue untill queue gets empty
    processQueue();
}

// Function to handle user input
function handleUserInput(input) {
    // checking if the user wants to end the input
    if (input.trim().toLowerCase() === 'end') {
        rl.close();
        return;
    }

    // If Queue is full with the number of request, need to wait untill the queue is free to take up the api request call
    if (expressionQueue.length >= maxQueueSize) {
        console.log('Queue is full. Please wait for some expressions to be processed.');
    } else {
        // if the queue is not full just enter the input into the queue to process the expression
        expressionQueue.push(input);
        processQueue();
    }

    // recursive call for the input untill the user enters 'end'
    rl.question('Enter another expression or "end" to finish: ', handleUserInput);
}

console.log('Enter mathematical expressions one by one, or "end" to finish:');
rl.question('Enter your first expression: ', handleUserInput);
