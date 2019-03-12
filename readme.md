# web-dev setup

Tasks

## install dependencies

```sh
npm install
```

## run in development mode

```sh
npm start
```

## build for production

```sh
npm run build
```

## build stats

```sh
npm run build:stats
```

Then upload `stats.json` to [official webpack analyse tool](https://webpack.github.io/analyse/)

## test

```sh
npm test
```

### Features

- ES2015+
- environment aware Babel configuration
- React
- Sass compilation
- will eliminate unused css using `purifycss-webpack` plugin
- Allows live tweaking of webpack config and restarts dev environment when config gets changed
- assets loaders (png, jpg, svg etc.)

### Inspired by these projects

1. [https://createapp.dev/](https://createapp.dev/)
2. [http://learn.humanjavascript.com/react-ampersand](http://learn.humanjavascript.com/react-ampersand)
3. [survivejs webpack book](https://survivejs.com/webpack/foreword)

### Todo

- [ ] add [mini-html-webpack-plugin](https://www.npmjs.com/package/mini-html-webpack-plugin) to easier maintain the html template
- [ ] experiment with different webpack-html-plugin plugins, check [this website](https://survivejs.com/webpack/developing/getting-started/)
- [ ] better split webpack dev/test/prod configuration using [webpack-merge](https://survivejs.com/webpack/developing/composing-configuration/#setting-up-webpack-merge)
- [ ] testing with jest and cypress
- [ ] storybook support
- [ ] deploy to now, github pages, surge, etc.
- [ ] CI setup
