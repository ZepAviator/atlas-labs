const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Rx = require('rxjs');
const _ = require('lodash');
const moment = require('moment');


let samplePayload = {
  '-Kf4P8tr1rMPrZo-g-ty': {
    payload: {
      displayName: 'Brian McBride',
      message: 'Creating Actions Array ',
      owner: 'XLSe4J2IxwSzXDailW5P4A59Fpu1',
      photoURL: 'https://lh6.googleusercontent.com/-y4_O5mdL1LI/AAAAAAAAAAI/AAAAAAAAEXc/DgJhRXbd9hI/photo.jpg'
    },
    type: 'compass/SUBMIT_MESSAGE'
  },
  '-Kf4POCfE7z4hnygpr9u': {
    payload: {
      displayName: 'Brian McBride',
      message: 'Will a second message also kick off the process actions?',
      owner: 'XLSe4J2IxwSzXDailW5P4A59Fpu1',
      photoURL: 'https://lh6.googleusercontent.com/-y4_O5mdL1LI/AAAAAAAAAAI/AAAAAAAAEXc/DgJhRXbd9hI/photo.jpg'
    },
    type: 'compass/SUBMIT_MESSAGE'
  }
}