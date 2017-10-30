import Axios from 'axios';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

var host = config.api_host;
// Communicate with the Conferoo API, retrieving and sending speaker data

// Helper function for building usable error objects, rather than the string
function errorBuilder(error){
  Toastr.error(error.response.data.message)
  return {
    status: error.response.status,
    data: error.response.data,
    headers: error.response.headers
  };
};

function networkError(error){
  Toastr.error(`Trouble communicating with server. Please try again later.`)
}

const SpeakerApi = {

  // Get all speakers
  getSpeakersList: function(cb){
    Axios({
      method: 'get',
      url: host + '/speakers/',
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Get single speaker by ID
  getSingleSpeaker: function(speakerId, cb){
    Axios({
      method: 'get',
      url: host + '/speakers/' + speakerId,
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Create new speaker, passing in JSON
  createSpeaker: function(newSpeaker, cb){
    Axios({
      method: 'post',
      url: host + '/speakers/',
      headers: {
        Authorization: UserService.getToken()
      },
      data: newSpeaker
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        console.log(error.response)
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Update an existing speaker by ID, passing in new JSON key-values to update
  updateSpeaker: function(speakerId, updatedSpeaker, cb){
    Axios({
      method: 'patch',
      url: host + '/speakers/' + speakerId,
      headers: {
        Authorization: UserService.getToken()
      },
      data: updatedSpeaker
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Delete an speaker by ID
  deleteSpeaker:  function(speakerId, cb){
    Axios({
      method: 'delete',
      url: host + '/speakers/' + speakerId,
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  }
};

export default SpeakerApi;
