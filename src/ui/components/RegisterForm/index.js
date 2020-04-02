import { connect } from "react-redux"
import RegisterForm from "./RegisterForm"
import { RegisterActions } from "../../../redux/register"

const mapStateToProps = state => ({
  registerUser: state.register.data,
})

const mapDispatchToProps = dispatch => ({
  setRegisterUser: data => dispatch(RegisterActions.setResiterUser(data)),
  clearRegisterUser: () => dispatch(RegisterActions.clearRegisterUser()),
  requestRegistration: () => dispatch(RegisterActions.registerRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
