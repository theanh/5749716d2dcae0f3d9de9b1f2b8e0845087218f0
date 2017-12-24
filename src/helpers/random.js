// Algorithm https://en.wikipedia.org/wiki/Rejection_sampling
// References
// 1. https://softwareengineering.stackexchange.com/questions/150616/return-random-list-item-by-its-weight
// 2. http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
function weightedRand(spec) {
  var i, j, table=[];
  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (j=0; j<spec[i]*10; j++) {
      table.push(i);
    }
  }
  
  return function() {
    return table[Math.floor(Math.random() * table.length)];
  };
}

// function generateRandom(items) {
//   return () => items[Math.floor(Math.random() * items.length)];
//   // var i, sum=0, r=Math.random();
//   // for (i in spec) {
//   //   sum += spec[i];
//   //   if (r <= sum) return i;
//   // }
// }

module.exports = {weightedRand};
