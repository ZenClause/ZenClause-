
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dFlex: {
    flex: 1
  },
  width: (v) => ({
    width: v
  }),
  height: (v) => ({
    height: v
  }),
  fontSize: (v) => ({
    fontSize: v
  }),
  userName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  modalContent: {
    backgroundColor: "#817c8b",
    padding: 10,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: '60%',
    height: 400
  },
  topBoxContainer: {
    backgroundColor: '#222222',
    height: '60%',
    padding: 5
  },
  IMtopBoxContainer: {
    backgroundColor: '#222222',
    height: '75%',
    padding: 5
  },
  topBox: {
    flexDirection: 'row',
  },
  bottomBox: {
    flexDirection: 'column',
    marginTop: 10
  },
  coverContainer: {
  },
  cover: {
    width: 140,
    height: 140,
  },
  messages: {
    padding: 5,
    flexDirection: 'column'
  },
  message: {
    backgroundColor: 'red',
    padding: 5
  },
  msgItem: {
    flexDirection: 'row',
    marginBottom: 10
  },
  firstButtons: {
    flexDirection: 'row'
  },
  secondButtons: {
    flexDirection: 'row',
    marginTop: 2
  },
  btn: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnText: {},
  btnBg: (color) => ({
    backgroundColor: color
  }),
  like: {
    marginLeft: 2,
    marginRight: 2
  },
  add: {
    marginLeft: 2,
    marginRight: 2
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 100
  },
  sendIM: {
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10
  },

  postContainer: {
    height: 200,
    backgroundColor: '#fff',
    padding: 10,
  },
  postBox: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
    marginBottom: 10,
  },
  postSendBtn: {
    padding: 10,
    width: 100,
  }
})