import React from "react";
import { FlatList } from "react-native";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import ROUTES from "./ROUTES";
import { View } from "react-native";
import { Input } from "react-native-elements";
import Lists from "../components/Lists";

export default function ListView({ route, navigation }) {
    const list = Lists.getListByID(route.params.listID);
    const [tasks, setTasks] = React.useState([]);
    const [name, setName] = React.useState(list.name.getValue());
    const [status, setStatus] = React.useState("");
    const [extraData, setExtraData] = React.useState(null);

    React.useEffect(() => {
        const listNameSubscription = list.name.subscribe((name) =>
            setName(name)
        );
        const tasksSubscription = list.tasks.subscribe((tasks) =>
            setTasks(tasks)
        );

        navigation.addListener("focus", () => {
            setExtraData(null);
        });

        return () => {
            tasksSubscription.unsubscribe();
            listNameSubscription.unsubscribe();
        };
    }, []);

    React.useEffect(() => {
        try {
            list.getTasks();
        } catch (error) {
            setStatus(error.message);
        }
    }, []);

    async function updateList() {
        try {
            await list.updateList();
            setStatus("Success!");
        } catch (error) {
            setStatus(error.message);
        }
    }

    async function deleteList() {
        try {
            await Lists.deleteList(list);
            navigation.navigate(ROUTES.HOME);
        } catch (error) {
            setStatus(error.message);
        }
    }

    function listItemOnPress(item) {
        setExtraData(item);
        navigation.navigate(ROUTES.TASK, {
            id: item.id,
            list_id: item.list_id,
        });
    }

    async function createTask() {
        try {
            list.createTask();
            setStatus("Success!");
        } catch (error) {
            setStatus(error.message);
        }
    }

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
                            onPress={() => updateList()}
                        />
                    }
                />
                <Button title={"DELETE LIST"} onPress={() => deleteList()} />
            </View>

            <FlatList
                extraData={extraData}
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem onPress={() => listItemOnPress(item)}>
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
            <Button title="NEW TASK" onPress={() => createTask()} />
            <Text h4>STATUS: {status}</Text>
        </View>
    );
}
