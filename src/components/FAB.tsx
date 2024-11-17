import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type FABPropType = {
  handlePress: () => void;
};

function FAB(props: FABPropType): React.JSX.Element {
  const handlePress = props.handlePress;

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#008000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default FAB;
