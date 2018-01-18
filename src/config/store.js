import { applyMiddleware, compose as reduxCompose, createStore } from 'redux'
import { app } from 'store/app/updaters'
import { ReduxEmitter } from 'kuker-emitters'

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose

export const configureStore = ({ saga, sagaEmitter }) => {
  const reducer = (state, action) => app(action)(state)
  const middleware = applyMiddleware(saga, ReduxEmitter())
  const store = createStore(reducer, compose(middleware))

  sagaEmitter.setStore(store)

  return store
}
