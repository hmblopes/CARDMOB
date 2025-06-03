import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

const baseUrl = 'http://10.81.205.14:3000';

export default function App() {
    const [compras, setCompras] = useState([]);
    const [item, setItem] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [editId, setEditId] = useState(null);
    const [editItem, setEditItem] = useState('');
    const [editQuantidade, setEditQuantidade] = useState('');
    const [loading, setLoading] = useState(false);

  const fetchCompras = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/compras`);
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  const adicionarCompra = async () => {
    if (item.trim() === '' || quantidade.trim() === '') return;

    try {
      const response = await fetch(`${baseUrl}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.trim(), quantidade: parseInt(quantidade) })
      });
      if (response.ok) {
        await fetchCompras();
        setItem('');
        setQuantidade('');
      }
    } catch (error) {
      console.error("Erro ao adicionar compra:", error);
    }
  };

  const atualizarCompra = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/compras/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: editItem, quantidade: parseInt(editQuantidade) })
      });
      if (response.ok) {
        await fetchCompras();
        setEditId(null);
        setEditItem('');
        setEditQuantidade('');
      }
    } catch (error) {
      console.error("Erro ao atualizar compra:", error);
    }
  };
  
  const deletarCompra = async (id) => {
    Alert.alert(
      'Excluir',
      'Deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(`${baseUrl}/compras/${id}`, { method: 'DELETE' });
              if (response.ok) await fetchCompras();
            } catch (error) {
              console.error("Erro ao deletar compra:", error);
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    if (item.id !== editId) {
      return (
        <View style={styles.item}>
          <Text>{item.item} - Quantidade: {item.quantidade} und(s)</Text>
          <View style={styles.buttons}>
            <Button title="Edit"
            color="#6959CD" 
            onPress={() => {
              setEditId(item.id);
              setEditItem(item.item);
              setEditQuantidade(String(item.quantidade));
            }} />
            <Button title="Delete" 
            onPress={() => deletarCompra(item.id)} 
            color="#6959CD"/>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.editInput}
            placeholder="Item"
            value={editItem}
            onChangeText={setEditItem}
          />
          <TextInput
            style={styles.editInput}
            placeholder="Quantidade"
            value={editQuantidade}
            onChangeText={setEditQuantidade}
            keyboardType="numeric"
          />
          <Button title="Salvar" 
          onPress={() => atualizarCompra(item.id)} 
          color="#6959CD"/>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Qntd"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <Button title="Add" 
      onPress={adicionarCompra} 
      color="#6959CD"/>
      <FlatList
        data={compras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: '#87CEFE',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  editInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
  }
});