let apm_account

function makeAccount() {
  /* develblock:start */
  if (typeof __TESTING__ !== 'undefined' && __TESTING__) {
    return {
      get_token() {
        return 'test_token'
      }
    }
  }
  /* develblock:end */
  let apm_account = new ApmAccount('/apm_accounts')
  if(!apm_account.is_logged_in()) {
    window.location.href = apm_account.log_in_path()
  }
  return apm_account
}

apm_account = makeAccount()

export default apm_account
