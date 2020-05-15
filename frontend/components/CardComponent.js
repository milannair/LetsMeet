import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';



function CardComponent({groupName, heartActiveCallback, index, heartStatus=false, groupDescription="Buenos Tardes Amigo"}) {

    console.log
    const [heart, setHeart] = useState(heartStatus)
    const LeftContent = () => (<Avatar.Image size={40} source={{ uri: 'https://picsum.photos/700' }} />);
    const RightContent = () => {
        return <IconButton
                        icon="heart" 
                        size= {20} 
                        color={ heart ? "rgb(127,255,0)" : "black"}
                        onPress={() => {setHeart(!heart); heartActiveCallback(index)}}
                    />
    }

    return (
    <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Title title={groupName} subtitle={groupDescription} left={LeftContent} right={RightContent}/>
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
  },
});

export default CardComponent;