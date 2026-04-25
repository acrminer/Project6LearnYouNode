// Baby Steps: Write a program that accepts one or more numbers as command-line arguments
// and prints the sum of those numbers to the console (stdout).
// Source: https://nodejs.org/api/process.html#processargv

// process.argv is an array of strings containing all command-line arguments.
// Index 0 is the path to node itself, index 1 is the path to this script.
// Our actual number arguments start at index 2.

var sum = 0

// Loop starting at index 2 to skip the node executable and script path.
for (var i = 2; i < process.argv.length; i++) {
  // process.argv values are strings, so Number() converts each one to a number
  // before adding it to the sum.
  sum += Number(process.argv[i])
}

console.log(sum)
