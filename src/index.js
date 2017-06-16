import React from 'react'

export function createMethod () {
  let _method = null

  return {
    invoke(...args) {
      return _method(...args)
    },

    define(method) {
      _method = method
    },
  }
}

export function withMethod (name) {
  return function (Component) {
    return class WithMethod extends React.Component {
      _method = createMethod()

      render () {
        return <Component {...this.props} {...{[name]: this._method}}/>
      }
    }
  }
}

/**
 * @param name
 * @param definition # (props) => (...args)
 * @returns {function} HOC
 */
export function defineMethod (name, definition) {
  return function (Component) {
    return class DefineMethod extends React.Component {
      componentWillMount () {
        this.defineMethod(this.props)
      }

      componentWillReceiveProps (nextProps) {
        this.defineMethod(nextProps)
      }

      render () {
        return <Component {...this.props}/>
      }

      defineMethod (props) {
        const define = this.props[name]
        define(definition(props))
      }
    }
  }
}