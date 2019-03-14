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

## preview in production

```sh
npm run build && npm run serve
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

- hot module reloading for CSS and Javascript
- ES2015 and environment aware Babel configuration
- React support
- Sass compilation
- ~~will eliminate unused css using `purifycss-webpack` plugin~~
- Allows live tweaking of main webpack config and restarts dev environment when it gets changed
- assets loaders (png, jpg, svg, woff, ttf, eof etc.)

### Inspired by these projects

1. [https://createapp.dev/](https://createapp.dev/)
2. [http://learn.humanjavascript.com/react-ampersand](http://learn.humanjavascript.com/react-ampersand)
3. [survivejs webpack book](https://survivejs.com/webpack/foreword)

### Todo

- [ ] add [mini-html-webpack-plugin](https://www.npmjs.com/package/mini-html-webpack-plugin) to easier maintain the html template
- [ ] experiment with different webpack-html-plugin plugins, check [this website](https://survivejs.com/webpack/developing/getting-started/)
- [ ] testing with jest and cypress and documentation
- [ ] storybook support and documentation
- [ ] deploy to now, github pages, surge, etc. and documentation
- [ ] CI setup and documentation
- [ ] fix `open-browser-webpack-plugin` security issue ([check this pr](https://github.com/baldore/open-browser-webpack-plugin/pull/30))
- [ ] add yeoman generator and documentation
- [ ] package management tasks/flow and documentation
