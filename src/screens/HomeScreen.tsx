import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FAB from '../components/FAB';
import {getInitialData} from '../utility/utility';
import {TransactionType_bgColor} from '../utility/utility';

function HomeScreen({navigation}: {navigation: any}): React.JSX.Element {
  const [transactionArray, setTransactionArray] = useState<any[]>([]);

  useEffect(() => {
    const data = getInitialData();
    setTransactionArray(data);
    console.log('Fetched Data:', data);
  }, []);

  const renderItem = ({item}: {item: any}) => {
    const backgroundColor = TransactionType_bgColor[item.type];

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {transaction: item});
        }}>
        <View style={[styles.card, {backgroundColor}]}>
          <Text>{item.title}</Text>
          <Text>${item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {transactionArray.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Click + to add a transaction.</Text>
        </View>
      ) : (
        <FlatList
          data={transactionArray}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <View style={styles.buttonContainer}>
        <FAB
          handlePress={() => {
            navigation.navigate('AddTransaction');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  card: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  message: {
    fontSize: 25,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
