let apm_account

if (typeof __TESTING__ !== undefined && __TESTING__) {
  apm_account = {
    get_token() {
      return 'test_token'
    }
  }
} else {
  apm_account = new ApmAccount('/apm_accounts')
  if(!apm_account.is_logged_in()) {
    window.location.href = apm_account.log_in_path()
  }
}

export default apm_account
