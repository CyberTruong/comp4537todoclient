import React from "react";
import { FlatList, Button, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Lists from "../components/Lists";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "./ROUTES";
import { View } from "react-native";

export default function HomeView() {
    const navigation = useNavigation();

    const [lists, setLists] = React.useState(Lists.lists.getValue());
    const [status, setStatus] = React.useState("");
    const [extraData, setExtraData] = React.useState(null);

    React.useEffect(() => {
        const listsSubscription = Lists.lists.subscribe((lists) => {
            setLists(lists);
        });

        navigation.addListener("focus", () => {
            setExtraData(null);
        });

        return () => {
            listsSubscription.unsubscribe();
        };
    }, []);

    React.useEffect(() => {
        try {
            Lists.getLists();
        } catch (error) {
            setStatus(error.message);
        }
    }, []);

    async function createList() {
        try {
            await Lists.createList();
            setStatus("Success!");
        } catch (error) {
            setStatus(error.message);
        }
    }

    function listItemOnPress(item) {
        setExtraData(item);
        navigation.navigate(ROUTES.LIST, {
            listID: item.id,
        });
    }

    return (
        <View>

            <FlatList
                extraData={extraData}
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem onPress={() => listItemOnPress(item)}>
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.name.getValue()}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                List ID: {item.id}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
            <Button title="NEW LIST" onPress={() => createList()} />
            <Text h5>STATUS: {status}</Text>
        </View>
    );
}
