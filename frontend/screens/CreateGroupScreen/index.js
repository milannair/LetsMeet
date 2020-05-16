import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, IconButton, Button, Colors, TextInput, Chip, Searchbar, List} from 'react-native-paper';
import styles from './styles'
import { GROUPS } from '../../navigation/screen-names';


let allUsernames = ['Jay', 'Jonah', 'Jameson', 'Peter', 'Parker', 'Mary', 'Jane']
let invitedMembers = []
let searchResults = []
function CreateGroupScreen({navigation}) {

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
                <Chip 
                    style={styles.chip} 
                    key={invitees[i] + 'Chip' + i} 
                    onClose={() => removeInvitee(invitees[i])}
                    avatar= {<Avatar.Image size={23} source={{uri: 'https://picsum.photos/60' + i}}/>}
                >
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
                const color = icon === 'circle-outline' ? 'grey' : 'black'
                items.push(
                    <List.Item 
                        style={styles.listItem} 
                        key={username + 'item' + i} 
                        title={username} 
                        left={() => <Avatar.Image size={40} source={{uri: 'https://picsum.photos/60' + i}} />}
                        right = {() => <IconButton color={color} icon={icon}/> }
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
                <Appbar.BackAction onPress={() => navigation.navigate(GROUPS)}/>
                <Appbar.Content title='Create a Group'/>
                <Button color='white' labelStyle={styles.buttonText} onPress={() => alert('Will eventually allow you to finish creating the group')}>
                    DONE
                </Button>
                
            </Appbar.Header>

            <View style={styles.groupDetailsContainer}>
                <View style={styles.groupAvatarEdit}>
                    <Avatar.Image 
                        style={styles.avatar} 
                        size={50} 
                        source={{uri: 'https://picsum.photos/600'}} />

                    <IconButton
                        icon='account-edit'
                        size={15}
                        color={Colors.white}
                        style={styles.edit}
                        onPress={() => alert('Will allow you to change the photo')}
                    />
                </View>

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
            </View>
            
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
