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

const PAGE_SIZE = 10

const Home = () => {
    const [listMessage, setListMessage] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [lastVisible, setLastVisible] = useState(null)
    const ref = useRef(null)

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Rooms/roomID/messages')
            .orderBy('time', 'desc')
            .limit(PAGE_SIZE)
            .onSnapshot((documentSnapshot) => {
                const data = documentSnapshot.docs.map((item) => {
                    return item._data
                })
                setListMessage(data)
                if (data.length > 0) {
                    setLastVisible(documentSnapshot.docs[data.length - 1])
                }
            })
        return () => unsubscribe()
    }, [])

    const loadMore = async () => {
        if (isLoadingMore) {
            return
        }
        setIsLoadingMore(true)
        if (lastVisible) {
            const documentSnapshot = await firestore()
                .collection('Rooms/roomID/messages')
                .orderBy('time', 'desc')
                .startAfter(lastVisible)
                .limit(PAGE_SIZE)
                .get()
            const newData = documentSnapshot.docs.map((item) => {
                return item._data
            })
            setListMessage((prevData) => [...prevData, ...newData])
            if (newData.length > 0) {
                setLastVisible(documentSnapshot.docs[newData.length - 1])
            }
        }
        setIsLoadingMore(false)
    }

    const scrollToBottom = () => {
        ref.current.scrollToIndex({ index: 0 })
    }

    const addMessage = () => {
        if (!newMessage.trim()) {
            return
        }
        firestore().collection('Rooms/roomID/messages').add({
            message: newMessage,
            time: Date.now()
        })
        setNewMessage('')
        scrollToBottom()
    }

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://i.pinimg.com/originals/a4/01/85/a40185edb3c6339ef775c5c00c7c5eac.gif'
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
                                    <Text style={{ color: '#CCCCCC' }}>Lê Anh Tuấn</Text>
                                    <Text style={{ color: 'white' }}>{item.message}</Text>
                                </View>
                            </View>
                        )
                    }}
                    onScrollToIndexFailed={(info) => {}}
                    showsVerticalScrollIndicator={false}
                    inverted={true}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
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
                    />
                    <TouchableOpacity onPress={addMessage}>
                        <Text style={{ color: '#0099FF' }}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home

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
