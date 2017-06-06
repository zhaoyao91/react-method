# React Method

Define methods for React components through props.

## Motivation
todo

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