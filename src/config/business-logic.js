import { bootstrap } from 'bootstrap'
import { businessLogic } from 'business-logic'
import { history } from 'config/history'
import { routes } from 'config/routes'
import { intents } from 'intents'
import createSagaMiddleware from 'redux-saga'
import { call, fork } from 'redux-saga/effects'
import { router } from 'redux-saga-router'
import { ReduxSagaEmitter } from 'kuker-emitters'

const sagaEmitter = ReduxSagaEmitter()

export const configureBusinessLogic = () => ({
  saga: createSagaMiddleware({ sagaMonitor: sagaEmitter.sagaMonitor }),
  sagaEmitter
})

export const routing = function * () {
  yield router(history, routes)
}

export const businessProcesses = function * () {
  yield call(bootstrap)
  yield [
    fork(businessLogic),
    fork(intents),
    fork(routing)
  ]
}
