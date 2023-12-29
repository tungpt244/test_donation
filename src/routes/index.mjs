import indexRouter from './home.mjs'

export const useRoute = app => {
  app.use('/', indexRouter)
}
