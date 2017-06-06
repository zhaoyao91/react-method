# React Method

Define methods for React components through props.

## Motivation

### Encapsulation
Sometimes we want to encapsulate some functionality(method) into a component because it is the best place for having related data or other reasons. For example, we want a notification component with method `send`, or a form component with method `submit`.
 
### Invocation
Since we defined a method for a component, it should be invoked by other components. How? It seems that we can use `ref` to reference that component, but ...
 
### `ref` is bad
There are enough articles to argue about this. For me, one key point is that normal class method cannot be inherited when component is extended with HOC mode.

## Usage

This package exports two HOCs:

- `defineMethod(name, definition)` is used to define method for a component
  - `definition` is such a function: `(props) => (...args) => any`
- `withMethod(name)` is used to 'extract' and invoke a method

```jsx harmony
import React, { Component } from 'react'
import { withMethod, defineMethod } from 'react-method'
import { compose, withHandlers } from 'recompose'

const LoginForm = compose(
  withHandlers({
    submit: (props) => () => {
      // inner submit implementation
      // ...
    }
  }),
  withHandlers({
    onSubmit: ({submit}) => e => {
      e.preventDefault()
      submit()
    }  
  }),
  // as we defined such a method, consumer components now can extract `submitForm` method from this component through props
  defineMethod('submitForm', ({submit}) => () => {
    submit()
  })
)(({onSubmit}) => (
  <form onSubmit={onSubmit}>
    ...
    <button>inner submit</button>
  </form>
))

const LoginView = compose(
  withMethod('submitForm')
)(({submitForm}) => (
  <div>
    <LoginForm submitForm={submitForm.define}/>
    <button onClick={submitForm.invoke}>outer submit</button>
  </div>
))
```

## License
MIT