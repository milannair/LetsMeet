import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {getGroupData} from '../../controllers/GroupController';
import {FAB, Text} from 'react-native-paper'
import styles from './styles'
import {CREATE_MEETING_REQUEST} from '../../navigation/tab_navigator/stacks/groups/screen-names'

function ViewGroupScreen({route, navigation}) {
    const [groupData, setGroupData] = useState({});
    useEffect(() => {
        const getData = async () => {setGroupData( await getGroupData(route.params.groupId))};
        getData();
    });
    
    return(
        <View style={styles.container}>
            <Text>{groupData.name}</Text>
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={() => navigation.navigate(CREATE_MEETING_REQUEST, {userId: route.params.userId, groupId: route.params.groupId})}
            />
        </View>
    );
}

export default ViewGroupScreen;