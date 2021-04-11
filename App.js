import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeView from "./src/views/HomeView";
import ListView from "./src/views/ListView";
import TaskView from "./src/views/TaskView";
import AuthView from "./src/views/AuthView";
import ROUTES from "./src/views/ROUTES";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.AUTH}>
                <Stack.Screen
                    name={ROUTES.AUTH}
                    component={AuthView}
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    name={ROUTES.HOME}
                    component={HomeView}
                    options={{ title: "To Do Lists" }}
                />
                <Stack.Screen
                    name={ROUTES.LIST}
                    component={ListView}
                    options={{ title: "Tasks" }}
                />
                <Stack.Screen
                    name={ROUTES.TASK}
                    component={TaskView}
                    options={{ title: "Task Details" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
