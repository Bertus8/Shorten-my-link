import { Meteor } from 'meteor/meteor';
import {LinksCollection}  from '../imports/api/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return LinksCollection.find({}, { fields: { url: 1, token: 1, clicks: 1 } });
  });
});

// Executed whenever a user visists with a route like
async function onRoute(req, res, next) {
  // Take the token out of hte url and try to a find a 
  // matching link in the Links collection
  const link = await LinksCollection.findOneAsync({ token: req.params.token });
  // If we find a link object, redirect the user to the long URL
  if(link?.url) {
    console.log('Updated clicks for link:', link);
    await LinksCollection.updateAsync(link._id, { $inc: { clicks: 1 } });
    res.writeHead(307, {'location' : link.url });
    res.end();
  } else {
    next();
  }

}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);