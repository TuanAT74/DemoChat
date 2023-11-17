import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'

const GiftModal = ({ isModalVisible = false, setModalVisible, onGiftSelected }) => {
    const giftImages = [
        {
            id: '1',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 1'
        },
        {
            id: '2',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 2'
        },
        {
            id: '3',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 3'
        },
        {
            id: '4',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 4'
        },
        {
            id: '5',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 5'
        },
        {
            id: '6',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 6'
        },
        {
            id: '7',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 7'
        },
        {
            id: '8',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 8'
        },
        {
            id: '9',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 9'
        },
        {
            id: '10',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 10'
        },
        {
            id: '11',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 11'
        },
        {
            id: '12',
            url: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png',
            name: 'Gift 12'
        }
    ]

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleGiftSelection(item)}>
            <Image source={{ uri: item.url }} style={styles.giftImage} />
        </TouchableOpacity>
    )

    const handleGiftSelection = (selectedGift) => {
        setModalVisible(false)
        onGiftSelected(selectedGift)
    }

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={{
                marginHorizontal: 0,
                marginVertical: 0,
                justifyContent: 'flex-end'
            }}
        >
            <View style={styles.modalContent}>
                <FlatList
                    data={giftImages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    numColumns={4}
                />
            </View>
        </Modal>
    )
}

export default GiftModal

const styles = StyleSheet.create({
    modalContent: {
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor: '#222222',
        height: '40%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    giftImage: {
        width: 50,
        height: 50,
        marginHorizontal: 25,
        marginVertical: 25,
        borderRadius: 8
    }
})
