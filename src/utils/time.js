import moment from 'moment'

const getDatestamp = () => {
  return moment().format('YYYY-MM-DD')
}

export { getDatestamp }
