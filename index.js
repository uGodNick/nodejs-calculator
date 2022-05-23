import { createInterface } from "readline"
import Calculator from "./lib/calculator.js"
import Lexer from "./lib/lexer.js"

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.setPrompt("Enter an expression: ")
readline.prompt()
const calculator = new Calculator()

readline
  .on("line", (line) => {
    try {
      const tokens = new Lexer(line).tokenize()
      const result = calculator.calculate(tokens)

      console.log("=> ", result)
    } catch (e) {
      console.log("Error:", e)
    }
    readline.prompt()
  })
  .on("close", () => {
    console.log("\nShutdown...")
    process.exit(0)
  })
