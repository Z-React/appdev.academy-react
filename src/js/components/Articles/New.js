import React from 'react'
import { browserHistory } from 'react-router'
import { inject } from 'mobx-react'

import Form from './Form'

@inject('articlesStore')
export default class New extends React.Component {
  
  handleSubmit(articleParams) {
    this.props.articlesStore.create(articleParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/articles')
      }
    })
  }
  
  render() {
    return (
      <Form handleSubmit={ this.handleSubmit.bind(this) } />
    )
  }
}