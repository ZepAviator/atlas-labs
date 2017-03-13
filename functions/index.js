const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const Rx = require('rxjs');
const _ = require('lodash');
const moment = require('moment');
const sanitizer = require('sanitizer');

const SUBMIT_MESSAGE = 'compass/SUBMIT_MESSAGE';

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

exports.processActions = functions.database.ref('/users/{userId}/actions')
  .onWrite(event => {
    return Rx.Observable.of(event)
      .map(event => {
        return {
          actions: event.data.val() || {},
          userId: event.params.userId,
          ref: event.data.ref
        }
      })
      .filter(data => !_.isEmpty(data.actions))
      .mergeMap(data => Rx.Observable.fromPromise(admin.database().ref('/users/' + data.userId).child('actions').remove())
        .map(success => data)
      )
      .mergeMap(data => {
        // This would then process multiple types of actions.
        // Each action type can have it's own node file, but for now, we will just do the first one.

        let compassSubmitMessages = [];

        _.forOwn(data.actions, (value, key, object) => {
          if (value && value.type === SUBMIT_MESSAGE) {
            compassSubmitMessages.push(value);
          }
        });

        return Rx.Observable.from(compassSubmitMessages)
          .mergeMap(action => {
            let messages = admin.database().ref('/compass/messages');
            action.payload.message = sanitizer.sanitize(action.payload.message); // Safe HTML
            action.payload.dateTime = moment().toISOString();
            return Rx.Observable.fromPromise(messages.push(action.payload))
              .map(success => action);
          })
          .reduce((collection, action) => collection.push(action), [])
      })
      .toPromise();
  });