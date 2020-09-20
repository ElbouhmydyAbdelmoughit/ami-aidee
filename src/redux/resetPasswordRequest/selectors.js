const ResetPasswordRequestSelectors = {
  isLoading: state => state.resetPasswordRequest.loading,
  getByResetCode: (state, resetCode) => {
    const list = Object.values(state.resetPasswordRequest.list)
    return list.find(item => item.code === resetCode)
  },
}

export default ResetPasswordRequestSelectors
