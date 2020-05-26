import React, { useState} from 'react';
import { View } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import styles from './styles';
import {VIEW_GROUP} from '../../navigation/tab_navigator/stacks/groups/screen-names';



function CardComponent({navigation, groupName, groupId, heartActiveCallback, index, heartStatus=false, groupDescription="Buenas Tardes Amigo"}) {

    const [heart, setHeart] = useState(heartStatus)
    const LeftContent = () => (<Avatar.Image size={40} source={{ uri: "https://picsum.photos/60" + index}} />);
    const RightContent = () => {
        return <IconButton
                    icon="heart" 
                    size= {20} 
                    // green if active otherwise grey
                    color={ heart ? "rgb(127,255,0)" : "rgb(211,211,211)"}
                    onPress={() => {setHeart(!heart); heartActiveCallback(index)}}
                />
    }

    return (
    <View style={styles.container}>
        <Card style={styles.card} 
             onPress={() => {navigation.navigate(VIEW_GROUP, {groupId: groupId, text: "hello"})}}>
            <Card.Title title={groupName} subtitle={groupDescription} left={LeftContent} right={RightContent}/>
        </Card>
    </View>
    );
}

export default CardComponent;