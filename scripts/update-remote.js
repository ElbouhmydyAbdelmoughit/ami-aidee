/* eslint-disable no-console */
const chalk = require('chalk')
const { google } = require('googleapis')

const ROW_TO_BEGIN = 2
const SPREADSHEET_ID = '1rzkjtb83IZA1zhyUKb7AL9dMAPVL_aV9en2PJ1ZFRjo'

const source = require('../translations/fr/translation.json')
const { execute } = require('./utils/google-api')

const newObj = {}

const recTraverse = (object, prefix = '') => {
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'string') {
      newObj[`${prefix}${key}`] = object[key]
      return
    }
    recTraverse(object[key], `${prefix}${key}.`)
  })
}

const sortAlphabetically = (a, b) => a.localeCompare(b)

const cellValuesToObject = array => {
  const object = array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur[0]]: cur,
    }),
    {}
  )
  return object
}

function updateRemote(auth) {
  recTraverse(source)

  const sheets = google.sheets({ version: 'v4', auth })

  const readCallback = (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    const oldObj = cellValuesToObject(res.data.values)

    const allKeys = [
      ...new Set([...Object.keys(newObj), ...Object.keys(oldObj)]),
    ].sort(sortAlphabetically)

    console.log(
      '* %d old keys, %s new keys',
      res.data.values.length,
      Object.keys(newObj).length
    )
    const newCellValues = allKeys.map(key => {
      if (!oldObj[key]) {
        // insert new key
        console.log('* Insert new key %s', key)
        return [key, 'Active', newObj[key], '', '']
      }
      if (!newObj[key]) {
        // mark old key as Unused
        console.log('* Mark remote key as Unused %s', key)
        const result = oldObj[key]
        result[1] = 'Unused'
        return [
          result[0],
          'Unused',
          result[2],
          result[3] || '',
          result[4] || '',
        ]
      }
      if (oldObj[key][1] !== 'Active') {
        // mark used key as Active
        console.log('* Mark remote key as Active %s', key)
        const result = oldObj[key]
        result[1] = 'Active'
        return result
      }
      if (newObj[key] !== oldObj[key][2]) {
        // conflict, print to screen for resolution
        console.log(
          chalk.red(
            '* Conflict between source defaultValue and Google Sheets: please fix now\nKey: %s\nRemote value:\n%s\nLocal value:\n%s\n\n'
          ),
          key,
          oldObj[key][2] && oldObj[key][2].replace(/\n/g, '\\n'),
          newObj[key] && newObj[key].replace(/\n/g, '\\n')
        )
        // keep Google Sheets value
        return oldObj[key]
      }

      return [
        oldObj[key][0],
        oldObj[key][1],
        oldObj[key][2],
        // we need this otherwise untranslated values will be mistakenly filled
        // with translations from lower row cells
        oldObj[key][3] || '',
        oldObj[key][4] || '',
      ]
    })

    sheets.spreadsheets.values.update(
      {
        spreadsheetId: SPREADSHEET_ID,
        resource: {
          values: newCellValues,
        },
        range: `Sheet1!A${ROW_TO_BEGIN}:E`,
        valueInputOption: 'RAW',
      },
      error => {
        if (error) {
          return console.log('The API returned an error: ' + error)
        }
        // console.log(res);
      }
    )
  }
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet1!A${ROW_TO_BEGIN}:E`,
    },
    readCallback
  )
}

execute(updateRemote)
