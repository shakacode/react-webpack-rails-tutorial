import React from 'react/addons';
import Input from 'react-bootstrap/lib/Input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

const CommentForm = React.createClass({
  displayName: 'CommentForm',

  propTypes: {
    url: React.PropTypes.string.isRequired,
    formData: React.PropTypes.object.isRequired,
    ajaxSending: React.PropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      formMode: 0
    };
  },

  handleSelect: function(selectedKey) {
    this.setState({formMode: selectedKey});
  },

  handleChange() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    let obj;
    if (this.state.formMode < 2) {
      obj = {
        author: this.refs.author.getValue(),
        text: this.refs.text.getValue()
      };
    } else {
      // This is different because the input is a native HTML element
      // rather than a React element.
      obj = {
        author: this.refs.inlineAuthor.getDOMNode().value,
        text: this.refs.inlineText.getDOMNode().value
      };
    }

    FormActions.updateComment(obj);
  },

  handleSubmit(e) {
    e.preventDefault();
    FormActions.submitComment(this.props.url, FormStore.getState().comment);
  },

  formHorizontal: function() {
    return (
      <div>
        <hr/>
        <form className='commentForm form-horizontal' onSubmit={this.handleSubmit}>
          <Input type='text' label='Name' placeholder='Your Name' labelClassName='col-sm-2'
                 wrapperClassName='col-sm-10'
                 ref='author' value={this.props.formData.author} onChange={this.handleChange}
                 disabled={this.props.ajaxSending}/>
          <Input type='textarea' label='Text' placeholder='Say something...'
                 labelClassName='col-sm-2'
                 wrapperClassName='col-sm-10' ref='text' value={this.props.formData.text}
                 onChange={this.handleChange}
                 disabled={this.props.ajaxSending}/>

          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'><input type='submit'
                                                              className='btn btn-primary'
                                                              value='Post'
                                                              disabled={this.props.ajaxSending}/>
            </div>
          </div>
        </form>
      </div>
    );
  },

  formStacked: function() {
    return (
      <div>
        <hr/>
        <form className='commentForm form' onSubmit={this.handleSubmit}>
          <Input type='text' label='Name' placeholder='Your Name' ref='author'
                 value={this.props.formData.author}
                 onChange={this.handleChange} disabled={this.props.ajaxSending}/>
          <Input type='textarea' label='Text' placeholder='Say something...' ref='text'
                 value={this.props.formData.text}
                 onChange={this.handleChange} disabled={this.props.ajaxSending}/>
          <input type='submit' className='btn btn-primary' value='Post'
                 disabled={this.props.ajaxSending}/>
        </form>
      </div>
    );
  },

  formInline: function() {
    return (
      <div>
        <hr/>
        <form className='commentForm form' onSubmit={this.handleSubmit}>
          <Input label='Inline Form' wrapperClassName='wrapper'>
            <Row>
              <Col xs={3}>
                <input type='text' className='form-control' placeholder='Your Name'
                       ref='inlineAuthor'
                       value={this.props.formData.author} onChange={this.handleChange}
                       disabled={this.props.ajaxSending}/>
              </Col>
              <Col xs={8}>
                <input type='text' className='form-control' placeholder='Say something...'
                       ref='inlineText'
                       value={this.props.formData.text} onChange={this.handleChange}
                       disabled={this.props.ajaxSending}/>
              </Col>
              <Col xs={1}>
                <input type='submit' className='btn btn-primary' value='Post'
                       disabled={this.props.ajaxSending}/>
              </Col>
            </Row>
          </Input>
        </form>
      </div>
    );
  },

  render() {
    let inputForm;
    switch (this.state.formMode) {
      case 0:
        inputForm = this.formHorizontal();
        break;
      case 1:
        inputForm = this.formStacked();
        break;
      case 2:
        inputForm = this.formInline();
        break;
      default:
        throw `Unknown form mode: ${this.state.formMode}.`;
    }
    return (
      <div>
        <Nav bsStyle="pills" activeKey={this.state.formMode} onSelect={this.handleSelect}>
          <NavItem eventKey={0}>Horizontal Form</NavItem>
          <NavItem eventKey={1}>Stacked Form</NavItem>
          <NavItem eventKey={2}>Inline Form</NavItem>
        </Nav>
        {inputForm}
      </div>
    );
  }
});

export default CommentForm;
