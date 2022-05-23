class Calculator {
  calculate(tokens) {
    return this.eval(this.parse(tokens))
  }

  parse(tokens) {
    return this.parseHelper(tokens)
  }

  parseHelper(tokens) {
    this.handleParenExpressions(tokens)
    const operators = ["-", "+", "*", "/"]

    let tokenOperatorIdx
    let i

    for (i = 0; i < operators.length; i++) {
      tokenOperatorIdx = tokens.indexOf(operators[i])
      if (tokenOperatorIdx > -1) break
    }

    if (tokenOperatorIdx > -1) {
      return {
        type: "operator",
        value: operators[i],
        left: this.parseHelper(tokens.slice(0, tokenOperatorIdx)),
        right: this.parseHelper(
          tokens.slice(tokenOperatorIdx + 1, tokens.length)
        ),
      }
    } else if (tokens.length === 1 && ["expr"].indexOf(tokens[0].type) > -1) {
      return tokens[0]
    } else if (tokens.length === 1 && /[-0-9.]+/.test(tokens[0])) {
      return { type: "number", value: parseFloat(tokens[0]) }
    }
    throw "Unknown value: " + JSON.stringify(tokens)
  }

  handleParenExpressions(tokens) {
    let leftParenIdx
    let rightParenIdx

    do {
      leftParenIdx = tokens.indexOf("(")
      rightParenIdx = tokens.indexOf(")")
      if (leftParenIdx > -1) {
        let rightParenIdx = this.findMatchingParen(tokens, leftParenIdx)
        let expr = this.parseParenExpr(
          tokens.slice(leftParenIdx + 1, rightParenIdx)
        )
        tokens.splice(leftParenIdx, rightParenIdx - leftParenIdx + 1, expr)
      } else if (rightParenIdx > -1) {
        throw "The parentheses are not closed"
      }
    } while (leftParenIdx > -1)
  }

  findMatchingParen(tokens, lparenIdx) {
    let parenStack = 1
    let i = lparenIdx + 1

    while (i < tokens.length && parenStack > 0) {
      if (tokens[i] === "(") {
        parenStack += 1
      } else if (tokens[i] === ")") {
        parenStack -= 1
      }
      i++
    }

    if (parenStack === 0) return i - 1
    else throw "The parentheses are not closed"
  }

  parseParenExpr(tokens) {
    return { type: "expr", subtree: this.parseHelper(tokens) }
  }

  eval(node, env = {}) {
    if (node.type === "number") {
      return node.value
    } else if (node.type === "expr") {
      return this.eval(node.subtree, env)
    } else if (node.type === "assignment") {
      env[node.varName] = this.eval(node.expr, env)
      return env[node.varName]
    } else if (node.type === "variable") {
      if (typeof env[node.varName] === "undefined") {
        throw "Invalid variable input: " + node.varName
      }
      return env[node.varName]
    } else if (node.type === "operator") {
      let left = this.eval(node.left, env)
      let right = this.eval(node.right, env)

      switch (node.value) {
        case "-":
          return left - right
        case "+":
          return left + right
        case "*":
          return left * right
        case "/":
          return left / right
        default:
          throw "Invalid operator input: " + node.value
      }
    }
  }
}

export default Calculator
