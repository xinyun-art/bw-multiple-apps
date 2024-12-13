const p = {
  p1: 'p1',
  p2: 'p2'
}

const order = {
  name: 'order',
  '6': 6,
  '5': 5,
  age: 26,
  '09': 9,
  '+9': '+9',
  '7.8': 7.8,
  '7': 7,
  3: 3,
  4: 4,
}
order[Symbol('order1')] = 'so1'
order['gender'] = 'male'
order[Symbol('order2')] = 'so2'

Object.setPrototypeOf(order, p)

Object.defineProperty(order, "age", {
  enumerable: false,
});

console.log('order--', order)

for (const key in order) {
  const v = order[key]
  console.log('key--', key, 'v--', v)
}

const orderKeys = Object.keys(order)
console.log('orderKeys--', orderKeys)