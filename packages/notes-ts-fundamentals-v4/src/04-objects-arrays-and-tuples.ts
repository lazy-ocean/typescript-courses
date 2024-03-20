//* Objects

let car: {
  make: string;
  model: string;
  year: number;
} = {
  make: 'toyota',
  model: 'corola',
  year: 2014,
};

//? A function that prints info about a car to stdout
function printCar(car: {
  make: string;
  model: string;
  year: number;
}) {
  console.log(`${car.make} ${car.model} (${car.year})`);
}

printCar(car);

//* Optional properties
function printCar2(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
}) {
  let str = `${car.make} ${car.model} (${car.year})`;
  // typeguard, narrowing
  if (typeof car.chargeVoltage === 'number')
    str += `// ${car.chargeVoltage}v`;

  console.log(str);
}

//? original fn works
printCar2({
  make: 'Honda',
  model: 'Accord',
  year: 2017,
});
//? with optional property as well
printCar2({
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  chargeVoltage: 220,
});

//* Excess property checking
printCar({
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  color: 'RED', //!? EXTRA PROPERTY
});

// but that works, as it is a variable, another scope
const newcar = {
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  color: 'RED', //!? EXTRA PROPERTY
};
printCar(newcar);

//* Index signatures
//? Model as an index signature
const phones1: {
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
} = {};

//? Dictionary of phone #s
const phones: {
  mobile: {
    country: string;
    area: string;
    number: string;
  };
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
} = {
  home: { country: '+1', area: '211', number: '652-4515' },
  work: { country: '+1', area: '670', number: '752-5856' },
  fax: { country: '+1', area: '322', number: '525-4357' },
  // won't work without key = mobile
};

const phones2: {
  mobile: {
    country: string;
    area: string;
    number: string;
  };
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
} = {
  home: { country: '+1', area: '211', number: '652-4515' },
  work: { country: '+1', area: '670', number: '752-5856' },
  fax: { country: '+1', area: '322', number: '525-4357' },
  // good here
  mobile: { country: '+1', area: '322', number: '525-4357' },
};

let opt = phones.mobile;
// all good as it is possible with index signature
let opt2 = phones['boo'];

//*  Array Types

const fileExtensions = ['js', 'ts'];
//        ^? string[]

const cars = [
  //? Let's look at an array of objects
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2002,
  },
];
// Typed:
const cars1: {
  make: string;
  model: string;
  year: number;
}[] = [
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2002,
  },
];

//* Tuples - typed arrays with a pre-defined length and type for each index

let myCar = [
  2002, // Year
  'Toyota', // Make
  'Corolla', // Model
];
const [year, make, model] = myCar; //✔️ Destructuring

//? Inference doesn't work very well for tuples

myCar = ['Honda', 2017, 'Accord', 'Sedan']; //! Wrong convention, but ignored by TypeScript by relying only on typecasrting

let myCar2: [number, string, string] = [2002, 'Toyota', 'Corolla'];
myCar2 = ['Honda', 2017, 'Accord']; //! Wrong convention
myCar2 = [2017, 'Honda', 'Accord', 'Sedan']; //! Too many elements

//*  `readonly` tuples

const numPair: [number, number] = [4, 5]; //✔️ Valid
const numTriplet: [number, number, number] = [7]; //! Invalid

[101, 102, 103].length; //? number[].length, unknown as array not strictly typed, not a tuple
numPair.length; //? [number, number] length, which is a tuple, known length of 2

//! still valid, not going to be intercepted to preserve the length of 2
numPair.push(6); // [4, 5, 6]
numPair.pop(); // [4, 5]
numPair.pop(); // [4]
numPair.pop(); // []

numPair.length; //! ❌ DANGER ❌ still perceived as 2 in typescript intellisense

const roNumPair: readonly [number, number] = [4, 5];
roNumPair.length;

// error, as it is readony
roNumPair.push(6); // [4, 5, 6] //! Not allowed
roNumPair.pop(); // [4, 5] //! Not allowed
roNumPair[1] = 77; // not allowed, readonly
export default {};
