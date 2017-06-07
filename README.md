# README

This project uses rbenv to manage its Ruby version.

# SSL certificate creation

Following [this guide](https://jamielinux.com/docs/openssl-certificate-authority/index.html) about acting as your own certificate authority, generate SSL certificates for the development site.

First, you will need to follow the instructions for creating the root key using the provided configuration file and instructions. On macOS Sierra you should substitute `/root/ca` with `/Users/yourusername/Documents/Certs/CA`. Replace the section headed `Optionally, specify some defaults.` with your preferred defaults.

There are three files involved in generating SSL certificates for this project: `Makefile`, `req_config.sh` and `intermediate/openssl.cnf`

They should be placed in the root directory of your local certificate authority. On macOS Sierra this is: `/Users/yourusername/Documents/Certs/CA`

Replace `yourusername` and `yourdomain` with appropriate values. The `DOMAIN` environment variable should be set to `bragi.dev`.

`Makefile`:
```make
.PHONY: cert check-env

cert: check-env
    openssl genrsa -out intermediate/private/$(DOMAIN).key.pem 4096
    cat intermediate/openssl.cnf > .tmp.cnf
    ./req_config.sh >> .tmp.cnf
    openssl req -key intermediate/private/$(DOMAIN).key.pem -new -sha256 -out intermediate/csr/$(DOMAIN).csr.pem -config .tmp.cnf
    rm .tmp.cnf
    openssl ca -config intermediate/openssl.cnf -extensions server_cert -days 375 -notext -md sha256 -in intermediate/csr/$(DOMAIN).csr.pem -out intermediate/certs/$(DOMAIN).cert.pem

check-env:
ifndef DOMAIN
    $(error DOMAIN is undefined)
endif
```

`req_config.sh`:
```shell
```cat <<-EOF
[ dn ]
C = US
ST = Minnesota
L = St. Paul
O = MPR
OU = Software Engineering
emailAddress = yourusername@yourdomain.org
CN = $DOMAIN

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = $DOMAIN
EOF```
```

`intermediate/openssl.cnf`:
```conf
[ ca ]
# `man ca`
default_ca = CA_default
[ CA_default ]
# Directory and file locations.
dir               = /Users/yourusername/Documents/Certs/CA/intermediate
certs             = $dir/certs
crl_dir           = $dir/crl
new_certs_dir     = $dir/newcerts
database          = $dir/index.txt
serial            = $dir/serial
RANDFILE          = $dir/private/.rand
# The root key and root certificate.
private_key       = $dir/private/intermediate.key.pem
certificate       = $dir/certs/intermediate.cert.pem
# For certificate revocation lists.
crlnumber         = $dir/crlnumber
crl               = $dir/crl/intermediate.crl.pem
crl_extensions    = crl_ext
default_crl_days  = 30
# SHA-1 is deprecated, so use SHA-2 instead.
default_md        = sha256
name_opt          = ca_default
cert_opt          = ca_default
default_days      = 30
preserve          = no
policy            = policy_loose
copy_extensions = copy
[ policy_strict ]
# The root CA should only sign intermediate certificates that match.
# See the POLICY FORMAT section of `man ca`.
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional
[ policy_loose ]
# Allow the intermediate CA to sign a more diverse range of certificates.
# See the POLICY FORMAT section of the `ca` man page.
countryName             = optional
stateOrProvinceName     = optional
localityName            = optional
organizationName        = optional
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional
[ req ]
# Options for the `req` tool (`man req`).
default_bits        = 2048
# distinguished_name  = req_distinguished_name
string_mask         = utf8only
# SHA-1 is deprecated, so use SHA-2 instead.
default_md          = sha256
# Extension to add when the -x509 option is used.
x509_extensions     = v3_ca
req_extensions = req_ext
distinguished_name = dn
prompt = no
[ req_distinguished_name ]
# See <https://en.wikipedia.org/wiki/Certificate_signing_request>.
countryName                     = Country Name (2 letter code)
stateOrProvinceName             = State or Province Name
localityName                    = Locality Name
0.organizationName              = Organization Name
organizationalUnitName          = Organizational Unit Name
commonName                      = Common Name
emailAddress                    = Email Address
# Optionally, specify some defaults.
countryName_default             = US
stateOrProvinceName_default     = Minnesota
localityName_default            = St. Paul
0.organizationName_default      = MPR
organizationalUnitName_default  = Software Engineering
emailAddress_default            = yourusername@yourdomain.org
[ v3_ca ]
# Extensions for a typical CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
[ v3_intermediate_ca ]
# Extensions for a typical intermediate CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true, pathlen:0
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
[ usr_cert ]
# Extensions for client certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = client, email
nsComment = "OpenSSL Generated Client Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth, emailProtection
[ server_cert ]
# Extensions for server certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = server
nsComment = "OpenSSL Generated Server Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer:always
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
[ crl_ext ]
# Extension for CRLs (`man x509v3_config`).
authorityKeyIdentifier=keyid:always
[ ocsp ]
# Extension for OCSP signing certificates (`man ocsp`).
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, digitalSignature
extendedKeyUsage = critical, OCSPSigning
```
## SSL setup

1. Set up an Apache virtual host to proxy your traffic over SSL
    ```apache
    <VirtualHost *:443>
      ServerAdmin you@yourdomain.org
      DocumentRoot /var/www/htdocs
      ServerName bragi.dev
      ErrorLog /var/log/apache2/bragi.dev-error_log
      CustomLog /var/log/apache2/bragi.dev-access_log common
    
      SSLEngine On
      SSLCertificateFile /path/to/intermediate/certs/bragi.dev.cert.pem
      SSLCertificateKeyFile /path/to/intermediate/key/bragi.dev.key.pem
      SSLCACertificateFile /path/to/intermediate/cert/chain/ca-chain.cert.pem
      SSLProxyEngine On
      SSLProxyCheckPeerCN off
      SSLProxyCheckPeerExpire off
      SSLProxyVerify none
      SSLProxyCheckPeerName off
      ProxyPass  /  https://localhost:3000/
      ProxyPass  /  https://localhost:8080/
    
      <Directory "/">
        Options FollowSymLinks
      </Directory>
    
      LogLevel warn
    </VirtualHost>
    ```
2. Set the bash variables `BRAGI_KEY`, `BRAGI_CERT` and `BRAGI_CA` to the paths of those files on your system

## Ruby setup

1. Run `bundle install` to get the Ruby dependencies for this project
2. Run the `ssl_thin.sh` bash script to start Thin using the certs you set up previously

## Javascript setup

1. Run `yarn` to install Javascript dependencies for this project
2. Run `bin/webpack-dev-server` to run the development server for Webpack

## Javascript testing
1. Run `npm run test` to execute Jest tests
2. Run `npm run test:watch` to execute Jest tests in watch mode
3. Run `npm run test:debug` to execute Jest tests in debug mode (the process will wait for a debugger to attach before executing)

## Code Structure

React components in this project will be written using the Redux approach of "Container" and "Presentational" components (also referred to as "Smart" and "Dumb"). Where possible, container and presentational components will be grouped together in the same file. Additionally, components will be grouped together into directories by domain.

Redux actions and reducers will be grouped together in [Ducks](https://github.com/erikras/ducks-modular-redux) by use case.
