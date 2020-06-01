import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import {getGroupData} from '../../controllers/GroupController';
import {FAB, Text, Appbar, Menu, Title, Button, Divider} from 'react-native-paper';
import styles from './styles';
import {CREATE_MEETING_REQUEST, GROUPS, VIEW_POLL, ADD_MEMBERS} from '../../navigation/tab_navigator/stacks/groups/screen-names';
import {getMeetingRequest} from '../../controllers/MeetingRequestController';
import {getUserIdentifiers} from '../../controllers/UserController';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { reset } from 'expo/build/AR';
import { set } from 'react-native-reanimated';

function ViewGroupScreen({route, navigation}) {
    const [groupData, setGroupData] = useState({});
    const [updatePage, setUpdatePage] = useState(false);
    const [logData, setLogData] = useState([]);
    const [requestsLog, setRequestsLog] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [updateLog, setUpdateLog] = useState(false);

    useFocusEffect(
        React.useCallback( () => {
            setUpdatePage(true);
            setLogData(true);
            setLogData([]);
            setRequestsLog([]);
          return () => {
          };
        }, [])
      );

    useEffect(() => {
        const getData = async () => {  // get all meetingRequests for this group and their authors
            const data = await getGroupData(route.params.groupId);
            setGroupData(data);
            const meetingRequests = data.meetingRequests;
            let newLogData = [];
            for(let i = 0; i < meetingRequests.length; i++) {
                const meetingRequestId = meetingRequests[i];
                let meetingRequest = await getMeetingRequest(meetingRequestId);
                let userIdentifiers = (await getUserIdentifiers(meetingRequest.author))[0];
                newLogData.push({meetingRequest : meetingRequest, userIdentifiers: userIdentifiers})
            }
            setLogData(newLogData);
        };

        if(updatePage) {
            console.log('getting data');
            getData();
            setUpdatePage(false);
            setUpdateLog(true);
        }

        if(updateLog && logData.length > 0) {
            console.log('setting page data');
            console.log("Data length:" + logData.length);
            let list = [];
            for(let i=0; i < logData.length; i++) {
                let data = logData[i];
                let date = new Date(data.meetingRequest.deadline);
                list.push(
                    <View style={styles.unaMeetingRequest} key={'request' + i}>
                        <Text style={styles.medText}>{data.userIdentifiers.displayName}</Text>
                        <Title>{data.meetingRequest.name}</Title>
                        {data.meetingRequest.isUnanimousMeetingRequest &&  // if meeting request is unanimous
                            <View style={styles.buttonContainer}>
                                <Button 
                                    style={styles.button}
                                    mode='contained' 
                                    uppercase={false}
                                >
                                    Accept
                                </Button>
                                <Button 
                                    style={styles.button}
                                    mode='contained' 
                                    uppercase={false}
                                    color="#C0C0C0"
                                >
                                    Decline
                                </Button>
                            </View>
                        }

                        {!data.meetingRequest.isUnanimousMeetingRequest &&  // if meeting request is a poll
                            <View styles={styles.pollMeetingRequest}>
                                <Button
                                    style={styles.button}
                                    mode='contained'
                                    uppercase={false}
                                    onPress={() =>
                                        navigation.navigate(VIEW_POLL, {
                                            meetingId: data.meetingRequest._id,
                                            userId: route.params.userId,  // poll needs userid to record who voted
                                            groupId: route.params.groupId  // poll needs groupid for backbutton
                                        }
                                    )}
                                >
                                    Vote
                                </Button>
                            </View>
                        }
                        {/* placeholder number of people who voted */}
                        <Text style={styles.medText}>10/12 members voted</Text>
                        <Text style={styles.medText}>
                            Closes {moment(date).format("l")} at {moment(date).format("LT")}
                        </Text>
                    </View>
                );
                list.push(<Divider key={'request' + 'request' + i} />);
            }
            setRequestsLog(list);
            setUpdateLog(false);
        }

        
    });

    return(
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction color="white" onPress={async () => {await setUpdatePage(false); await setLogData([]); navigation.navigate(GROUPS)}}/>
                <Appbar.Content
                    color="white"
                    title={groupData.name}
                />
                <Menu
                    visible={showMenu}
                    onDismiss={() => setShowMenu(false)}
                    anchor={
                        <Appbar.Action 
                        icon="dots-vertical" 
                        color="white" 
                        onPress={()=> setShowMenu(true)}
                        />
                    }
                >
                    <Menu.Item onPress={() =>{setShowMenu(false); navigation.navigate(ADD_MEMBERS, {groupData: groupData})}} title="Add Members" />
                    <Menu.Item onPress={() => {}} title="Members" />
                    {/* <Divider /> */}
                    <Menu.Item onPress={() => {}} title="Leave group" />
                </Menu>
            </Appbar.Header>
            <ScrollView style={{flex: 1, flexDirection: 'column'}} scrollEnabled={true}>
                {requestsLog}
            </ScrollView>
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={() =>{navigation.navigate(CREATE_MEETING_REQUEST, {
                    userId: route.params.userId, 
                    groupId: route.params.groupId,
                })}}
            />
        </View>
    );
}

export default ViewGroupScreen;