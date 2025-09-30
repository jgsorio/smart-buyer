import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from '@/types/FilterStatus';

const STORAGE_KEY = '@compras:items';

export type ItemStorage = {
    id: string,
    description: string,
    status: FilterStatus
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(STORAGE_KEY);
        return storage ? JSON.parse(storage) : [];
    } catch (error) {
        throw new Error("Erro ao obter items do armazemento");
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const items = await get();
    return items?.filter((item) => item.status === status);
}

async function save(items: ItemStorage[]): Promise<void> {
    try {
        return await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        throw new Error("Erro ao salvar os items");
    }
}


async function add(item: ItemStorage): Promise<ItemStorage[]> {
    const items = await get();
    const newItems = [...items, item];
    await save(newItems);
    return newItems;
}


async function remove(id: string): Promise<void> {
    const items = await get();
    const updatedItems = items.filter((item) => item.id !== id);
    await save(updatedItems);
}


async function changeStatus(id: string, status: FilterStatus): Promise<void> {
    const items = await get();
    const index = items.findIndex((item) => item.id === id);
    items[index].status = status;
    await save(items);
}


async function clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        throw new Error("Erro ao limpar o armazenamento.");
    }
}

export const itemsStorage = { get, getByStatus, add, clear, remove, changeStatus };
