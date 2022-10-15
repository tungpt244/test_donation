import indexRouter from './home.mjs'
import usersRouter from './users.mjs'

export const useRoute = app => {
  app.use('/', indexRouter)
  app.use('/users', usersRouter)
}
