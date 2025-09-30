import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { ItemStorage, itemsStorage } from '@/storage/itemsStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
    const [filterActive, setFilterActive] = useState<FilterStatus>(FilterStatus.PENDING);
    const [description, setDescription] = useState('');
    const [items, setItems] = useState<ItemStorage[]>([]);

    async function handleAdd() {
        if (!description.trim()) {
            return Alert.alert("Adicionar", "Informe o que você deseja comprar!");
        }

        const newItem = {
            id: uuid.v4(),
            description,
            status: FilterStatus.PENDING
        }

        const itens = await itemsStorage.add(newItem);
        setItems([...itens]);
        setDescription('');
    }

    async function handleClear() {
        Alert.alert("Atenção", "Deseja realmente limpar todos os items?", [
            {text: "Não", style: "cancel"},
            { text: "Sim", onPress: async () => await itemsStorage.clear()}
        ]);
        
        setFilterActive(FilterStatus.PENDING);
        setItems([]);
    }

    async function handleChangeStatus(id: string, status: FilterStatus) {
        await itemsStorage.changeStatus(id, status);
    }

    async function handleRemove(id: string) {
        try {
            await itemsStorage.remove(id);
        } catch (error) {
            console.error(error);
            Alert.alert("Ocorreu um erro ao remover o item");
        }
    }


    useEffect(() => {
        itemsStorage.getByStatus(filterActive)
            .then((response) => setItems(response))
            .catch((error) => Alert.alert(error));
    }, [filterActive, items]);

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Image source={require('@/assets/logo.png')} style={styles.logo}/>
                <Input placeholder='O que voce precisa comprar?' value={description} onChangeText={setDescription}/>
                <Button title='Adicionar' onPress={handleAdd}/>
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    { FILTER_STATUS.map(status => (
                        <Filter status={status} isActive={status === filterActive} key={status} onPress={() => setFilterActive(status)}/>
                    )) }
                    <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                        <Text style={styles.clearButtonText}>Limpar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={items}
                    keyExtractor={(item) => String(item.id) }
                    renderItem={({ item }) => (
                        <Item
                            status={item.status}
                            description={item.description}
                            onRemove={() => handleRemove(item.id)}
                            onStatus={() => handleChangeStatus(item.id, item.status === FilterStatus.DONE ? FilterStatus.PENDING : FilterStatus.DONE)}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => <Text style={styles.emptyListText}>Nenhum item aqui</Text>}
                />
            </View>
        </View>
    )
}
