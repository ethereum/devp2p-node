'use strict'
const devp2p = require('../lib')
const chalk = require('chalk')

const PRIVATE_KEY = 'd772e3d6a001a38064dd23964dd2836239fa0e6cec8b28972a87460a17210fe9'
const BOOTNODES = [
  { address: '52.16.188.185', udpPort: 30303, tcpPort: 30303 },
  { address: '54.94.239.50', udpPort: 30303, tcpPort: 30303 },
  { address: '52.74.57.123', udpPort: 30303, tcpPort: 30303 }
]

const dpt = new devp2p.DPT(new Buffer(PRIVATE_KEY, 'hex'), {
  endpoint: {
    address: '0.0.0.0',
    udpPort: null,
    tcpPort: null
  }
})

dpt.on('error', (err) => console.error(chalk.red(err)))

dpt.on('peer:add', (peer) => {
  let info = `(${peer.id.toString('hex')},${peer.address},${peer.udpPort},${peer.tcpPort})`
  console.log(chalk.green(`New peer: ${info} (total: ${dpt.getPeers().length})`))
})

dpt.on('peer:remove', (peer) => {
  console.log(chalk.yellow(`Remove peer: ${peer.id.toString('hex')} (total: ${dpt.getPeers().length})`))
})

// for accept incoming connections uncomment next line
// dpt.bind(30303, '0.0.0.0')

for (let bootnode of BOOTNODES) {
  dpt.bootstrap(bootnode, (err) => {
    if (err) console.error(chalk.bold.red(err))
  })
}
