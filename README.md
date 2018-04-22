# App Generator Vue Truffle Box

This box can help to generate Vue app with CRUD functionality that keeps data in blockchain.

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
    node agv.js --model Team --fields '[{"title":"string"},{"founder":"string"}]'
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
    http://localhost:8080/?#/teams
    ```

## 💸 ETH Addresses for Donation

0x63CE9f57E2e4B41d3451DEc20dDB89143fD755bB

0x424988F9443eaE0AD0a23DffBD096E9F21598384

0xA68D58B5a556eDf1eBE09eDA55DdE034b8b4Df61
