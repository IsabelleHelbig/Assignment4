import React, {useState, useMemo} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {
  TransactionType,
  defaultTransactionEntry,
  addEditTransaction,
  getNewID,
} from '../utility/utility';

function TransactionScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const {transaction} = route.params || {};

  const [id, setId] = useState(transaction?.id || '');
  const [title, setTitle] = useState(transaction?.title || '');
  const [desc, setDesc] = useState(transaction?.desc || '');
  const [amount, setAmount] = useState(transaction?.amount?.toString() || '');
  const [selectedId, setSelectedId] = useState<string>(
    transaction?.type?.toString() || '0',
  );

  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');
  const [amountError, setAmountError] = useState('');

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '0',
        label: TransactionType[0],
        value: TransactionType[0],
        color: '#800080',
      },
      {
        id: '1',
        label: TransactionType[1],
        value: TransactionType[1],
        color: '#800080',
      },
      {
        id: '2',
        label: TransactionType[2],
        value: TransactionType[2],
        color: '#800080',
      },
    ],
    [],
  );

  function handleSubmit() {
    let isValid = true;

    setTitleError('');
    setDescError('');
    setAmountError('');

    if (!title) {
      setTitleError('Title cannot be empty');
      isValid = false;
    }

    if (!desc) {
      setDescError('Description cannot be empty');
      isValid = false;
    }

    if (!amount || isNaN(parseFloat(amount))) {
      setAmountError('Amount must be a valid number');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newTransaction = {
      ...defaultTransactionEntry,
      id: id || getNewID(),
      title,
      desc,
      amount: parseFloat(amount),
      type: parseInt(selectedId),
    };

    addEditTransaction(newTransaction);

    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }
  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Add a Description..."
        value={desc}
        onChangeText={setDesc}
      />
      {descError ? <Text style={styles.errorText}>{descError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Amount in CAD"
        inputMode="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}

      <View style={styles.radioGroupContainer}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={styles.radioGroup}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  radioGroupContainer: {
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  submitButton: {
    backgroundColor: '#D90166',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: '60%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionScreen;
