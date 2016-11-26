import React from 'react'
import { Link, browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('articlesStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.articlesStore.loadArticles()
  }
  
  deleteButtonClick(articleID) {
    this.props.articlesStore.deleteArticle(articleID)
  }
  
  // Render list of Articles
  renderArticles(articles) {
    return articles.map((article) => {
      return (
        <tr key={ article.id }>
          <td>{ article.id }</td>
          <td>{ article.title }</td>
          <td>
            <Link to={ `/admin/articles/${article.id}` } >Show</Link>
            <Link to={ `/admin/articles/${article.id}/edit` } >Edit</Link>
            <button onClick={ this.deleteButtonClick.bind(this, article.id) } >Delete</button>
          </td>
        </tr>
      )
    })
  }
  
  render() {
    return (
      <div className='container'>
        <h1>Articles</h1>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            { this.renderArticles(this.props.articlesStore.articles) }
          </tbody>
        </table>
        <a href="/admin/articles/new">Create new</a>
      </div>
    )
  }
}