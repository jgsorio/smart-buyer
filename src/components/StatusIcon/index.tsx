import { FilterStatus } from "@/types/FilterStatus";
import { AntDesign, Entypo } from "@expo/vector-icons";

export function StatusIcon ({status}: {status: FilterStatus}) {
    return status === FilterStatus.DONE ? (
        <AntDesign name="checkcircleo" size={20} color="white" />
    ) : <Entypo name="circle" size={20} color="white" />
}