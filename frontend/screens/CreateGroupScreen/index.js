import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Appbar, Avatar, IconButton, Button, Colors, TextInput, Chip, Searchbar, List} from 'react-native-paper';
import styles from './styles'
import { GROUPS } from '../../navigation/tab_navigator/stacks/groups/screen-names';
import {createUserGroup} from '../../controllers/GroupController';
import {getUserByUsername} from '../../controllers/UserController';
import AppbarComponent from "../../components/AppbarComponent";


let invitedMemberUsernames = [];
let invitedMemberIds = [];
let previousQuery = "";
let searchResults = [];

function CreateGroupScreen({route, navigation}) {
    // const [userId, setUserId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [textActive, setTextActive] = useState(false);
    const [inviteeChips, setInviteeChips] = useState(getInviteeChips(invitedMemberUsernames));
    const [searchQuery, setSearchQuery] = useState();
    const [searchList, setSearchList] = useState();
    const colors = ['red', 'orange', 'green', 'blue', 'indigo', 'violet', 'pink']

    useEffect(() => {
        const results = async () => {
            let query = searchQuery;
            if(query) {
                query = query.toLowerCase();
            }
            if(query && query !== previousQuery) {
                previousQuery = query;
                searchResults = (await getUserByUsername(query)); 
                let newSearchList = [];
                const userId = (await AsyncStorage.getItem('userId'));
                for(let i = 0; i< searchResults.length; i++) {
                    if(searchResults[i]._id !== userId) {
                        newSearchList.push(searchResults[i]);
                    }
                }
                setSearchList(getSearchItems(newSearchList));              
            }
        }
        results() 
    })


    const removeInvitee = (user) => {
        const index = invitedMemberUsernames.indexOf(user);
        invitedMemberUsernames.splice(index, 1);
        invitedMemberIds.splice(index, 1);
        setInviteeChips(getInviteeChips(invitedMemberUsernames));
        setSearchList(getSearchItems(searchResults));
    }

    
    function inviteOrUninviteUser(username, id) {
        const index = invitedMemberUsernames.indexOf(username)
        if(index >= 0) {
            removeInvitee(username);
        } else {
            invitedMemberUsernames = [...invitedMemberUsernames, username];
            invitedMemberIds = [...invitedMemberIds, id];
            setInviteeChips(getInviteeChips(invitedMemberUsernames));
        }
    }

    function getInviteeChips(invitees) {
        let chips = [];
        for (let i = 0; i < invitees.length; i++) {
            const user = invitees[i];
            chips.push (
                <Chip 
                    style={styles.chip} 
                    key={user + 'Chip' + i} 
                    onClose={() => removeInvitee(user)}
                    avatar= {<Avatar.Text 
                        size={40} 
                        label={user.toUpperCase().substring(0, 2)}
                        color='white'
                        style={ {backgroundColor: 'green'}} 
                    />}
                >
                    {invitees[i]}
                </Chip>
            )
        }
        return chips;
    }

    function getSearchItems(usernames) {
        let items = [];
            for (let i = 0; i < usernames.length; i++) {
                const username = usernames[i].username;
                const icon = invitedMemberUsernames.indexOf(username) > -1 ? 'checkbox-marked-circle' : 'circle-outline';
                const color = icon === 'circle-outline' ? 'grey' : 'black';
                items.push(
                    <List.Item 
                        style={styles.listItem} 
                        key={username + 'item' + i} 
                        title={username} 
                        left={() => <Avatar.Text 
                            size={40} 
                            label={username.toUpperCase().substring(0, 2)}
                            color='white'
                            style={ {backgroundColor: colors[i % colors.length]} } 
                        />}
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

    async function createGroup() {
        const memberRequests = invitedMemberIds;
        const owner = route.params.userId;
        const name = groupName ? groupName : "New Group";
        await createUserGroup(owner, name, memberRequests);
        navigation.navigate(GROUPS, {reload: true});
    }

    return(
        <View style={styles.container}>
            <AppbarComponent
            title="Create a Group"
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
                    <Avatar.Text 
                        size={40} 
                        label={groupName && groupName.length > 2 ? groupName.toUpperCase().substring(0,2) : "GR"} 
                        color='white'
                        style={ {backgroundColor: colors[colors.length - 4]} } 
                    />

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
