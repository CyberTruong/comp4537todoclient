import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeView from "./src/views/HomeView";
import ListView from "./src/views/ListView";
import TaskView from "./src/views/TaskView";

const Stack = createStackNavigator();

const ROUTES = {
    HOME: "Home",
    LIST: "List",
    TASK: "Task",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.HOME}>
                <Stack.Screen name={ROUTES.HOME} component={HomeView} />
                <Stack.Screen name={ROUTES.LIST} component={ListView} />
                <Stack.Screen name={ROUTES.TASK} component={TaskView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
