import { configureBusinessLogic, businessProcesses } from 'config/business-logic'
import { configurePresentation } from 'config/presentation'
import { configureStore } from 'config/store'
import { ReactEmitter } from 'kuker-emitters'

ReactEmitter()

const businessLogic = configureBusinessLogic()
const store = configureStore(businessLogic)
configurePresentation(store)

businessLogic.saga.run(businessProcesses)
