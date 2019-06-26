import React from 'react'
import { Text, View, Image, ToastAndroid } from 'react-native';
import { Button, Content, Input } from 'native-base';
import CoverImage from '../../../../assets/images/cover.png'
import Profile from '../../../../assets/images/profile.png'
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import firebase from 'firebase'
import moment from 'moment'

const today = moment().format();

class RenderIM extends React.Component {
  state = {
    messages: [],
    msgId: '',
    user: {},
    message: ''
  }

  async componentDidMount() {
    this.getMsg()
  }

  getMsg = async () => {
    let { uid, neighborID, neighbor } = this.props
    await firebase
      .database()
      .ref('/message-list')
      .on('value', snap => {
        snap.forEach((child) => {
          let value = child.val();
          if (value) {
            if ((value.user1 === uid || value.user2 === uid) && (value.user1 === neighborID || value.user2 === neighborID)) {
              this.setState({
                msgId: child.key,
                messages: value.messages || []
              })
            }
          }
        })
      })

    await firebase
      .database()
      .ref('/users/' + uid)
      .once('value', snap => {
        this.setState({
          user: snap.val()
        })
      })

    let mssgs = neighbor.messages || []

    if (mssgs.length > 0) {
      if (mssgs.indexOf(uid) !== -1) {
        mssgs.splice(mssgs.indexOf(uid), 1)
        await firebase
          .database()
          .ref('/neighborhood/' + neighborID)
          .update({
            messages: mssgs
          })
      }
    }

    this.prosp.onSendIM(true)
  }

  sendIM = async () => {
    let { msgId, message, user } = this.state;
    let { uid, neighborID } = this.props;
    let msgRef
    const newMsgId = firebase.database().ref('/message-list').push().key;

    if (msgId) {
      msgRef = firebase.database().ref('/message-list/' + msgId)
    } else {
      msgRef = firebase.database().ref('/message-list/' + newMsgId)
    }

    await msgRef.update({
      updatedAt: today,
      user1: uid,
      user2: neighborID,
      createdAt: today
    }).then(() => {
      ToastAndroid.show('Sending message...!', ToastAndroid.SHORT);
    })

    msgRef
      .child('/messages')
      .push({
        msg: message,
        uid,
        username: user.userName,
        createdAt: today
      })
      .then(() => {
        ToastAndroid.show('Message sent...!', ToastAndroid.SHORT);
        // this.getMsg()
        this.setState({ message: '' })
        // this.props.onSendIM()

        firebase
          .database()
          .ref('/neighborhood/' + uid)
          .once('value', (snap) => {
            let value = snap.val()
            if (value) {
              if (value.message) {
                if (value.messages.indexOf(neighborID) === -1) {
                  value.messages.push(neighborID)
                  firebase
                    .database()
                    .ref('/neighborhood/' + uid)
                    .update({
                      messages: value.messages
                    })
                }
              } else {
                firebase
                  .database()
                  .ref('/neighborhood/' + uid)
                  .update({
                    messages: [neighborID]
                  })
              }
            }
          })
      }).catch((e) => {
        ToastAndroid.show('Something wrong...!', ToastAndroid.SHORT);
        // this.props.onSendIM()
      })

    // this.props.onSendIM(this.state.message)

    this.prosp.onSendIM(true)
  }

  render() {
    return (
      <View style={[styles.dFlex, styles.modalContent]}>
        <View style={[styles.IMtopBoxContainer]}>
          <View style={[styles.dFlex, styles.topBox]}>
            <View style={[]}>
              <Image source={CoverImage} style={[styles.cover, styles.width(100), styles.height(100)]} />
            </View>
            <ScrollView
              style={[styles.messages, styles.dFlex]}
              ref="scrollView"
              onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}
            >
              {Object.keys(this.state.messages).map((msgKey) => {
                let item = this.state.messages[msgKey];
                return (
                  <View style={[styles.msgItem, styles.dFlex]} key={msgKey}>
                    <View style={styles.width('20%')}>
                      <Image source={Profile} style={styles.profile} />
                    </View>
                    <View style={[styles.message, styles.width('80%')]}>
                      <Text style={styles.userName}>{item.username && item.username} </Text>
                      <Text>{item.msg && item.msg}</Text>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>

        <Content style={[styles.dFlex, styles.bottomBox]}>
          <View style={[styles.dFlex, styles.firstButtons]}>

            <Input
              onChangeText={message => this.setState({ message })}
              placeholder="write message... "
              value={this.state.message}
            />

            <Button style={[
              styles.btnBg('#fcbc30'),
              styles.sendIM,

            ]}
              onPress={() => {
                if (this.state.message) {
                  this.sendIM()
                } else {
                  alert('Message cannot be empty')
                }
              }}
            >
              <Text style={styles.btnText}>Send IM</Text>
            </Button>
          </View>
        </Content>
      </View>
    )
  }
}

export default RenderIM;
