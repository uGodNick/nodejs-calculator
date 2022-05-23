import Calculator from "../lib/calculator.js"
import Lexer from "../lib/lexer.js"

describe("Calculator testing", () => {
  const calculator = new Calculator()

  it("Addition", () => {
    const enteredValue = "1 + 1"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(2)
  })

  it("Subtraction", () => {
    const enteredValue = "2 - 1"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(1)
  })

  it("Multiplication", () => {
    const enteredValue = "2 * 2"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(4)
  })

  it("Divition", () => {
    const enteredValue = "6 / 2"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(3)
  })

  it("Negative value", () => {
    const enteredValue = "1 - 2"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(-1)
  })

  it("Parenthesis precedence", () => {
    const enteredValue = "(2 + 4) * (4 + 2)"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(36)
  })

  it("Unclosed left parenthesis", () => {
    const enteredValue = "(2 + 4) * (4 + 2"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(() => calculator.calculate(tokens)).toThrow(
      "The parentheses are not closed"
    )
  })

  it("Unclosed right parenthesis", () => {
    const enteredValue = "(2 + 4) * 4 + 2)"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(() => calculator.calculate(tokens)).toThrow(
      "The parentheses are not closed"
    )
  })

  it("Incorrect operators", () => {
    const enteredValue = "2 % 2"

    expect(() => new Lexer(enteredValue).tokenize()).toThrow("Wrong input: %")
  })

  it("Unknown value", () => {
    const enteredValue = "2 . 2"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(() => calculator.calculate(tokens)).toThrow(
      'Unknown value: ["2",".","2"]'
    )
  })

  it("Wrong value", () => {
    const enteredValue = "2.21.23 + 2"

    expect(() => new Lexer(enteredValue).tokenize()).toThrow(
      "Wrong value: 2.21.23"
    )
  })

  it("Precedence operators", () => {
    const enteredValue = "2 + 4 * 4 + 2 / 1"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(20)
  })

  it("Fractional numbers", () => {
    const enteredValue = "2.1 * 2.3 / 3.5 + 4.2 - 4.1"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(1.4800000000000004)
  })

  it("Use exponent notation", () => {
    const enteredValue = "999999999999999 * 999999999999999"
    const tokens = new Lexer(enteredValue).tokenize()

    expect(calculator.calculate(tokens)).toBe(9.99999999999998e29)
  })
})
