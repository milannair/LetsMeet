import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles'


function AddMembersScreen({route, navigation}) {

    useFocusEffect(
        React.useCallback( () => {
            console.log(route.params.groupData);
          return () => {
          };
        }, [])
      );

    return(
        <View>
            <Text>Hello</Text>
        </View>
    );
}

export default AddMembersScreen;