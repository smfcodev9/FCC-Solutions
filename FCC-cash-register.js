let denom = [
["ONE HUNDRED", 100],
["TWENTY", 20],
["TEN", 10],
["FIVE", 5],
["ONE", 1],
["QUARTER", 0.25],
["DIME", 0.1],
["NICKEL", 0.05],
["PENNY", 0.01]
];

function checkCashRegister(price, cash, cid) {
let output = {status: null, change: []};
let change = cash - price;
let totalCid = Math.round(cid.reduce( (acc, cur) => acc + cur[1], 0)*100)/100
let changeArr = [];
let reversedCid = cid.slice().reverse();
if (change === totalCid) {
  output.status = 'CLOSED';
  output.change = cid;
  return output;
}

if (totalCid < change) {
  output.status = 'INSUFFICIENT_FUNDS';
  return output;
}

for (let i=0; i<denom.length; i++) {
  let value = 0;
  while (reversedCid[i][1]>0 && denom[i][1]<=change) {
    change -= denom[i][1];
    reversedCid[i][1] -= denom[i][1];
    value += denom[i][1];
    change = Math.round(change * 100) / 100;
  }
  if (value > 0) {
    changeArr.push( [ denom[i][0], value ]);
  }
}
if (changeArr.length < 1 || change > 0) {
  output.status = 'INSUFFICIENT_FUNDS';
  return output;
}
output.status = 'OPEN';
output.change = changeArr;
return output;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
