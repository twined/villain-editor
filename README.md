# villain-editor

> Villain Content Editor

## Props

* `visibleBlocks` (array) - `['Markdown', 'Image']`
* `extraBlocks` (array) - `[
  {
    name: 'Custom block',
    icon: 'fa-quote-right',
    component: 'MyComponent',
    dataTemplate: {
      'text': 'This is my text',
      'foo': 'bar'
    }
  }
]`
* `templates` (array) - `[
  ...
]

### Templates


## Blocks

#### Slideshow

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
