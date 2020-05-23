const getUserAbbr = user => {
  const firstLetterFirstname = user.firstname ? user.firstname[0] : ''
  const firstLetterLastname = user.lastname ? user.lastname[0] : ''
  return `${firstLetterFirstname}${firstLetterLastname}`
}

export { getUserAbbr }
