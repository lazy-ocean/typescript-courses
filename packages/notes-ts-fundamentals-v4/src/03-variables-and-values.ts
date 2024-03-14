//* Variable Declarations & Inference
let temperature = 6; //! inference
temperature = 'warm'; //! type-checking
temperature = 7; //✔️ - number to number

const humidity = 79; //! literal type

//* A type as a set of allowed values
temperature = 23; //✔️ (1)  - re-assignability of a let
temperature = humidity; //! (2) - type-checking
humidity = temperature; //! (3) - number is not of type `79`
humidity = 79; //✔️ (4) - 79 is of type `79`
humidity = 78; //! (5) - 78 is not of type `79`

let temp2 = 19; //! temp2's type is { all numbers }
let humid2 = 79 as const; //! humidity's type is { 79 }
temp2 = 23; //! Is each member in { 23 } also in { all numbers }?
temp2 = humid2; //! Is each member in { 79 } also in { all numbers }?
humid2 = temp2; //! Is each member in { all numbers } also in { 79 }?
humid2 = 79; //! Is each member in { 79 } also in { 79 }
humid2 = 78; //! Is each member in { 78 } also in { 79 }

//* Implicit `any` and type annotations
// between 500 and 1000
export const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;

let startTime = new Date();
let endTime: Date;

setTimeout(() => {
  endTime = 0; //! 0 isn't of type Date
  endTime = new Date();
}, RANDOM_WAIT_TIME);

//* Type Casting
let frontEndMastersFounding = new Date('Jan 1, 2012');
let date1 = frontEndMastersFounding;
let date2 = frontEndMastersFounding as any;

date1 = 3; //! 3 isn't of inferred type Date
date1 = 'date'; //! 'date' isn't of inferred type Date
date1 = new Date('09/20/10'); //✔️ good cause it is a valid date

// this all works cause of the assertion "as any", so date2 could be any
date2 = 3;
date2 = 'date';
date2 = new Date('09/20/10');

const humid3 = 79 as number; //✔️ is 79 a number? If so, this is safe!

let date3 = 'oops' as any as Date; //! TypeScript thinks this is a Date now, but it's really a string
date3.toISOString(); //! what do we think will happen when we run this? 💥 fails
date3 = 'date'; //! gets asserted as date, so assigning the actually right argument won't work

let date4 = 'oops' as Date; // string 'oops' is too different to be asserted to Date immediately.

//! Function arguments and return values

// no types
function add(a, b) {
  return a + b; // strings? numbers? a mix?
}
const result = add(3, '4'); //✔️ expecting any arguments, so works
const p = new Promise(result); //✔️ expecting any return result, so also works

// typed
function add2(a: number, b: number): number {
  return a + b; // strings? numbers? a mix?
}

const result2 = add2(3, '4'); //! do not expect b as string
const p2 = new Promise(result2); //! number is not a function, which would be expected in a Promise constructor

/**/

export default {};
