import React, { useState} from 'react';
import { View } from 'react-native';
import { Avatar, IconButton, List, Divider } from 'react-native-paper';
import styles from './styles';
import {VIEW_GROUP} from '../../navigation/tab_navigator/stacks/groups/screen-names';

function CardComponent({navigation, groupName, groupId, userId, heartActiveCallback, index, heartStatus=false, groupDescription="Buenas Tardes Amigo"}) {

    const [heart, setHeart] = useState(heartStatus)
    const colors = ['red', 'orange', 'green', 'blue', 'indigo', 'violet']
    const LeftContent = () => (
    <Avatar.Text 
        size={40} 
        label={groupName.substring(0, 2)}
        color='white'
        style={ {backgroundColor: colors[index % colors.length]} } 
    />);
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
            <List.Item
                onPress={() => {navigation.navigate(VIEW_GROUP, {groupId: groupId, userId: userId})}}
                left={LeftContent}
                // right={RightContent} // no heart
                title={groupName}
                description={groupDescription}
            />
            <Divider />
            {/* <Card.Title title={groupName} subtitle={groupDescription} left={LeftContent} right={RightContent}/> */}
        </View>
    );
}

export default CardComponent;