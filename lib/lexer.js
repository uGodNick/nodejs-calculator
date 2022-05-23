const EOF = -1
const allowedSymbols = ["+", "-", "*", "/", "(", ")"]

class Lexer {
  constructor(input) {
    this.inputValue = input.trim()
    this.currentElement = input[0].trim()
    this.currentPosition = 0
  }

  tokenize() {
    const tokens = []

    for (let t = this.nextToken(); t !== EOF; t = this.nextToken()) {
      tokens.push(t)
    }

    return tokens
  }

  nextToken() {
    while (this.currentElement !== EOF) {
      if (this.isSpace(this.currentElement)) {
        this.pass()
        continue
      } else if (this.isSymbol(this.currentElement)) {
        return this.addSymbol()
      } else if (this.isNumber(this.currentElement)) {
        return this.addNumber()
      } else {
        throw "Wrong input: " + this.currentElement
      }
    }

    return EOF
  }

  addSymbol() {
    const symbol = this.currentElement
    this.pass()

    return symbol
  }

  addNumber() {
    const result = []

    do {
      result.push(this.currentElement)
      this.pass()
    } while (this.currentElement === "." || this.isNumber(this.currentElement))

    const num = result.join("")

    if (/^.*\..*\..*$/.test(num)) {
      throw "Wrong value: " + num
    }

    return num
  }

  pass() {
    this.currentPosition++
    if (this.currentPosition < this.inputValue.length) {
      this.currentElement = this.inputValue[this.currentPosition]
    } else {
      this.currentElement = EOF
    }
  }

  isNumber(el) {
    return /^[0-9.]$/.test(el)
  }

  isSpace(el) {
    return /\s/.test(el)
  }

  isSymbol(el) {
    return allowedSymbols.includes(el)
  }
}

export default Lexer
