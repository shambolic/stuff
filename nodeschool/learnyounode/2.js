var numbers = process.argv;
var sum = 0;
for (i = 2; i < numbers.length; i++) {
   sum += parseInt(numbers[i]);
}
console.log(sum);
//console.log("array is " + numbers +"\nsum is: " + sum);
