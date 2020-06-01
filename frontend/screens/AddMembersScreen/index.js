import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, List, Avatar, Appbar, IconButton, Searchbar} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import {getUserIdentifiers} from '../../controllers/UserController';
import {getUserByUsername} from '../../controllers/UserController';
import { VIEW_GROUP } from '../../navigation/tab_navigator/stacks/groups/screen-names';


function AddMembersScreen({route, navigation}) {
    const memberIds = route.params.groupData.members;
    const [members, setMembers] = useState([]);
    const [displayMembers, setDisplayMembers] = useState([]);
    const [haveMembers, setHaveMembers] = useState(false);
    const [addingMembers, setAddingMembers] = useState(false);
    const [query, setQuery] = useState('');
    const [searchMembers, setSearchMembers] = useState(false);
    const [searchedMembers, setSearchedMembers] = useState([]);
    const [searchedMembersList, setSearchedMembersList] = useState([]);
    const [updateChips, setUpdateChips] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [memberChips, setMemberChips] = useState([]);

    const colors = ['red', 'orange', 'green', 'blue', 'indigo', 'violet']
    useFocusEffect(
        React.useCallback( () => {
            setQuery('');
            const groupData = route.params.groupData;
            const getMemberDetails = async () => {
                const memberIds = groupData.members;
                for(let i = 0; i < memberIds.length; i++) {
                    const member = await getUserIdentifiers(memberIds[i]);
                    await setMembers([...members, member[0]]);
                }
            }
            getMemberDetails();
            setHaveMembers(false);
            return () => {
                setMembers([]);
            };
        }, [])
    );

    useEffect(() => {
        if(!haveMembers && members.length > 0) {
            setDisplayMembers(getMembers(members));
            setHaveMembers(true);
        }

        if(searchMembers) {
            setSearchItems();
            setSearchMembers(false);
        }

        if(updateChips) {
            setUpdateChips(false);
        }

    })

    function getMembers(groupMembers) {
        console.log(groupMembers)
        let items = []
            for (let i = 0; i < groupMembers.length; i++) {
                console.log(groupMembers[i])
                let username = groupMembers[i].username ? groupMembers[i].username : "USER";
                username = username.length > 2 ? username : "USER";
                items.push(
                    <List.Item 
                        style={styles.listItem} 
                        key={username + i} 
                        title={username} 
                        left={() => <Avatar.Text 
                            size={40} 
                            label={username.toUpperCase().substring(0, 2)}
                            color='white'
                            style={ {backgroundColor: colors[i % colors.length]} } 
                        />}
                    />
                )
            }
            return items;
    }

    async function inviteOrUninviteUser(user) {
        let newInvitees = [...invitees];
        let removed = false;
        console.log("invitees initially: " + newInvitees.length)
        for(let i = 0; i < newInvitees.length; i++) {
            if(user.username === newInvitees[i].username) {
                removed = true;
                newInvitees = newInvitees.splice(i, 1);
            }
        }
        if(!removed) {
            console.log("not removed");
            newInvitees.push(user);
        }
        await setInvitees(newInvitees);
        console.log("invitees " + invitees.length)
        setUpdateChips(true);
    }

    async function setSearchItems() {
        const searchString = query.toLowerCase();
        const users = await getUserByUsername(query);
        let items = [];
        for(let i = 0; i < users.length; i++) {
            const user = users[i];
            if(memberIds.indexOf(user._id) < 0) {
                const oldMembers = searchedMembers;
                await setSearchedMembers([...searchedMembers, user]);
                const username = user.username;
                // const icon = invitedMemberUsernames.indexOf(username) > -1 ? 'checkbox-marked-circle' : 'circle-outline'
                // const color = icon === 'circle-outline' ? 'grey' : 'black'
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
                        right = {() => <IconButton color={'black'} icon={'circle-outline'}/> }
                        onPress={async ()=> {await inviteOrUninviteUser(user);}}
                    />
                )
            }
            
        }
        setSearchedMembersList(items);
    }

    return(
        <View>
            <Appbar.Header>
                <Appbar.BackAction color="white" onPress={async () => {
                    navigation.navigate(VIEW_GROUP), 
                    {
                        userId: route.params.userId,
                        groupId: route.params.groupId
                    }}}/>
                <Appbar.Content
                    color="white"
                    title={route.params.groupData.name}
                />
            </Appbar.Header>
            <View style={{flexDirection: 'row', backgroundColor: '#E1FAE1', marginBottom: 15, height: 55}}>
                <IconButton
                    icon={addingMembers? 'arrow-left' : 'plus'}
                    color='white'
                    style={{backgroundColor: 'black'}}
                    onPress={() => {
                        setAddingMembers(!addingMembers);
                        setQuery('');
                    }}
                />
                <Text style={{paddingTop: 15}}>{addingMembers ? 'Back to Members' : 'Add Members'}</Text>
            </View>

            <ScrollView>
                {!addingMembers && displayMembers}

                {addingMembers && <Searchbar
                    style={{}}
                    placeholder="Search"
                    onChangeText={(query) => {setQuery(query); setSearchMembers(true);}}
                    value={query}
                />}

                {addingMembers && searchedMembersList}
            </ScrollView>
        </View>
    );
    
}

export default AddMembersScreen;