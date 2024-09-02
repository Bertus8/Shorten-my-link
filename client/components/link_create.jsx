import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class LinkCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.myRef = React.createRef();
  }

 async handleSubmit(event) {
    event.preventDefault();

    const url = this.myRef.current.value;
    console.log('url',url)
    if (!url) {
      this.setState({ error: 'URL cannot be empty' });
      return;
    }
      const result = await Meteor.callAsync('links.insertAsync', url);
      console.log('Document inserted successfully:', result);
      if(result){
        this.setState({ error: '' });
        this.myRef.current.value = '';
      } else {
        console.error('Error inserting document:', error);
        this.setState({ error: error.reason });
      }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <label>Link to shorten</label>
          <input ref={this.myRef} type="text" className='form-control' />
        </div>
        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
        <button type='submit' className='btn btn-primary'>Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;