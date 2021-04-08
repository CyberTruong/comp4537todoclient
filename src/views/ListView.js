import React from "react";
import { FlatList } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import ROUTES from "./ROUTES";
import { View } from "react-native";
import { Input } from "react-native-elements";
import ApiService from "../services/ApiService";
import Lists from "../components/Lists";

export default function ListView({ route, navigation }) {
    const list = Lists.getListByID(route.params.listID);
    const [tasks, setTasks] = React.useState([]);
    const [name, setName] = React.useState(list.name.getValue());

    React.useEffect(() => {
        const listNameSubscription = list.name.subscribe((name) =>
            setName(name)
        );
        const tasksSubscription = list.tasks.subscribe((tasks) =>
            setTasks(tasks)
        );

        return () => {
            tasksSubscription.unsubscribe();
            listNameSubscription.unsubscribe();
        };
    }, []);

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Input
                    containerStyle={{ flex: 1 }}
                    label={"List Name"}
                    value={name}
                    onChangeText={(text) => list.name.next(text)}
                    rightIcon={
                        <Icon
                            name="type"
                            name="send"
                            onPress={() => ApiService.updateList(list)}
                        />
                    }
                />
                <Button
                    title={"DELETE LIST"}
                    onPress={() => ApiService.deleteList(list)}
                />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        onPress={() => {
                            navigation.navigate(ROUTES.TASK, {
                                id: item.id,
                                list_id: item.list_id,
                            });
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.name.getValue()}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                List ID: {item.list_id} Task ID: {item.id}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
}
