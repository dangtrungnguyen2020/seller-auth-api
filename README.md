Simple Demo User Login State

Combine session and jwt to save user login state with different role and permission to limit user action

- Login as customer acount. User can update their own user info, view product. Login info will be saved in browser cookie storage
- Login to cms system must require admin account and re-verify password. User role and permissions will be saved in server session

# Generate RSA keys and copy to ./ssl/rsa/
## Generate a private key
> openssl genpkey -algorithm RSA -out private.key -aes256
## Extract the public key
> openssl rsa -pubout -in private.key -out public.key

# Install app
> npm install
or
> yarn

# Start App
> npm start
or
> yarn start

# Test
## Login as Customer role
> curl --location 'http://localhost:3000/user/login' \
> --header 'Content-Type: text/plain' \
> --data '{"username": "user", "password": "pass"}'

## Login as Admin role


## Login as System role


## Logout
> curl --location 'http://localhost:3000/user/logout' \
> --header 'Content-Type: application/json' \
> --data '{"username": "user", "password": "pass"}'

## Get Profile
> curl --location --request GET 'http://localhost:3000/user/profile' \
--header 'Content-Type: application/json' \
--data '{"username": "user", "password": "pass"}'

# License
null
