import React from 'react'
import { Text, View, Image } from 'react-native';
import { Button, Content } from 'native-base';
import CoverImage from '../../../../assets/images/cover.png'
import Profile from '../../../../assets/images/profile.png'
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';

class RenderUserPanel extends React.Component {
  render() {
    let { uid, neighborID } = this.props
    return (
      <View style={[styles.dFlex, styles.modalContent]}>
        <View style={[styles.topBoxContainer]}>
          <View style={[styles.dFlex, styles.topBox]}>
            <View style={[]}>
              <Image source={CoverImage} style={styles.cover} />
            </View>
            <ScrollView style={[styles.messages, styles.dFlex]}>
              <View style={[styles.msgItem, styles.dFlex]}>
                <View style={styles.width('20%')}>
                  <Image source={Profile} style={styles.profile} />
                </View>
                <View style={[styles.message, styles.width('80%')]}>
                  <Text style={styles.userName}>Sammy Jam</Text>
                  <Text>Message asmdfasdf asdfjlasjdlfjlsdjf</Text>
                </View>
              </View>
              <View style={[styles.msgItem, styles.dFlex]}>
                <View style={styles.width('20%')}>
                  <Image source={Profile} style={styles.profile} />
                </View>
                <View style={[styles.message, styles.width('80%')]}>
                  <Text style={styles.userName}>Sammy Jam</Text>
                  <Text>Message asmdfasdf asdfjlasjdlfjlsdjf</Text>
                </View>
              </View>
              <View style={[styles.msgItem, styles.dFlex]}>
                <View style={styles.width('20%')}>
                  <Image source={Profile} style={styles.profile} />
                </View>
                <View style={[styles.message, styles.width('80%')]}>
                  <Text style={styles.userName}>Sammy Jam</Text>
                  <Text>Message asmdfasdf asdfjlasjdlfjlsdjf</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <Content style={[styles.dFlex, styles.bottomBox]}>
          <View style={[styles.dFlex, styles.firstButtons]}>
            <Button style={[
              styles.width('25%'),
              styles.btn,
              styles.btnBg('#20bbd4'),
              styles.invite
            ]}>
              <Text style={styles.btnText}>Invite</Text>
            </Button>

            <Button style={[
              styles.width('25%'),
              styles.btn,
              styles.btnBg('#67bcff'),
              styles.like
            ]}>
              <Text style={styles.btnText}>Like</Text>
            </Button>

            <Button style={[
              styles.width('50%'),
              styles.btn,
              styles.btnBg('#fcbc30'),
              styles.cancel
            ]}
              onPress={this.props.onCancel}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </Button>
          </View>

          <View style={[styles.dFlex, styles.secondButtons]}>
            <Button style={[
              styles.width('25%'),
              styles.btn,
              styles.btnBg('#a2b224'),
              styles.delete
            ]}
            >
              <Text style={styles.btnText}>Delete</Text>
            </Button>
            <Button style={[
              styles.width('25%'),
              styles.btn,
              styles.btnBg('#f9622d'),
              styles.add
            ]}
              onPress={() => {
                this.props.seePost();
              }}
            >
              <Text style={styles.btnText} >View Post</Text>
            </Button>
            <Button style={[
              styles.width('50%'),
              styles.btn,
              styles.btnBg('#c42222'),
              styles.next
            ]}
              onPress={() => {
                if (uid === neighborID) {
                  this.props.openPostWindow();
                } else {
                  this.props.openIMWindow();
                }
              }}
            >
              <Text style={styles.btnText}>{uid === neighborID ? "New Post" : "Send IM"}</Text>
            </Button>
          </View>
        </Content>
      </View>
    )
  }
}

export default RenderUserPanel;
