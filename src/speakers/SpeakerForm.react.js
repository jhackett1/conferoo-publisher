import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button} from 'react-bootstrap';
import MediaPicker from '../partials/MediaPicker.react';

class SpeakerForm extends Component {

  render() {
    const isBlocking = this.props.isBlocking;

    const Buttons = ()=>{
      if(this.props.mode === "new"){
        return (
          <ButtonToolbar>
            <Button type="submit" onClick={this.props.handleSubmit} bsStyle="primary">Publish</Button>
          </ButtonToolbar>
        )
      } else {
        return (
          <ButtonToolbar>
            <Button type="button" onClick={this.props.handleDelete} bsStyle="danger">Delete</Button>
            <Button type="submit" onClick={this.props.handleSubmit} bsStyle="primary">Update</Button>
          </ButtonToolbar>
        )
      }
    }

    const CharCount = () => {
      if (this.props.newSpeaker.biography) {
        let remaining = 400 - this.props.newSpeaker.biography.length;

          if (remaining > 0) {
            return(
              <p className="help-text spaced">{remaining} characters remaining.</p>
            )
          } else {
            return(
              <p className="warn-text spaced"><strong>{remaining} characters over. Biography will be trimmed in some places.</strong></p>
            )
          }
      } else {
        return null
      }
    }

    return (
          <Form>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <FormControl
                  type="text"
                  name="name"
                  onChange={this.props.handleChange}
                  value={this.props.newSpeaker.name}
                  bsSize="large"
                  placeholder="Name"
                />
                <Panel header="Biography">
                  <FormControl
                    type="text"
                    name="position"
                    onChange={this.props.handleChange}
                    value={this.props.newSpeaker.position}
                    placeholder="Speaker's position"
                    className="field-with-spacing"
                  />
                  <FormControl
                    type="textarea"
                    name="biography"
                    rows="5"
                    componentClass="textarea"
                    placeholder="A few sentences about the speaker"
                    onChange={this.props.handleChange}
                    value={this.props.newSpeaker.biography}
                  />
                  <CharCount/>
                </Panel>
              </Col>
              <Col xs={12} md={4}>
                <Panel header="Publish" className="panel-primary">
                  <Buttons/>
                </Panel>
                <Panel header="Image">
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="URL of speaker's photograph"
                      name="image"
                      onChange={this.props.handleChange}
                      value={this.props.newSpeaker.image}
                    />
                  </FormGroup>
                  <MediaPicker
                    onChange={this.props.handleMediaChange}
                  />
                </Panel>
              </Col>
            </Row>
          </Form>
    );
  }
}

export default SpeakerForm;
