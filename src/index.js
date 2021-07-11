import { compose, pipe } from "lodash/fp";

let input = "       JavaScript      ";
let output1 = "<div>" + input.trim() + "</div>";

const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`
const toLowerCase = str => str.toLowerCase();

const result = wrapInDiv(toLowerCase(trim(str)));

// to avoid such function nesting and parentheses, we can use compose, and feed the functions in order from right to left, 
// or use pipe function in the opposite order.
const transform1 = compose(wrapInDiv, toLowerCase, trim);
const transform2 = pipe(trim, toLowerCase, wrapInDiv);
let output2 = transform1(input);
let output3 = transform2(input);

// all three of output1, output2 and output3 will give same result.