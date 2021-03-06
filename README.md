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

```
{
  "type": "template",
  "data": {
    "id": 1,
    "refs": [
      {
        "name": "MARKDOWN",
        "data": {
          "type": "markdown",
          "data": {
            "text": "MD text"
          }
        }
      }
    ]
  }
}
```


## Blocks

#### Datatable

```
{
  "type": "datatable",
  "data": [
    {
      "key": "Key 1",
      "value": "Content 1"
    },
    {
      "key": "Key 2",
      "value": "Content 2"
    },
    {
      "key": "Key 3",
      "value": "Content 3"
    }
  ]
}
```

#### Picture

```
{
  "type": "picture",
  "data": {
    "credits": null,
    "height": 2916,
    "width": 2084,
    "img_class": "img-fluid",
    "media_queries": "",
    "picture_class": "",
    "sizes": {
      "large": "/media/images/site/posts/large/1ukpg82i1900.png",
      "medium": "/media/images/site/posts/medium/1ukpg82i1900.png",
      "micro": "/media/images/site/posts/micro/1ukpg82i1900.png",
      "small": "/media/images/site/posts/small/1ukpg82i1900.png",
      "thumb": "/media/images/site/posts/thumb/1ukpg82i1900.png",
      "xlarge": "/media/images/site/posts/xlarge/1ukpg82i1900.png"
    },
    "srcset": "",
    "title": null,
    "url": "/media/images/site/posts/1ukpg82i1900.png",
    "series_slug": "test"
  }
}
```


#### Slideshow

```
{
  "type": "slideshow",
  "data": {
    "images": [
      {
        "sizes": {
          "large": "/media/images/site/posts/large/10aj2gtv8m6.jpg",
          "medium": "/media/images/site/posts/medium/10aj2gtv8m6.jpg",
          "micro": "/media/images/site/posts/micro/10aj2gtv8m6.jpg",
          "small": "/media/images/site/posts/small/10aj2gtv8m6.jpg",
          "thumb": "/media/images/site/posts/thumb/10aj2gtv8m6.jpg",
          "xlarge": "/media/images/site/posts/xlarge/10aj2gtv8m6.jpg"
        },
        "credits": null,
        "title": "Title of the image",
        "url": "/media/images/site/posts/10aj2gtv8m6.jpg",
        "series_slug": "post"
      }
    ]
  }
}
```
- `series_slug`: choose which series to browse images from


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
