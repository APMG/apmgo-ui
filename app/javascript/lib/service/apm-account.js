const apm_account = new ApmAccount('/apm_accounts')
if(!apm_account.is_logged_in()) {
  window.location.href = apm_account.log_in_path()
}

export default apm_account
