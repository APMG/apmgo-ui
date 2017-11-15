class AuthLayer {
  constructor() {
  }
  getExpiresAt() {
  }
  getName() {
  }
  getToken() {
    /* develblock:start */
    /* global __TESTING__ */
    if (typeof __TESTING__ !== 'undefined' && __TESTING__) {
      return 'test_token'
    }
    /* develblock:end */
  }
  isLoggedIn() {
  }
  logInPath() {
  }
  logOutPath() {
  }
  refresh() {
  }
}

let authLayer = new AuthLayer()

export default authLayer
