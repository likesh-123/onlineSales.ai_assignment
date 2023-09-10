# Evaluate multiple mathematical expressions at once using a Web API

Problem Statement:

Write a program that accepts multiple mathematical expressions in bulk and evaluates each of them using any public Web API available. The program should display the result of each expression on the console. Let’s assume that the API only supports 50 requests per second per client whereas your application is expected to evaluate at least 500 expressions per second. Also, the user may initiate more concurrent requests than your application can handle. Suggest an approach to handle this along with the reasoning and implementation of the same.

Rules

- No expressions should be evaluated in the code. All evaluations should be using the Web API.
- You can assume different expressions/operators that are compatible with the API you choose.

Example:

- Some API might use ^ operator for power some might use pow()
  Example
- Input (every line is an expression, evaluate when “end” is provided as an expression)

2 _ 4 _ 4

5 / (7 - 5)

sqrt(5^2 - 4^2)

sqrt(-3^2 - 4^2)

end

Output

2 _ 4 _ 4 => 32

5 / (7 - 5) => 2.5

sqrt(5^2 - 4^2) => 3

sqrt(-3^2 - 4^2) = 5i

## Logic Explanation

- We use the axios library to make HTTP requests to the API. Replace EXPRESSION_API with the actual API endpoint you plan to use in the .env file.
- We maintain a queue of expressions (expressionQueue) to handle concurrency and ensure we don't exceed the API's rate limit.
- We maintain a maxQueueSize to keep track of the maximum number of input that a queue can handle.
- Created a readable and writable stream to take input and console the output of the result.
- We use a recursive function (processQueue) to process expressions from the queue while staying within the rate limit.
- The handleUserInput function reads user input, adds expressions to the queue, and triggers the processing of expressions.
- The program starts by asking the user for their first expression and continues until the user enters "end."

## Handling Concurrency and rate limit

- Queueing User Requests: Created a queue to store the user's requests (in this case, mathematical expressions) as they enter them.
- Processing the Queue: Implementd a function that processes the queue of requests. This function should check if there are requests in the queue and if the maximum allowed concurrent requests have not been reached. If both conditions are met, it can pop a request from the queue and start processing it.
- Handling User Input: When the user enters a request, push it onto the queue and start or continue processing the queue if conditions allow.
- Control Concurrency: Defined maxConcurrentRequests to limit how many requests can be processed simultaneously.

## Installation

Go the the directory and install the dependencies before running the application

install the dependencies

```bash
  npm i
```

run the application

```bash
  node .\mathematical_expression.js
```
