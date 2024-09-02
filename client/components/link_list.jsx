import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { LinksCollection } from '../../imports/api/links';

class LinkList extends Component {
  renderRows() {
    return this.props.links.map(link => {
      const { url, clicks, token, _id } = link; 
      console.log('LINK LIST', link);
      const shortLink = `http://localhost:3000/${token}`;
      return (
        <tr key={_id}>
          <td>{url}</td>
          <td><a href={shortLink} target="_blank" rel="noopener noreferrer">{shortLink}</a></td>
          <td>{clicks}</td>
        </tr>
      );
    });
  }

  render() {

    return (
      <table className='table'>
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('links');

  return { 
    links: LinksCollection.find({}).fetch(),
    loading: !handle.ready()
  };
})(LinkList);
