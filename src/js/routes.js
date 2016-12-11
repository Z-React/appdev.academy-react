import React from 'react'
import { IndexRedirect, IndexRoute, Route } from 'react-router'

import Root from './components/Root/Root'
import NotFound from './components/Root/NotFound'
import Admin from './components/Root/Admin'
import SignIn from './components/Authentication/SignIn'

import Articles from './components/Articles/Index'
import Article from './components/Articles/Show'
import NewArticle from './components/Articles/New'
import EditArticle from './components/Articles/Edit'

import ArticleImages from './components/ArticleImages/Index'

import Pages from './components/Pages/Index'
import Page from './components/Pages/Show'
import EditPage from './components/Pages/Edit'

export default (
  <Route path='/' component={ Root }>
    <Route path='admin' component={ Admin }>
      <IndexRedirect to='articles' />
      <Route path='articles'>
        <IndexRoute component={ Articles } />
        <Route path='new' component={ NewArticle } />
        <Route path=':articleID/edit' component={ EditArticle } />
        <Route path=':articleID' component={ Article } />
      </Route>
      <Route path='article_images' component={ ArticleImages } />
      <Route path='pages'>
        <IndexRoute component={ Pages } />
        <Route path=':slug/edit' component={ EditPage } />
        <Route path=':slug' component={ Page } />
      </Route>
      <Route path='sign-in' component={ SignIn } />
    </Route>
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)