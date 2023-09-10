// Function to simulate an event with biased probabilities
function simulateEvent(outcomes) {
    // Calculate the total probability by summing up the probabilities of all outcomes
    const totalProbability = outcomes.reduce((total, outcome) => total + outcome.probability, 0);

    // Generate a random value between 0 and the total probability(most of the time 100)
    const randomValue = Math.random() * totalProbability;
    let currentProbability = 0;

    // Iterate through the outcomes and select one based on the random value
    for (const outcome of outcomes) {
        currentProbability += outcome.probability;
        if (randomValue < currentProbability) {
            return outcome.value;
        }
    }

    // Return the last outcome in case of rounding errors
    return outcomes[outcomes.length - 1].value;
}

// Function to run the simulation and count outcomes
function runSimulation(outcomes, numOccurrences) {
    const outcomeCounts = {};

    // Repeat the simulation a specified number of times
    for (let i = 0; i < numOccurrences; i++) {
        const outcome = simulateEvent(outcomes);
        outcomeCounts[outcome] = (outcomeCounts[outcome] || 0) + 1;
    }

    return outcomeCounts;
}

// Define the outcomes and their probabilities
const outcomes = [
    { value: "A", probability: 20 },
    { value: "B", probability: 40 },
    { value: "C", probability: 40 }
];

// Number of occurrences to simulate
const numOccurrences = 1000;

// Run the simulation
const outcomeCounts = runSimulation(outcomes, numOccurrences);

// Display the simulation results
console.log("Simulation Results:");
for (const outcome in outcomeCounts) {
    console.log(`Outcome ${outcome}: ${outcomeCounts[outcome]} times`);
}