import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

type ItemProps = {
    status: FilterStatus,
    description: string,
    onStatus: () => void,
    onRemove: () => void
}

export function Item({ status, description, onRemove, onStatus }: ItemProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
                <StatusIcon status={status} />
            </TouchableOpacity>
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity onPress={onRemove}>
                <EvilIcons name="trash" size={24} color={'#828282'}/>
            </TouchableOpacity>
        </View>
    )
}