import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TransactionType_bgColor} from '../utility/utility';
function DetailsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const {transaction} = route.params;
  const backgroundColor = TransactionType_bgColor[transaction.type];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTransaction', {transaction})}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, transaction]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.title, {backgroundColor}]}>
          {transaction.title}
        </Text>
        <Text style={styles.description}>{transaction.desc}</Text>
        <Text style={styles.amount}>${transaction.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D90166',
    textAlign: 'center',
    marginTop: 'auto',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'semibold',
    marginRight: 5,
  },
});
export default DetailsScreen;
