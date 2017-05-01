var prefix = '/apm_accounts'; // This is the place you mounted the engine in your routes.
var apm_account = new ApmAccount(prefix);
if(!apm_account.is_logged_in()) {
  window.location.href = apm_account.log_in_path() // The path to which a user should be redirected to log in
}
apm_account.log_out_path() // The path to which a user should be redirected to log out
apm_account.refresh() // => A promise which returns when the token is refreshed
// The rest of these return Null if not logged in.
console.log(
  apm_account.get_name(), // => 'John Doe'
  apm_account.get_uid(), // => '123456', the Public ID of the user in APM Accounts
  apm_account.get_token(), // The access token
  apm_account.get_expires_at() // Datetime of when the token expires
)
