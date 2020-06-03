import React, { useState} from 'react';
import { View } from 'react-native';
import { Avatar, IconButton, List, Divider } from 'react-native-paper';
import styles from './styles';
import {VIEW_GROUP} from '../../navigation/tab_navigator/stacks/groups/screen-names';

function CardComponent({navigation, groupName, groupId, userId, index}) {

    const colors = ['red', 'orange', 'green', 'blue', 'indigo', 'violet', 'pink']
    const LeftContent = () => (
    <Avatar.Text 
        size={40} 
        label={groupName && groupName.length > 2 ? groupName.toUpperCase().substring(0,2) : "GR"}
        color='white'
        style={ {backgroundColor: colors[index % colors.length]} } 
    />);

    return (
        <View style={styles.container}>
            <List.Item
                onPress={() => {navigation.navigate(VIEW_GROUP, {groupId: groupId, userId: userId})}}
                left={LeftContent}
                title={groupName}
            />
            <Divider />
        </View>
    );
}

export default CardComponent;