import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

if(Meteor.isServer){
  Meteor.methods({
    'links.insertAsync': async function(url) {
      console.log('attempting to save', url);
      if (!validUrl.isUri(url)) {
        throw new Meteor.Error('Invalid URL', 'The provided URL is not valid.');
      }
      check(url, String); 
      // Estamos listos para guardar la URL
        const token = Math.random().toString(36).slice(-5);
        // Inserta el documento en la colección
        await LinksCollection.insertAsync({ url: url, token: token, clicks: 0 });
        console.log('Document inserted with token and clicks:', { url, token, clicks });
    }
  });
}
export const LinksCollection = new Mongo.Collection('links');
