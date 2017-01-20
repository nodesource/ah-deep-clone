const test = require('tape')
const deepClone = require('../')

// eslint-disable-next-line no-unused-vars
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

function toMap(array) {
  return array.reduce((map, x) => {
    return map.set(x.id, x)
  }, new Map())
}

test('\nmodifications original are not seen in copy', function(t) {
  const original = toMap([
    { id: 5,
      type: 'TCPWRAP',
      triggerId: 1,
      init: [ 5321000 ],
      before: [ 14580000 ],
      after: [ 15640000 ],
      destroy: [ 15650000 ] },
    { id: 7,
      type: 'TCPWRAP',
      triggerId: 6,
      init: [ 9364000 ],
      before: [ 15774000, 17407000 ],
      after: [ 17102000, 17440000 ],
      destroy: [ 17447000, 17451000 ] },
    { id: 11,
      type: 'SHUTDOWNWRAP',
      triggerId: 10,
      init: [ 15376000 ],
      before: [ 15681000 ],
      after: [ 15754000 ],
      destroy: [ 15762000 ] }
  ])

  const copy = deepClone(original)

  original.delete(5)
  const tcpwrap = original.get(7)
  delete tcpwrap.before
  tcpwrap.after.pop()
  tcpwrap.destroy.push('hello')
  tcpwrap.init = null

  const shutdownwrap = original.get(11)
  shutdownwrap.id++
  shutdownwrap.type = 'schnoodledoodle'

  t.deepEqual(Array.from(original),
    [ [ 7,
        { id: 7,
          type: 'TCPWRAP',
          triggerId: 6,
          init: null,
          after: [ 17102000 ],
          destroy: [ 17447000, 17451000, 'hello' ] } ],
      [ 11,
        { id: 12,
          type: 'schnoodledoodle',
          triggerId: 10,
          init: [ 15376000 ],
          before: [ 15681000 ],
          after: [ 15754000 ],
          destroy: [ 15762000 ] } ] ]
    , 'original shows modifications'
  )
  t.deepEqual(Array.from(copy),
    [ [ 5,
        { id: 5,
          type: 'TCPWRAP',
          triggerId: 1,
          init: [ 5321000 ],
          before: [ 14580000 ],
          after: [ 15640000 ],
          destroy: [ 15650000 ] } ],
      [ 7,
        { id: 7,
          type: 'TCPWRAP',
          triggerId: 6,
          init: [ 9364000 ],
          before: [ 15774000, 17407000 ],
          after: [ 17102000, 17440000 ],
          destroy: [ 17447000, 17451000 ] } ],
      [ 11,
        { id: 11,
          type: 'SHUTDOWNWRAP',
          triggerId: 10,
          init: [ 15376000 ],
          before: [ 15681000 ],
          after: [ 15754000 ],
          destroy: [ 15762000 ] } ] ]
    , 'copy shows no modifications'
  )

  t.end()
})
