import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, Button, IconButton, Colors, TextInput, Chip, Searchbar, List} from 'react-native-paper';
import styles from './styles'


let allUsernames = ['Jay', 'Jonah', 'Jameson', 'Peter', 'Parker', 'Mary', 'Jane']
let invitedMembers = []
let searchResults = []
function CreateGroupScreen() {

    const [groupName, setGroupName] = useState('')
    const [textActive, setTextActive] = useState(false)
    const [inviteeChips, setInviteeChips] = useState(getInviteeChips(invitedMembers))
    const [searchQuery, setSearchQuery] = useState('')
    const [searchList, setSearchList] = useState([])

    const removeInvitee = (username) => {
        const index = invitedMembers.indexOf(username)
        invitedMembers.splice(index, 1)
        setInviteeChips(getInviteeChips(invitedMembers))
        setSearchList(getSearchItems(searchResults));
    }

    
    function inviteOrUninviteUser(username) {
        const index = invitedMembers.indexOf(username)
        if(index >= 0) {
            removeInvitee(username)
        } else {
            invitedMembers = [...invitedMembers, username]
            setInviteeChips(getInviteeChips(invitedMembers))
        }
    }

    function getInviteeChips(invitees) {
        let chips = []
        for (let i = 0; i < invitees.length; i++) {
            chips.push (
                <Chip style={styles.chip} key={invitees[i] + 'Chip' + i} onClose={() => removeInvitee(invitees[i])}>
                    {invitees[i]}
                </Chip>
            )
        }
        return chips
    }

    const searchMembers = (query) => {
        searchResults = allUsernames.filter(el => el.toLowerCase().startsWith(query))
        const list = getSearchItems(searchResults)
        setSearchList(list)
    }

    function getSearchItems(usernames) {
        let items = []
            for (let i = 0; i < usernames.length; i++) {
                const username = usernames[i]
                const icon = invitedMembers.indexOf(username) > -1 ? 'checkbox-marked-circle' : 'circle-outline'
                console.log(icon)
                items.push(
                    <List.Item 
                        style={styles.listItem} 
                        key={username + 'item' + i} 
                        title={username} 
                        right = {() => <IconButton icon={icon}/> }
                        onPress={()=> {
                                    inviteOrUninviteUser(username); 
                                    setSearchList(getSearchItems(searchResults));
                                }}
                    />
                )
            }
        return items
    }

    return(
        <View style={styles.container}>
            <Appbar.Header style={styles.navbar}>
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
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={(query) => {setSearchQuery(query); searchMembers(query.toLowerCase())}}
                value={searchQuery}
            />

            {searchList}
            
        </View>
    );
}

export default CreateGroupScreen
