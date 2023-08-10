import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// Screens
import OriginalRoute from '../Screens/Cart/Optimize/OriginalRoute'
import RecommendedRoute from '../Screens/Cart/Optimize/RecommendedRoute'
import Confirm from '../Screens/Cart/Optimize/Confirm';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Your Trunking Cart" component={OriginalRoute} />
            <Tab.Screen name="Recommended Route" component={RecommendedRoute} />
            <Tab.Screen name="Confirm" component={Confirm} />
        </Tab.Navigator>
    );
}

export default function CheckoutNavigator() {
    return <MyTabs />
}