import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../home/Home'

const Stack = createStackNavigator()

const RootNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
}

export default RootNavigation

const styles = StyleSheet.create({})
