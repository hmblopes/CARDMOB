import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, Alert, FlatList, useEffect } from 'react-native';

// indicar endereço do backend.
const BASE_URL = 'http://10.81.205.14:3000';

export default function App() {
  const [counter, setCounter] = useState(0);
  /// CRUD em memória
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  //loading... efeito
  const [loading, setLoading] = useState(false);
  //busca
  const fecthItems = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${BASE_URL}/items`);
        const data = await response.json();
        console.log(JSON.stringify(data)); // debug
        setItems(data);
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fecthItems();
  }, [])

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

   // CREATE
  const addItem = () => {
    if (text.trim() === '') {
      return;
    }
    const newItem = {
      id: Math.random().toString(),
      text: text.trim()
    }
    setItems([...items, newItem]);
    setText('');
    console.log(items);
  }

  // UPDATE
  const updateItem = (id) => {
    setItems( items.map( item => {
      if (item.id === id) {
        return { ...item, text: editItemText}
      }
      return item;
      })
    );
    setEditItemId(null);
    setEditItemText('');
  }

  // DELETE
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  }

  // READ -> um único item e/ou lista de itens
  const renderItem = ({item}) => {
    if (item.id != editItemId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.text}</Text>
          <View style={styles.buttons}>
            <Button title='Edit' onPress={() => {setEditItemId(item.id)}}></Button>
            <Button title='Delete' onPress={() => {deleteItem(item.id)}}></Button>
          </View>
        </View>
      );

    } else {
      // Um item esta sendo editado
      return (
        <View style={styles.item}>
          <TextInput 
            style={styles.editInput}
            onChangeText={setEditItemText}
            value={editItemText}
            autoFocus
          />
          <Button title='Update' onPress={() => updateItem(item.id)}></Button>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder='Enter text item'
      />
      <Button 
        title='Add Item'
        onPress={addItem}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <Text style={styles.text}>Olá App React Native - Atualiza!</Text>
      <Image 
        source={{uri: "https://picsum.photos/200"}}
        style={{width: 200, height: 200}}
      />

      <StatusBar style="auto" />
      {/* <Text style={styles.text}>Counter: {counter}</Text>

      <View style={styles.buttonContainer}>
        <Button title='Increment' onPress={incrementCounter} />
        <Button title='Decrement' onPress={decrementCounter} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  text: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  editInput: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
});