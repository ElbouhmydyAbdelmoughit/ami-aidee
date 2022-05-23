/* eslint-disable no-console */

const { google } = require('googleapis')
const merge = require('deepmerge')
const fs = require('fs')
const path = require('path')
const { execute } = require('./utils/google-api')

const ROW_TO_BEGIN = 2
const COLUMN_TO_BEGIN = 3
const TRANSLATION_LANGUAGES = ['en', 'de', 'es', 'pt', 'nl']
const KEY_SEPARATOR = '.'
const TRANSLATION_DIR = path.join(__dirname, '../translations')
const SPREADSHEET_ID = '1rzkjtb83IZA1zhyUKb7AL9dMAPVL_aV9en2PJ1ZFRjo'

const convertKeySeparators = object => {
  return Object.keys(object).reduce((acc, cur) => {
    const keySeparatorIndex = cur.indexOf(KEY_SEPARATOR)
    if (keySeparatorIndex === -1) {
      return {
        ...acc,
        [cur]: object[cur],
      }
    }
    const firstKey = cur.slice(0, keySeparatorIndex)

    const restKeys = cur.slice(keySeparatorIndex + 1)

    return {
      ...acc,
      [firstKey]: merge(
        typeof acc[firstKey] === 'object' ? acc[firstKey] : {},
        convertKeySeparators({
          [restKeys]: object[cur],
        })
      ),
    }
  }, {})
}

const cellValuesToObject = (array, columnIndex) => {
  const object = array.reduce((acc, cur) => {
    if (cur[columnIndex]) {
      return {
        ...acc,
        [cur[0]]: cur[columnIndex],
      }
    }
    return acc
  }, {})
  return convertKeySeparators(object)
}

function readRemote(auth) {
  const sheets = google.sheets({ version: 'v4', auth })

  const readCallback = (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    TRANSLATION_LANGUAGES.forEach((lng, index) => {
      const translationObj = cellValuesToObject(
        res.data.values,
        COLUMN_TO_BEGIN + index
      )
      console.log(translationObj)
      fs.writeFileSync(
        path.join(TRANSLATION_DIR, lng, 'translation.json'),
        `${JSON.stringify(translationObj, null, 2)}\n`
      )
    })
  }
  const range = `Sheet1!A${ROW_TO_BEGIN}:${String.fromCharCode(
    'A'.charCodeAt(0) + COLUMN_TO_BEGIN + TRANSLATION_LANGUAGES.length - 1
  )}`
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: SPREADSHEET_ID,
      range,
    },
    readCallback
  )
}

execute(readRemote)
