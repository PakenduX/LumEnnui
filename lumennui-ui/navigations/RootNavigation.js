import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Chat from "../screens/Chat";
import Welcome from "../screens/Welcome";

const rootNav = createSwitchNavigator({
        welcome: {screen: Welcome},
        chat: {screen: Chat},
    },
    {
        initialRouteName: 'welcome'
    }
);
const RootNavigation = createAppContainer(rootNav);

export default RootNavigation;