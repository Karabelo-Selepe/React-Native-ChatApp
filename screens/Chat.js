import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

import { db, firebase } from '../Firebase';

const Chat = ({user, route}) => {

    const [messages, setMessages] = useState([]);
    const {uid} = route.params;

    const getAllMessages = async () => {
        const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid
        const querySnap = await db.collection('chatrooms').doc(docid).collection('messages').orderBy('createdAt', 'desc').get()

        const allMsg = (await querySnap).docs.map(docSnap => {
            return {
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt.toDate()
            }
        })
        setMessages(allMsg)
    }

    useEffect(() => {
        getAllMessages()
    }, [])

    const onSend = (messagesArray) => {
        const msg = messagesArray[0]
        const myMsg = {
            ...msg,
            sentBy: user.uid,
            sentTo: uid,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
        const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid

        db.collection('chatrooms').doc(docid).collection('messages').add({...myMsg, createdAt: firebase.FieldValue.serverTimestamp()})

    }

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: user.uid,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
