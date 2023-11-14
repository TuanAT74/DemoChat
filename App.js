import {
    Dimensions,
    FlatList,
    Image,
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
        const unsubscribe = firestore()
            .collection('Chat/1/RoomLive')
            .orderBy('Time')
            .onSnapshot((documentSnapshot) => {
                const data = documentSnapshot.docs
                    .map((item) => {
                        return item._data
                    })
                    .sort((a, b) => a.Time - b.Time)
                setListMessage(data)

                if (ref.current) {
                    ref.current.scrollToEnd({ animated: true })
                }
            })

        return () => unsubscribe()
    }, [])

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
                source={{
                    uri: 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-gif-den-duong.gif'
                }}
                style={{ width: '100%', height: '100%' }}
            />
            <View style={styles.viewChat}>
                <FlatList
                    ref={ref}
                    data={listMessage}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    marginTop: 15,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Image
                                    src='https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205251_wh1200.png'
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                        marginRight: 5
                                    }}
                                />
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#CCCCCC' }}>Tuấn AT</Text>
                                    <Text style={{ color: 'white' }}>{item.Message}</Text>
                                </View>
                            </View>
                        )
                    }}
                    onScrollToIndexFailed={(info) => {}}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.viewInput}>
                    <TextInput
                        placeholder='Thêm bình luận'
                        placeholderTextColor='white'
                        style={{ flex: 1, paddingVertical: 5, color: 'white' }}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        onSubmitEditing={addMessage}
                        blurOnSubmit={false}
                        inverted={true}
                    />
                    <TouchableOpacity onPress={addMessage}>
                        <Text style={{ color: '#0099FF' }}>Gửi</Text>
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
        left: 20,
        right: 20,
        bottom: 0,
        maxHeight: Dimensions.get('window').height / 2.5,
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
