import React, { Component } from 'react';
import EventApi from '../api/eventApi';
import EventForm from './EventForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';
import Toastr from 'toastr';

class EventEdit extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      updatedEvent: {
        published: true
      },
      content: '',
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentWillMount(){
    // Update state with selected event data, populating form
    EventApi.getSingleEvent(this.props.match.params.id, (err, event)=>{
      if(err){
      } else {
        this.setState({
          updatedEvent: event,
          content: event.content,
          isBlocking: false
         });
      }
    })
  }

  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.updatedEvent;
    temp[e.target.name] = e.target.value;
    this.setState({
      updatedEvent: temp,
      isBlocking: true
     });
  };
  // Save Quill changes to a higher order key of state, to prevent converting the value from a Delta to a string, which breaks Quill
  handleQuillChange(value){
    this.setState({
      content: value,
      isBlocking: true
    });
  }

  handleSubmit(e){
    e.preventDefault();
    // Prepare the updated event payload, inserting the new content from Quill
    var payload = this.state.updatedEvent;
    payload.content = this.state.content;

    // Make API call
    EventApi.updateEvent(this.props.match.params.id, payload, (err, updatedEvent)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`<strong>${updatedEvent.title}</strong> has been successfully updated.`);
        // We are no longer blocked
        this.setState({
          isBlocking: false
        });
      }
    })
  };

  // Delete the selected event
  handleDelete(){
    var response = window.confirm("Are you sure you want to permenantly delete this event?");
    if (response == true) {
      EventApi.deleteEvent(this.props.match.params.id, (err, deletedEvent)=>{
        if(err){
          Toastr.error("Whoops, there was an error: " + err.status);
        } else {
          // Toast notification
          Toastr.success(`That event has been successfully deleted.`);
          // Go back to the list
          this.props.history.push('/events')
        }
      })
    }
  }

  render() {
    const isBlocking = this.state.isBlocking;

    return (
      <div>
        <Prompt when={isBlocking} message="You may have unsaved changes. Are you sure you want to leave?" />
        <div className="container">
          <div className="page-header">
            <h1>Edit event</h1>
          </div>
        </div>
        <Grid>
          <EventForm
            newEvent={this.state.updatedEvent}
            handleChange={this.handleChange}
            quillValue={this.state.content}
            handleQuillChange={this.handleQuillChange}
            handleSubmit={this.handleSubmit}
            isBlocking={this.state.isBlocking}
            handleDelete={this.handleDelete}
            mode="edit"
          />
        </Grid>
      </div>
    );
  }
}

export default EventEdit;
