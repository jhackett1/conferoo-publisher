import React, {Component} from 'react';
import {Modal, Button, Form, FormControl} from 'react-bootstrap';
import MediaApi from '../api/mediaApi';
import Toastr from 'toastr';

class MediaUpload extends Component{
  constructor(props){
    super(props);
    this.state = {
      file: false,
      uploadProgress: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadProgress = this.uploadProgress.bind(this);
  }

  handleChange(e){
    this.setState({
      file: e.target.files[0]
    })
  }

  uploadProgress(bytes){
    var currentProgress = Math.max(parseInt(( bytes / this.state.file.size ) * 100), 100);
    this.setState({
      uploadProgress: currentProgress + "% uploaded"
    })
    if(currentProgress > 100){
      this.setState({
        uploadProgress: 'Processing upload...'
      })

    }
  }

  handleSubmit(e){
    // Stop page refresh
    e.preventDefault();
    // Make API call
    MediaApi.createMedia(this.state.file, (err, media)=>{
      // Let the user know if the 422 error comes back from the server
      if(err) return;
      this.props.hideUploader()
      Toastr.success('Media uploaded successfully.');
      this.props.getList()
    }, this.uploadProgress)
  }

  render() {
    return (
        <Modal show={this.props.uploaderVisible}>
          <Modal.Header closeButton onClick={this.props.hideUploader}>
            <Modal.Title>Upload new media</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <FormControl
                name="file"
                type="file"
                help="Maximum upload size 2MB" onChange={this.handleChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <span className="pull-left small">{this.state.uploadProgress}</span>
              <Button type="submit" onClick={this.handleSubmit}>Upload</Button>
            </Modal.Footer>
          </Form>
        </Modal>
    );
  }
};

export default MediaUpload;
