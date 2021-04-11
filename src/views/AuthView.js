import React from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "./ROUTES";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import APIService from "../services/ApiService";
import { Input } from "react-native-elements";

export default function HomeView() {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [status, setStatus] = React.useState("");

    async function submit(username, password) {
        try {
            const response = await APIService.authenticate(username, password);
            setStatus(response);
            navigation.navigate(ROUTES.HOME);
        } catch (error) {
            setStatus(error.message);
        }
    }

    return (
        <View>
            <Input
                containerStyle={{ flex: 1 }}
                label={"USERNAME"}
                value={username}
                onChangeText={(value) => setUsername(value)}
            />
            <Input
                containerStyle={{ flex: 1 }}
                label={"PASSWORD"}
                value={password}
                onChangeText={(value) => setPassword(value)}
            />
            <Button title="SUBMIT" onPress={() => submit(username, password)} />
            <Text h5>STATUS: {status}</Text>
        </View>
    );
}
