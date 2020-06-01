import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Avatar, IconButton, Button, Colors, TextInput, Chip, Searchbar, List} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles'
import { GROUPS } from '../../navigation/tab_navigator/stacks/groups/screen-names';
import {getUsers, createUserGroup} from '../../controllers/GroupController';
import AppbarComponent from "../../components/AppbarComponent";


function AddMembers({route, navigation, groupData}) {

    return(
        <View>
            <Text>Hello</Text>
        </View>
    );
}

export default AddMembers;