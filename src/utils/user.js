const getUserAbbr = user => {
  const firstLetterFirstname = user.firstname ? user.firstname[0] : ''
  const firstLetterLastname = user.lastname ? user.lastname[0] : ''
  return `${firstLetterFirstname}${firstLetterLastname}`
}

const getUserDisplayName = user => {
  if (user.surname) {
    return user.surname
  }
  return `${user.firstname} ${user.lastname}`
}

export { getUserAbbr, getUserDisplayName }
