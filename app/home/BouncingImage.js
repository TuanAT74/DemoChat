import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { SlideInLeft, ZoomOut } from 'react-native-reanimated'

const BouncingImage = ({ isVisible }) => {
    return (
        <Animated.View
            style={{
                zIndex: 999,
                position: 'absolute',
                alignSelf: 'flex-start',
                marginLeft: 15,
                top: '50%'
            }}
        >
            {isVisible && (
                <Animated.View
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    entering={SlideInLeft}
                    exiting={ZoomOut}
                >
                    <LinearGradient
                        colors={[
                            'rgba(24, 24, 24, 0.8)',
                            'rgba(85, 83, 83, 0.8)',
                            'rgba(189, 186, 186, 0.5)'
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.linearGradient}
                    >
                        <Animated.Image
                            src='https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205251_wh1200.png'
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                marginRight: 5
                            }}
                        />
                        <Animated.View style={{ width: 70 }}>
                            <Animated.Text
                                style={{
                                    color: 'white',
                                    fontSize: 16,
                                    marginRight: 10,
                                    fontSize: 12
                                }}
                                numberOfLines={1}
                            >
                                Lê Anh Tuấn
                            </Animated.Text>
                            <Animated.Text
                                style={{
                                    color: 'white',
                                    fontSize: 16,
                                    marginRight: 10,
                                    fontSize: 9
                                }}
                                numberOfLines={1}
                            >
                                đã gửi hoa hồng
                            </Animated.Text>
                        </Animated.View>

                        <Animated.Image
                            source={{
                                uri: 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---rose-flower-thorns-elegant-bud-vector-png-image_37891640.png'
                            }}
                            style={{
                                width: 35,
                                height: 35
                            }}
                        />
                    </LinearGradient>
                    <Animated.Text style={{ color: 'white', fontSize: 16, marginLeft: 10 }}>
                        x1
                    </Animated.Text>
                </Animated.View>
            )}
        </Animated.View>
    )
}

export default BouncingImage

const styles = StyleSheet.create({
    linearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20
    }
})
