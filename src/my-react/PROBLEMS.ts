// TEST
interface XComplex {
  value: X
}
type X = string | XComplex

interface YComplex {
  value: Y
}
type Y = string | YComplex

function transform(v: string): string
function transform(v: XComplex): YComplex
function transform(v: X): Y
function transform(x: X): Y {
  if (typeof x === "string") {
    return x
  }

  const xValue: X = x.value

  return {
    value: transform(xValue), // <---- **ERROR**
  }
}

// **ERROR**
// [ts]
// Argument of type 'X' is not assignable to parameter of type 'XComplex'.
//   Type 'string' is not assignable to type 'XComplex'.

// WITH OVERLOADING
const yString1: string = transform("hello")
const yComplex1: YComplex = transform({ value: "xValue" })
// WITHOUT OVERLOADING
const yString2: Y = transform("hello")
const yComplex2: Y = transform({ value: "xValue" })
