const string = 'split by space';

let usingSplit2 = string.split(' ');
let funList = [];
for (let i = 0; i < 3; i++) {
  const fun = usingSplit2[i];
  funList.push(fun);
}

console.log(funList);

//console.log(usingSplit2[1])


let list = ['apple','mango','banana','orange']
for (let i = 0; i < list.length; i++) {
  if(list[i].includes('m')){
    console.log('found')
    console.log(i)
  }else{
    console.log("not found")
  }
  
}

