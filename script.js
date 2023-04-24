function findMinimumCostOfRopes(ropeLengths) {
  // Convert the comma-separated string of rope lengths to an array of integers
  const ropes = ropeLengths.split(',').map(Number);
  
  // Initialize a priority queue with the rope lengths as the keys
  const pq = new PriorityQueue();
  for (let i = 0; i < ropes.length; i++) {
    pq.insert(ropes[i], ropes[i]);
  }
  
  // Combine the ropes until there is only one left
  let totalCost = 0;
  while (pq.size() > 1) {
    const min1 = pq.delMin();
    const min2 = pq.delMin();
    const combinedLength = min1.key + min2.key;
    totalCost += combinedLength;
    pq.insert(combinedLength, combinedLength);
  }
  
  return totalCost;
}

class PriorityQueue {
  constructor() {
    this.pq = [null];
    this.n = 0;
  }
  
  size() {
    return this.n;
  }
  
  less(i, j) {
    return this.pq[i].priority < this.pq[j].priority;
  }
  
  swap(i, j) {
    [this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]];
  }
  
  swim(k) {
    while (k > 1 && this.less(k, Math.floor(k / 2))) {
      this.swap(k, Math.floor(k / 2));
      k = Math.floor(k / 2);
    }
  }
  
  sink(k) {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.less(j + 1, j)) j++;
      if (!this.less(j, k)) break;
      this.swap(k, j);
      k = j;
    }
  }
  
  insert(key, val) {
    this.pq[++this.n] = { key, val, priority: Math.random() };
    this.swim(this.n);
  }
  
  delMin() {
    const min = this.pq[1];
    this.swap(1, this.n--);
    this.sink(1);
    this.pq[this.n + 1] = null;
    return min;
  }
}

const form = document.querySelector('form');
const input = document.querySelector('#rope-lengths');
const result = document.querySelector('#result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const ropeLengths = input.value;
  const minimumCost = findMinimumCostOfRopes(ropeLengths);
  result.textContent = `Minimum cost: ${minimumCost}`;
});