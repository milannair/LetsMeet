import React, 
       { 
         useState, 
         useEffect 
       } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Button, Text } from 'react-native-paper';
import * as referenceController from '../../controllers/ReferenceController';

function ReferenceComponent(props) {
  // state
  const [count, setCount] = useState(1);
  const [user, setUser] = useState({});

  // use effect (called when component loads)
  useEffect(() => {
    const getUser = async () => {
      // const user = await referenceController.getUser('5eb9f120b582611adc9914c0');
      // setUser(user);
    };
    getUser();
  });

  const handleButtonPress = () => {
    setCount(count + 1);
    alert('You pressed the button ' + count + ' times!');
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleButtonPress}
        mode="contained"
        style={styles.button}
      >
        {props.text}
      </Button>
      <Text>
        {JSON.stringify(user)}
      </Text>
    </View>
  );
}

export default ReferenceComponent;
