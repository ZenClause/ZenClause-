import React from 'react'
import { Text, View, TextInput } from 'react-native';
import { Button } from 'native-base';
import { styles } from './styles';
import firebase from 'firebase'
import moment from 'moment'

const today = moment().format();

class RenderViewPost extends React.Component {
  state = {
    post: {}
  }

  async componentDidMount() {
    let { neighborID, neighbor, uid } = this.props;
    let newSeen = [];

    if (neighbor.post && neighbor.post.seen) {
      if (neighbor.post.seen.indexOf(uid) === -1) {
        newSeen = [...neighbor.post.seen, uid]
      }
    } else {
      newSeen = [uid]
    }

    const neiborRef = firebase.database().ref('/neighborhood/' + neighborID + '/post')
    await neiborRef.once('value', snap => {
      this.setState({
        post: snap.val()
      })
    })
    if (newSeen.length > 0) {
      neiborRef.update({
        seen: newSeen
      }).then(() => {
        this.props.refreshView();
      })
    }

    this.props.refreshView();
  }

  render() {
    const { post } = this.state;
    return (
      <View style={[styles.postContainer, styles.dFlex]}>
        <Text>Created At: {moment(post.createdAt).format('DD-MM-YYYY')}</Text>
        <View>
          <Text>{post.text}</Text>
        </View>
      </View>
    )
  }
}

export default RenderViewPost;
