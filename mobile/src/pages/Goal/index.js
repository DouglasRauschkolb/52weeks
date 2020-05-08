import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

//import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

  function navigateToDetail(goal) {
    navigation.navigate('Detail', { Goal });
  }

  async function loadGoals() {
    
    const response = await api.get('goals');

    setGoals([ goals, response.data]);
    console.log(goals);
    setTotal(response.headers['x-total-count']);
  }

  useEffect(() => {
    loadGoals();
  }, []);
 
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome!</Text>

      <FlatList
        data={goals}
        style={styles.goalList}
        keyExtractor={goal => String(goal.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadGoals}
        onEndReachedThreshold={0.2}
        renderItem={({ item: goal }) => (
          <View style={styles.goal}>
            <Text style={styles.GoalValue}>{goal.name}</Text>

            <Text style={styles.goalProperty}>VALOR:</Text>
            <Text style={styles.goalValue}>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(goal.base_value)}
            </Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() => navigateToDetail(goal)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#00FF75" />            
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}