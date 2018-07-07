
# teodragovic.com

Personal website.

## Development environment

### Install Node

[**Windows prerequisites**](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#prerequisites)

Download and run official installer from <https://nodejs.org/en/download/>  

### Install global utils and dependencies

**NOTE: Make sure to run this command as root/admin!**

    npm i -g gulp-cli@1.3.0 && npm install

## Run commands

**Local development**

Start `localhost` and watch for file changes:

    npm start

**Build for deployment**

    npm run build

## Deployment

### Install Ruby

Install bundler and run to install dependencies

```
gem install bundler
bundle install
```

Create deploy directory and setup gh-pages

```
mkdir deploy
cd deploy
git init
git remote add origin git@github.com:teodragovic/teodragovic.github.io.git
```

**Deploy to github Pages**

    rake deploy
