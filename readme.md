# Visual Controller for Vue (@peter.naydenov/visual-controller-for-vue)

[![version](https://img.shields.io/github/package-json/v/PeterNaydenov/visual-controller-for-vue)](https://github.com/PeterNaydenov/visual-controller-for-vue) [![license](https://img.shields.io/github/license/PeterNaydenov/visual-controller-for-vue)](https://github.com/PeterNaydenov/visual-controller-for-vue)

*Works with Vue 1 and 2.*
Here is the library for [Vue 3](https://github.com/PeterNaydenov/visual-controller-for-vue3).

Tool for building a micro-frontends(MFE) based on Vue components  - Start multiple Vue applications in the same HTML page and control them.

Install visual controller:
```
npm i @peter.naydenov/visual-controller-for-vue
```

Initialization process:

```js
import Vue from 'vue'
import VisualController from '@peter.naydenov/visual-controller-for-vue'

let 
      eBus = new Vue ()
    , dependencies = { eBus }  // Provide everything that should be exposed to components 
    , html = new VisualController ({ ...dependencies, Vue })
    ;
// Ready for use...
```

Let's show something on the screen:

```js
// Let's have vue component 'Hello' with prop 'greeting'

html.publish ( Hello, {greeting:'Hi'}, 'app' )
//arguments are: ( component, props, containerID )
```

## Inside of the Components

*Note: If your component should be displayed only, that section can be skipped.*

All provided libraries during visualController initialization are available through `props.dependencies`. Use `props.setupUpdates` if you need to manipulate component from outside.

```js
// Vue component using Options API
export default {
    props: ['dependencies', 'data', 'setupUpdates', 'containerID', 'eBus']
  , data () {
      return {
          message: this.data.greeting || 'Hello'
        }
    }
  , created () {
        this.setupUpdates ({
            changeMessage (update) {
                this.message = update
            }
        })
    }
  , template: `<div>{{ message }}</div>`
}
```

The external call will look like this:

```js
html.getApp ( 'app' ).changeMessage ( 'New message content' )
```

## Visual Controller Methods

```js
  publish : 'Render Vue app in container. Associate app instance with the container.'
, getApp  : 'Returns app instance by container name'
, destroy : 'Destroy app by using container name '
, has     : 'Checks if app with specific "id" was published'
```

### VisualController.publish ()

Publish a Vue app.

```js
html.publish ( component, props, containerID )
```

- **component**: *object*. Vue component
- **props**: *object*. Vue components props
- **containerID**: *string*. Id of the container where Vue-app will live.
- **returns**: *Promise. Update methods library if defined. Else will return an empty object;

Example:

```js
let html = new VisualController ({ eBus, Vue })
html.publish ( Hi, { greeting: 'hi'}, 'app' )
```

Render component 'Hi' with prop 'greeting' and render it in html element with id "app".

### VisualController.getApp ()

Returns the library of functions provided from method `setupUpdates`. If Vue-app never called `setupUpdates`, result will be an empty object.

```js
let controls = html.getApp ( containerID )
```

- **containerID**: *string*. Id of the container.

Example:

```js
let 
      id = 'videoControls'
    , controls = html.getApp ( id )
    ;
    // if app with 'id' doesn't exist -> returns false, 
    // if app exists and 'setupUpdates' was not used -> returns {}
    // in our case -> returns { changeMessage:f }
if ( !controls )   console.error ( `App with id:"${id}" is not available` )
else {
        if ( controls.changeMessage )   controls.changeMessage ('new title') 
   }
```

If visual controller(html) has a Vue app associated with this name will return it. Otherwise will return **false**.

### VisualController.has ()

Checks if app with specific "id" was published.

```js
const has = html.has ( containerID )
```

- **containerID**: *string*. Id of the container.
- **returns**: *boolean*. Returns true if app with specific id exists, false otherwise

### VisualController.destroy ()

Will destroy Vue app associated with this container name and container will become empty. Function will return 'true' on success and 'false' on failure. Function will not delete content of provided container if there is no Vue app associated with it.

```js
html.destroy ( containerID )
```

- **containerID**: *string*. Id name.

### Extra

Visual Controller has versions for few other front-end frameworks:
- [Vue 3](https://github.com/PeterNaydenov/visual-controller-for-vue3)
- [React](https://github.com/PeterNaydenov/visual-controller-for-react)
- [Svelte 5](https://github.com/PeterNaydenov/visual-controller-for-svelte5)
- [Solid](https://github.com/PeterNaydenov/visual-controller-for-solid)
- [Preact](https://github.com/PeterNaydenov/visual-controller-for-preact)
- [Lit](https://github.com/PeterNaydenov/visual-controller-for-lit)
- [Svelte 3 and 4](https://github.com/PeterNaydenov/visual-controller-for-svelte3)



## Links
- [License](https://github.com/PeterNaydenov/visual-controller-for-vue/blob/master/LICENSE)

## Credits

'visual-controller-for-vue' is created and supported by Peter Naydenov

## License

'visual-controller-for-vue' is released under the [MIT license](https://github.com/PeterNaydenov/visual-controller-for-vue/blob/master/LICENSE)