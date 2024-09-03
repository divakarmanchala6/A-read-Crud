import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { saveItem, fetchItems, deleteItem, editItem } from './storage';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handleSaveItem = async () => {
    if (editMode) {
      await handleEditItem();
    } else {
      try {
        const updatedItems = await saveItem(title, description);
        setItems(updatedItems);
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const updatedItems = await deleteItem(id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = async () => {
    try {
      const updatedItems = await editItem(editItemId, title, description);
      setItems(updatedItems);
      setTitle('');
      setDescription('');
      setEditMode(false);
      setEditItemId(null);
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const startEditingItem = (item) => {
    setEditMode(true);
    setEditItemId(item.id);
    setTitle(item.title);
    setDescription(item.description);
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await fetchItems();
        setItems(storedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    loadItems();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title={editMode ? "Edit Item" : "Save Item"} onPress={handleSaveItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>ID: {item.id}</Text>
            <Text>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity onPress={() => startEditingItem(item)} style={{ marginRight: 10 }}>
                <Text style={{ color: 'blue' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default App;
