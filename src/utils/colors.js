const dawnColor = ['#BEDDFC', '#EFEEF3', '#FEF7E4', '#FDF2D6']
const sunColor = ['#3EA2E8', '#44BCFC', '#87CFFF', '#BEDDFC']
const duskColor = ['#C6D9BC', '#DBCFA5', '#E7BF8E', '#DCA27F']
const nightColor = ['#012D5B', '#19689F', '#4F94BB', '#A7BCBC']

const getGradientColors = time => {
  let color
  switch (time) {
    case 'DAWN':
      color = dawnColor
      break
    case 'SUN':
      color = sunColor
      break
    case 'DUSK':
      color = duskColor
      break
    case 'NIGHT':
      color = nightColor
      break
    default:
      color = dawnColor
      break
  }
  return color
}

const getTextColor = time => {
  if (time === 'DAWN') {
    return '#848484'
  }
  if (time === 'SUN' || time === 'DUSK') {
    return '#00000077'
  }
  return '#fff'
}

const colorUtils = {
  getTextColor,
  getGradientColors,
}
export { getGradientColors }
export default colorUtils
