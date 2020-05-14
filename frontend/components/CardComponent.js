import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import userController from '../controllers/FillerController';



function CardComponent({groupName="Dummy Group", groupDescription="Buenos Tardes Amigo"}) {
//   // state
//   const [count, setCount] = useState(1);

//   // use effect (called when component loads)
//   useEffect(() => {
//     // const currUser = userController.getUser();
//     // setUser(currUser);
//   });

//   const handleButtonPress = () => {
//     setCount(count + 1);
//     alert('You pressed the button ' + 0 + ' times!');
//   };

// const LeftContent = props => <Avatar.Icon {...props} icon="people" />
    const heartActive = true
    const LeftContent = () => (<Avatar.Image size={40} source={{ uri: 'https://picsum.photos/700' }} />);
    const RightContent = (props, heartActive) => {
        if (!heartActive) {
            return <Avatar.Icon {...props} icon="heart" />
        } else {
            return <Avatar.Icon {...props} icon="hand" />
        }
    }



    return (
    <View style={styles.container}>
        <Card style={styles.card}>
        <Card.Title title={groupName} subtitle={groupDescription} left={LeftContent} right={ (heartActive) => RightContent(heartActive)}/>
        {/* <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
        </Card.Content> */}
        {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
        {/* <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
        </Card.Actions> */}
        </Card>
    </View>
    );
}

// styling
const styles = StyleSheet.create({
  container: {
    height: '100px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'black',
    width: '50%'
  },
  card: {
      width: "100%",
      height: "100%",
      justifyContent: "center"

  }
});

export default CardComponent;