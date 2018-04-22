# App Generator Vue Truffle Box

This box can help to scaffold a new contract development.
It generates a ledger(register) contract with customizable fields, unit tests and 
ready-to-use front end Vue app with CRUD functionality.

## Here is 🚀 [Live Demo](https://app-generator-vue.s3.eu-central-1.amazonaws.com/index.html#/teams)

## Demo 

![Demo](https://www.dropbox.com/s/bn73zt91t26uyyh/cli.gif?dl=0&raw=1 "Logo Title Text 1")

UI files are also gerenated, take a look:

![Demo](https://www.dropbox.com/s/heg0fpvvcqxboon/out.gif?dl=0&raw=1 "Logo Title Text 1")


## Installation

1. Install Truffle globally.
    ```
    npm install -g truffle
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```
    truffle unbox melnikaite/app-generator-vue
    ```

3. Generate entity
    ```
    node agv.js --model Team --fields '[{"team":"string"},{"lead":"string"},{"size":"string"},{"description":"string"},{"github":"string"}]'
    on Windows please use \"
    node agv.js --model Team --fields '[{\"team\":\"string\"},{\"lead\":\"string\"},{\"size\":\"string\"},{\"description\":\"string\"},{\"github\":\"string\"}]'
    ```

4. Run the development console.
    ```
    truffle develop
    ```

5. Compile and migrate the smart contracts.
    ```
    migrate
    ```

6. Run tests
    ```
    truffle test ./test/team.js
    ```

7. Run the development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.
    ```
    npm run dev
    ```

8. Open entity page
    ```
    http://localhost:8080/#/teams
    ```

### 🚀 Live Demo 
https://app-generator-vue.s3.eu-central-1.amazonaws.com/index.html#/teams

### Deploy

`npm run build`

#### Amazon Web Services S3

`aws s3 sync dist s3://app-generator-vue --acl public-read`

## 💸 ETH Addresses for Donation

`0x63CE9f57E2e4B41d3451DEc20dDB89143fD755bB`

`0x424988F9443eaE0AD0a23DffBD096E9F21598384`

`0xA68D58B5a556eDf1eBE09eDA55DdE034b8b4Df61`
