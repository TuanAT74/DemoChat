import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const App = () => {
    const [listMessage, setListMessage] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const ref = useRef(null)

    useEffect(() => {
        firestore()
            .collection('Chat/1/RoomLive')
            .orderBy('Time', 'desc')
            .onSnapshot((documentSnapshot) => {
                const data = documentSnapshot.docs
                    .map((item) => {
                        return item._data
                    })
                    .sort((a, b) => a.Time - b.Time)
                setListMessage(data)
            })
    }, [])

    useEffect(() => {
        if (listMessage.length > 2) {
            console.log(13)
            ref.current.scrollToIndex({ index: listMessage.length - 2 })
        }
    }, [listMessage])

    const addMessage = () => {
        if (!newMessage.trim()) {
            return
        }
        firestore().collection('Chat/1/RoomLive').add({
            Message: newMessage,
            Time: Date.now()
        })

        setNewMessage('')
    }

    return (
        <View style={styles.container}>
            <Image
                src='https://vtv1.mediacdn.vn/2018/11/22/photo-3-15428716111551636354706.jpg'
                style={{ width: '100%', height: '100%' }}
            />
            <View style={styles.viewChat}>
                <FlatList
                    ref={ref}
                    data={listMessage}
                    renderItem={({ item }) => {
                        return <Text style={{ color: 'white', paddingTop: 5 }}>{item.Message}</Text>
                    }}
                    onScrollToIndexFailed={(info) => {}}
                />

                <View style={styles.viewInput}>
                    <TextInput
                        placeholder='Bạn đang nghĩ gì?'
                        placeholderTextColor='white'
                        style={{ flex: 1, paddingVertical: 5, color: 'white' }}
                        value={newMessage}
                        onChangeText={setNewMessage}
                    />
                    <TouchableOpacity onPress={addMessage}>
                        <Text style={{ color: 'blue' }}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewChat: {
        flex: 1,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 0,
        maxHeight: Dimensions.get('window').height / 3,
        justifyContent: 'flex-end'
    },
    viewInput: {
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 15
    }
})
