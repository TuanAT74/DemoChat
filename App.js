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
import RootNavigation from './app/tabbar/RootNavigation'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    )
}

export default App

const styles = StyleSheet.create({})
