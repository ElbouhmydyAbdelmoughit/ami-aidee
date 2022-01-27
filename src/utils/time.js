import moment from 'core/moment'

const getDatestamp = () => {
  return moment().format('YYYY-MM-DD')
}

export { getDatestamp }
