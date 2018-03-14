import React, { PureComponent } from 'react';
import { database, storage } from 'firebase';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import { Container, AddFile, FileInput } from './sendMessage.styles';

export class SendMessage extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { message: '', file: false, disabled: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = path(['state', 'message'], this);
    const file = path(['state', 'file'], this);

    if (text || file) {
      const text = this.state.message;

      debugger;

      if (file) {
        this.fileUpload();
      } else {
        database()
          .ref('messages')
          .push({
            text,
            user: this.props.currentUser.get('id'),
            created: database.ServerValue.TIMESTAMP,
          })
          .then(() => {
            this.setState({ message: '', file: false });
          });
      }
    }
  }

  fileUpload() {
    const text = path(['state', 'message'], this);
    const file = path(['state', 'file'], this);
    const user = this.props.currentUser.get('id');
    const storageRef = storage().ref();

    const setState = this.setState;

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = storageRef.child('images/' + file.name).put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log('User doesn\'t have permission to access the object');
          break;

        case 'storage/canceled':
          // User canceled the upload
          console.log('User canceled the upload');
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.log('Unknown error occurred', error.serverResponse);
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      const downloadURL = uploadTask.snapshot.downloadURL;
      
      database()
        .ref('messages')
        .push({
          text,
          user,
          url: downloadURL,
          created: database.ServerValue.TIMESTAMP,
        })
        .then(() => {
          setState({ message: '', file: false });
        });
    });
  }

  chooseFile() {
    this.fileInput.click();
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.message} onChange={this.handleChange} placeholder="Type a message..." />
          <AddFile onClick={this.chooseFile}>
            <FileInput type="file" onChange={this.handleFileChange} innerRef={(el) => { this.fileInput = el; }} />
          </AddFile>
          <input type="submit" value="Submit" />
        </form>
      </Container>
    );
  }
}
