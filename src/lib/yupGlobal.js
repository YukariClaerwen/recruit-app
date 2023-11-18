import * as yup from 'yup'
// const REGEX_PASSWORD= /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/
const REGEX_PASSWORD= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
const REGEX_ONLY_NUMBER= /^\d+$/
const REGEX_VN_PHONE_1= /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
const REGEX_VN_PHONE_2= /(84[3|5|7|8|9])+([0-9]{8})\b/g;

yup.addMethod(yup.string, 'password', function (
  message,
) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'onlyNumber', function (
  message,
) {
  return this.matches(REGEX_ONLY_NUMBER, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'phone', function(
  message,
){
  return this.matches((REGEX_VN_PHONE_1 || REGEX_VN_PHONE_2), {
    message,
    excludeEmptyString: true,
  })
})

export default yup
