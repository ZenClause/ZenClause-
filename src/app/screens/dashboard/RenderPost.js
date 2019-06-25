import React from 'react'
import { Text, View, Image, ToastAndroid } from 'react-native';
import { Button, Content, Input } from 'native-base';
import CoverImage from '../../../../assets/images/cover.png'
import Profile from '../../../../assets/images/profile.png'
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import firebase from 'firebase'

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
    firebase
      .database()
      .ref()
    this.prosp.onSendPost(true)
  }

  render() {
    return (
      <View style={[styles.postContainer]}>
        <Input
          onChangeText={message => this.setState({ message })}
          placeholder="write message... "
          value={this.state.message}
          style={styles.postBox}
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
