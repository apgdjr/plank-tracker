# Overview

This projects was created from codesandox.io by instantiating a vue 3.js sandbox.
A component called timer was created. When then adding bootstrap-vue to project I could not register the component because bootstrap-vue is not compatible with vue 3.
I then downgraded to vue 2.6 and add dependency to vue composition API so that I could re-use the timer component that was built under vue 3.

After downgrading the project and making sure it was running sucessfully I added bootstrap. User container and buttons to make it look nice.

The project is connected to git repo: https://github.com/apgdjr/plank-tracker

# Deployment to Production

Deployment is done everytime a commit happens against the main brach.
It is hosted in vercel.app.Site : https://plank-tracker.vercel.app/

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
