import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {getGroupData} from '../../controllers/GroupController';
import {FAB} from 'react-native-paper'
import styles from './styles'

function ViewGroupScreen({route, navigation}) {
    const [groupData, setGroupData] = useState({});
    useEffect(() => {
        // const getData = async () => {setGroupData( await getGroupData(route.params.groupId))};
        // getData();
    });
    
    return(
        <View style={styles.container}>
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={() => alert("You pressed me, baby")}
            />
        </View>
    );
}

export default ViewGroupScreen;