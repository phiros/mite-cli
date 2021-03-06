#!/usr/bin/env node
'use strict'

const fs = require('fs')
const program = require('commander')

const pkg = require('./../package.json')
const config = require('./config.js')

program
  .version(pkg.version)

program
  .command('set [key] [value]')
  .description('set a configuration variable')
  .action((key, value) => {
    config.set(key, value)
    config.save((err) => {
      if (err) {
        console.error(err.message)
        process.exit(1)
        return
      }
      console.log(`successfully set "${key}" to "${value}"`)
      // make sure file is only write- and readable by the user
      const configFilename = config.stores.file.file
      fs.chmodSync(configFilename, 0o600)
    })
  })

program.command('get [key]')
  .description('get a configruation variable’s value')
  .action((key) => console.log(config.get(key)))

program.command('list')
  .description('list all currently defined config vars')
  .action(() => console.log(config.get()))

program.parse(process.argv)

if (!program.args.length) {
  program.help()
  process.exit()
}
