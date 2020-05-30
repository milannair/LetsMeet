import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, IconButton, Button, Colors, TextInput, Chip, Searchbar, List} from 'react-native-paper';
import styles from './styles'
import { GROUPS } from '../../navigation/tab_navigator/stacks/groups/screen-names';
import {getUsers, createUserGroup} from '../../controllers/GroupController';
import AppbarComponent from "../../components/AppbarComponent";


let invitedMemberUsernames = []
let invitedMemberIds = []
let previousQuery = ""
let searchResults = []

function CreateGroupScreen({route, navigation}) {

    const [groupName, setGroupName] = useState('')
    const [textActive, setTextActive] = useState(false)
    const [inviteeChips, setInviteeChips] = useState(getInviteeChips(invitedMemberUsernames))
    const [searchQuery, setSearchQuery] = useState()
    const [searchList, setSearchList] = useState()

    useEffect(() => {

        const results = async () => {
            let query = searchQuery
            if(query) {
                query = query.toLowerCase()
            }
            if(query && query !== previousQuery) {
                previousQuery = query
                searchResults = (await getUsers(query)) 
                setSearchList(getSearchItems(searchResults))              
            }
        }
        results() 
    })


    const removeInvitee = (user) => {
        const index = invitedMemberUsernames.indexOf(user)
        invitedMemberUsernames.splice(index, 1)
        invitedMemberIds.splice(index, 1)
        setInviteeChips(getInviteeChips(invitedMemberUsernames))
        setSearchList(getSearchItems(searchResults));
    }

    
    function inviteOrUninviteUser(username, id) {
        const index = invitedMemberUsernames.indexOf(username)
        if(index >= 0) {
            removeInvitee(username)
        } else {
            invitedMemberUsernames = [...invitedMemberUsernames, username]
            invitedMemberIds = [...invitedMemberIds, id]
            setInviteeChips(getInviteeChips(invitedMemberUsernames))
        }
    }

    function getInviteeChips(invitees) {
        let chips = []
        for (let i = 0; i < invitees.length; i++) {
            const user = invitees[i]
            chips.push (
                <Chip 
                    style={styles.chip} 
                    key={user.username + 'Chip' + i} 
                    onClose={() => removeInvitee(user)}
                    avatar= {<Avatar.Image size={23} source={{uri: 'https://picsum.photos/60' + i}}/>}
                >
                    {invitees[i]}
                </Chip>
            )
        }
        return chips
    }

    function getSearchItems(usernames) {
        let items = []
            for (let i = 0; i < usernames.length; i++) {
                const username = usernames[i].username
                const icon = invitedMemberUsernames.indexOf(username) > -1 ? 'checkbox-marked-circle' : 'circle-outline'
                const color = icon === 'circle-outline' ? 'grey' : 'black'
                items.push(
                    <List.Item 
                        style={styles.listItem} 
                        key={username + 'item' + i} 
                        title={username} 
                        left={() => <Avatar.Image size={40} source={{uri: 'https://picsum.photos/60' + i}} />}
                        right = {() => <IconButton color={color} icon={icon}/> }
                        onPress={()=> {
                                    inviteOrUninviteUser(username, usernames[i]._id); 
                                    setSearchList(getSearchItems(searchResults));
                                }}
                    />
                )
            }
        return items
    }

    function createGroup() {
        const memberRequests = invitedMemberIds
        const owner = route.params.userId
        const name = groupName ? groupName : "New Group"
        createUserGroup(owner, name, memberRequests)
        navigation.navigate(GROUPS, {reload: true})
    }

    return(
        <View style={styles.container}>
            <AppbarComponent
              showBack={true}
              backOnPress={() => {
                  setSearchQuery("");
                  previousQuery = "";
                  invitedMemberUsernames = [];
                  searchResults = [];
                  navigation.navigate(GROUPS);
              }}
              buttons={[
                  <Button color='white' labelStyle={styles.buttonText}
                          onPress={() => createGroup()}>
                      DONE
                  </Button>
              ]}
            />

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
                
                <View>
                    <TextInput
                        style={styles.textinput}
                        label={'Group Name'}
                        value={groupName}
                        dense={true}
                        theme = {{colors: {}}}
                        // onFocus = {() => {setTextActive(true);}}
                        // onBlur = {() => {setTextActive(true);}}
                        onChange={(e) => {setGroupName(e.nativeEvent.text);}}                
                    />
                </View>
            </View>
            
            <View style={styles.chipContainer}>
                {inviteeChips}
            </View>
            
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={(query) => {setSearchQuery(query)}}
                value={searchQuery}
            />

            {searchList}
            
        </View>
    );
}

export default CreateGroupScreen
