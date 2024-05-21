# Setup Node and npm

## 1. Install NVM (Node Version Manage)

Install

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Load the Node Version Manager (NVM)

```bash
source ~/.nvm/nvm.sh
```

## 2. Install Node.js (The least version is 18.17.0)

Install the required Node.js version

```bash
nvm install 18.17.0
```

Use the newly installed version

```bash
nvm use 18.17.0
```

Verify the Node.js version

```bash
node -v
```

## 3. Install npm

Install npm globally

```bash
npm install -g npm
```

Verify the Node.js version

```bash
npm -v
```
