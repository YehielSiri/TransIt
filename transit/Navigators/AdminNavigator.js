import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Trunks from "../Screens/Admin/Trunk"
import Jobs from "../Screens/Admin/Jobs"
import JobForm from "../Screens/Admin/JobForm"
import Categories from "../Screens/Admin/Categories"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Jobs"
                component={Jobs}
                options={{
                    title: "Jobs"
                }}
            />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Trunks" component={Trunks} />
            <Stack.Screen name="JobForm" component={JobForm} />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}