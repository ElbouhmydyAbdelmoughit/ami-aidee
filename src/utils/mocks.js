/*
Mocks goes here
If this file become too big, make a mock folder and split your mocks in files
*/

export const loginFetchMock = ({ email, password }) => {
  let response = null
  let error = null
  console.log(`${email} | ${password}`)
  if (email && password) {
    response = {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM4YzFjODkyZDRhZjQ2M2NlM2JkYTQyZWU4MDhhZDk3NWE4M2I2NmNlMzg3MzAyOTQ5OWI5MjQwNjU1NzJkYTZhZmUwODVhZWQ0YjQ2NWY0In0.eyJhdWQiOiIxIiwianRpIjoiYzhjMWM4OTJkNGFmNDYzY2UzYmRhNDJlZTgwOGFkOTc1YTgzYjY2Y2UzODczMDI5NDk5YjkyNDA2NTU3MmRhNmFmZTA4NWFlZDRiNDY1ZjQiLCJpYXQiOjE1NjI2NjYxMjUsIm5iZiI6MTU2MjY2NjEyNSwiZXhwIjoxNTYzOTYyMTI0LCJzdWIiOiIxNiIsInNjb3BlcyI6W119.bBdSGAX57F8-TVWpG8aitj8rAa1P3W0UFTM8dnPcn6AHe00HhZ4dzhG2JrtODkIZRak1TN6ahUdd8HqgK9h6vZv9NdnbQNoESmlB041QrXPJ2DsJ2g5SPYMn0aSLfyfXuGlCmkZAgkxryO3bfB6YBuRHqzzUH6SA1dyO_jvN8-x-TJi69kZ0rJIkrZeGiDfBUWgMYQkTHbRlez6r1Ujmc_-lksSa71nyS6YMOueo0OSUOBX9wO1DyNLqVbymksqB_4U9I0AdtrXb23wgBx7ZUx3sR0igtIjGhAo8TaebA-eP2dXPv3SmgmFmpb1Ct06zCDpQhfQQ3wFnuXHS61v75M1he2yFqZ6Q8EmsbRlhZwmbhoSVRhprsG0txwjhu6ysSETVwlzhJnXAZIPVVVinFQl2Y0TZen0HT2HlQ9EBuUhMbvb83kDSXpRmc8GVUl0NgCtnjy4_2CQRzg43ZL1D_7ojkd8Wx-6k0_gfFoX-O660nnkS-_-YEm6cZoSeDT7glsj_xT9AHuUTD9ud-WySOEHbf7NxwXXYZD-W8mb-uGTcdtN6hCJH1LjllcXTahMpNtAtISDRBP3AxU2eH03xxTQaiZAWDDXfGnCdraVmfS1KuSrCPaBiVDiXJ4xHZ_ZeErvto6EPh5tr7IrqmMLBQm7GeXBi1_1Yw-IFehKfTyE',
      expires_in: 1295999,
    }
  } else {
    error = { response: { status: 500 } }
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve([error, response])
    }, 3000)
  })
}
