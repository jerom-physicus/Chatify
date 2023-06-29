const string = 'split by space';

let usingSplit2 = string.split(' ');
let funList = [];
for (let i = 0; i < 3; i++) {
  const fun = usingSplit2[i];
  funList.push(fun);
}

console.log(funList);

//console.log(usingSplit2[1])

