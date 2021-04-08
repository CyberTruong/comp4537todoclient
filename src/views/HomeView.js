import React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import Lists from "../components/Lists";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "./ROUTES";
import { View } from "react-native";
import { Button } from "react-native-elements";
import APIService from "../services/ApiService";

export default function HomeView() {
    const navigation = useNavigation();

    const [lists, setLists] = React.useState(Lists.lists);

    React.useEffect(() => {
        const listsSubscription = Lists.lists.subscribe((lists) => {
            setLists(lists);
        });

        return () => {
            listsSubscription.unsubscribe();
        };
    }, []);

    return (
        <View>
            <Button title="NEW LIST" onPress={() => APIService.createList()} />
            <FlatList
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        onPress={() =>
                            navigation.navigate(ROUTES.LIST, {
                                listID: item.id,
                            })
                        }
                    >
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
        </View>
    );
}
