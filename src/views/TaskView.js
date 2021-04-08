import React from "react";
import { View } from "react-native";
import Lists from "../components/Lists";
import { Text, Input, Button } from "react-native-elements";
import ApiService from "../services/ApiService";

export default function TaskView({ route }) {
    const list = Lists.getListByID(route.params.list_id);
    const task = list.getTaskByID(route.params.id);

    const [name, setName] = React.useState(task.name.getValue());
    const [description, setDescription] = React.useState(
        task.description.getValue()
    );

    React.useEffect(() => {
        const nameSubscription = task.name.subscribe((name) => setName(name));
        const descriptionSubscription = task.description.subscribe(
            (description) => setDescription(description)
        );

        return () => {
            nameSubscription.unsubscribe();
            descriptionSubscription.unsubscribe();
        };
    }, []);

    return (
        <View>
            <Text>Task ID: {task.id}</Text>
            <Text>List ID: {task.list_id}</Text>
            <Input
                label={"Name"}
                value={name}
                onChangeText={(text) => task.name.next(text)}
            />
            <Input
                containerStyle={{ flex: 1 }}
                label={"Description"}
                value={description}
                onChangeText={(text) => task.description.next(text)}
            />
            <Button
                title={"UPDATE TASK"}
                onPress={() => ApiService.updateTask(task)}
            />
            <Button
                type={"outline"}
                title={"DELETE TASK"}
                onPress={() => ApiService.deleteTask(task)}
            />
        </View>
    );
}
