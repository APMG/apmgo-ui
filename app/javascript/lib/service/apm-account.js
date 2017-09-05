let apmAccount

function makeAccount () {
  /* develblock:start */
  /* global __TESTING__ */
  /* global ApmAccount */
  if (typeof __TESTING__ !== 'undefined' && __TESTING__) {
    return {
      get_token () {
        return 'test_token'
      }
    }
  }
  /* develblock:end */
  let apmAccount = new ApmAccount('/apm_accounts')
  if (!apmAccount.is_logged_in()) {
    window.location.href = apmAccount.log_in_path()
  }
  return apmAccount
}

apmAccount = makeAccount()

export default apmAccount
