import React from 'react'
import { Text, View, TextInput, ToastAndroid } from 'react-native';
import { Button, Toast } from 'native-base';
import { styles } from './styles';
import firebase from 'firebase'
import moment from 'moment'

const today = moment().format();

class RenderPost extends React.Component {
  state = {
    messages: [],
    msgId: '',
    user: {},
    message: ''
  }

  async componentDidMount() {
  }


  sendPost = async () => {
    const { uid } = this.props;
    const postId = firebase.database().ref('/post-list').push().key
    const postRef = firebase.database().ref('/post-list/' + postId);
    const neiborRef = firebase.database().ref('/neighborhood/' + uid + '/post')
    await postRef.set({
      text: this.state.message,
      createdAt: today,
      uid
    }).then(() => {
      ToastAndroid.show('Post added...!', ToastAndroid.SHORT);
    }).catch((e) => {
      ToastAndroid.show('Something error...!', ToastAndroid.SHORT);
    })

    await neiborRef.set({
      text: this.state.message,
      createdAt: today,
      seen: [uid],
      postId: postId
    })
    this.setState({
      message: ''
    })
    this.prosp.onSendPost(true)
  }

  render() {
    return (
      <View style={[styles.postContainer]}>
        <TextInput
          onChangeText={message => this.setState({ message })}
          placeholder="write message... "
          value={this.state.message}
          style={styles.postBox}
          multiline={true}
          numberOfLines={4}
          editable={true}
          maxLength={40}
        />

        <Button style={[
          styles.btnBg('#fcbc30'),
          styles.postSendBtn
        ]}
          onPress={() => {
            if (this.state.message) {
              this.sendPost()
            } else {
              alert('Message cannot be empty')
            }
          }}
        >
          <Text style={styles.btnText}>Send Post</Text>
        </Button>
      </View>
    )
  }
}

export default RenderPost;
