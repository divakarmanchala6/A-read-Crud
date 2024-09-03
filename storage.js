import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export const saveItem = async (title, description) => {
  try {
    const id = uuidv4();
    const newItem = { id, title, description };

    const storedItems = await AsyncStorage.getItem('items');
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    parsedItems.push(newItem);

    await AsyncStorage.setItem('items', JSON.stringify(parsedItems));
    return parsedItems;
  } catch (error) {
    console.error('Error saving item:', error);
    throw error;
  }
};

export const fetchItems = async () => {
  try {
    const storedItems = await AsyncStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const storedItems = await AsyncStorage.getItem('items');
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    const updatedItems = parsedItems.filter(item => item.id !== id);

    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const editItem = async (id, newTitle, newDescription) => {
  try {
    const storedItems = await AsyncStorage.getItem('items');
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    const updatedItems = parsedItems.map(item => 
      item.id === id ? { ...item, title: newTitle, description: newDescription } : item
    );

    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error editing item:', error);
    throw error;
  }
};
