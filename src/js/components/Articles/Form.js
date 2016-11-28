import React from 'react'
import { Link } from 'react-router'
import MarkdownIt from 'markdown-it'
import Textarea from 'react-textarea-autosize'
import ClassNames from 'classnames'

import videoPlugin from '../../plugins/video'
import GreenButton from '../Buttons/Green'
import OrangeButton from '../Buttons/Orange'

// Setup MarkdownIt parser with videos plugin
let markdown = new MarkdownIt()
markdown.use(videoPlugin)

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      htmlDocument: '',
      showType: 'editor'
    }
  }
  
  // Set new text
  contentChanged(event) {
    let newText = event.target.value
    this.setState({
      text: newText,
      htmlDocument: markdown.render(newText)
    })
  }
  
  setArticle(article) {
    if (article) {
      this.refs.title.value = article.title
      this.setState({
        text: article.content,
        htmlDocument: markdown.render(article.content)
      })
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    
    let articleParams = {
      title: this.refs.title.value,
      content: this.state.text,
      html_content: this.state.htmlDocument
    }
    this.props.handleSubmit(articleParams)
  }
  
  clickEditor() {
    this.setState({
      showType: 'editor'
    })
  }
  
  clickPreview() {
    this.setState({
      showType: 'preview'
    })
  }
  
  render () {
    let editorClasses = ClassNames({
      'hidden': this.state.showType == 'preview',
      'half-width': this.state.showType == 'editor'
    })
    
    let previewClasses = ClassNames({
      'full-width': this.state.showType == 'preview',
      'half-width': this.state.showType == 'editor'
    })
    
    return (
      <div>
        <div className='form-group'>
          <input type='text' ref='title' className='title' autoFocus={ true } />
        </div>
        <div className='buttons center'>
          <OrangeButton
            title='Editor'
            selected={ this.state.showType == 'editor' }
            onClick={ this.clickEditor.bind(this) }
          />
          <GreenButton
            title='Preview'
            selected={ this.state.showType == 'preview' }
            onClick={ this.clickPreview.bind(this) }
          />
        </div>
        <div>
          <Textarea className={ editorClasses } value={ this.state.text } onChange={ this.contentChanged.bind(this) } rows={ 3 }></Textarea>
          <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.htmlDocument }} />
        </div>
        <div className='actions center'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/admin/articles` }>Back to Articles</Link>
        </div>
      </div>
    )
  }
}