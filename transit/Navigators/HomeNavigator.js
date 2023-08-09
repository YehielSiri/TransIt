import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import JobContainer from "../Screens/Jobs/JobContainer";
import SingleJob from "../Screens/Jobs/SingleJob"

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={JobContainer}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Job Detail'
                component={SingleJob}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}