import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, IconButton, Colors, TextInput, Chip, Searchbar} from 'react-native-paper';
import styles from './styles'

function CreateGroupScreen() {

    const [groupName, setGroupName] = useState('')
    const [textActive, setTextActive] = useState(false)
    let inviteeNames = ['Jay', 'Jonah', 'Jameson', 'Peter', 'Parker', 'Mary', 'Jane']
    const [inviteeChips, setInviteeChips] = useState(getInviteeChips(inviteeNames))
    const [searchQuery, setSearchQuery] = useState('')

    const removeInvitee = (index) => {
        inviteeNames.splice(index, 1);
        setInviteeChips(getInviteeChips(inviteeNames))
    }

    function getInviteeChips(invitees) {
        let chips = []
        for (let i = 0; i < invitees.length; i++) {
            chips.push (
                <Chip style={styles.chip} key={invitees[i] + i} onClose={() => removeInvitee(i)}>
                    {invitees[i]}
                </Chip>
            )
        }
        return chips
    }

    return(
        <View style={styles.container}>
            <Appbar.Header style={styles.navbar}>
                {/* <Appbar.BackAction onPress={alert('I shall take you back later')}/> */}
                <Appbar.Content title='Create a Group'/>
            </Appbar.Header>
            
            <Avatar.Image 
                style={styles.avatar} 
                size={100} 
                source={{uri: 'https://picsum.photos/600'}} />

            <IconButton
                icon='account-edit'
                size={20}
                color={Colors.white}
                style={styles.edit}
                onPress={() => alert('Will allow you to change the photo')}
            />

            <TextInput
                style={textActive ? styles.textinputFocused : styles.textinput}
                label={'Group Name'}
                value={groupName}
                underlineColor='purple'
                theme = {{colors: {}}}
                onFocus = {() => {setTextActive(true); console.log(textActive)}}
                onBlur = {() => {setTextActive(false); console.log(textActive)}}
                onChange={(e) => {setGroupName(e.nativeEvent.text); console.log(groupName)}}                
            />
            <View style={styles.chipContainer}>
                {inviteeChips}
            </View>

            <Searchbar
                placeholder="Search"
                onChangeText={(query) => {setSearchQuery(query)}}
                value={searchQuery}
            />
            
        </View>
    );
}

export default CreateGroupScreen
