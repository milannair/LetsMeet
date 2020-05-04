import React, 
       { 
         useState, 
         useEffect 
       } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import * as referenceController from '../../controllers/ReferenceController';

function ReferenceComponent(props) {
  // state
  const [count, setCount] = useState(1);

  // use effect (called when component loads)
  useEffect(() => {
    referenceController.getUser().then((data) => console.log(data));
    // setUser(currUser);
  });

  const handleButtonPress = () => {
    setCount(count + 1);
    alert('You pressed the button ' + count + ' times!');
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleButtonPress}
        mode='contained'
        style={styles.button}
      >
        {props.text}
      </Button>
    </View>
  );
}

export default ReferenceComponent;