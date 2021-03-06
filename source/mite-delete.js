#!/usr/bin/env node
'use strict'

const program = require('commander')
const miteApi = require('mite-api')

const pkg = require('./../package.json')
const config = require('./config.js')

program
  .version(pkg.version)
  .description('deletes a allready existing time entry')
  .arguments('<timeEntryId>')
  .action((timeEntryId) => {
    const mite = miteApi(config.get())
    mite.deleteTimeEntry(timeEntryId, (err, response) => {
      if (!err) {
        console.log(
          'Successfully deleted time entry with the id "%s"',
          timeEntryId
        );
        process.exit(0);
      }
      console.log('Error while deleting time entry "%s"', timeEntryId);
      if (data) {
        var data = JSON.parse(response);
        console.error(data.error);
        process.exit(1);
        return;
      }
    });
  })
  .parse(process.argv)

if (!program.args.length) {
  program.help()
  process.exit()
}
