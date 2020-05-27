import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {getGroupData} from '../../controllers/GroupController';
import {FAB, Text, Appbar, List, Title, Button} from 'react-native-paper'
import styles from './styles'
import {CREATE_MEETING_REQUEST, GROUPS} from '../../navigation/tab_navigator/stacks/groups/screen-names'
import {getMeetingRequest} from '../../controllers/MeetingRequestController'
import {getUserIdentifiers} from '../../controllers/UserController'

function ViewGroupScreen({route, navigation}) {
    const [groupData, setGroupData] = useState({});
    const [updatePage, setUpdatePage] = useState(true);
    const [logData, setLogData] = useState([])
    const [requestsLog, setRequestsLog] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await getGroupData(route.params.groupId);
            setGroupData(data);
            const meetingRequests = data.meetingRequests
            let newLogData = []
            for(let i = 0; i < meetingRequests.length; i++) {
                const meetingRequestId = meetingRequests[i];
                let meetingRequest = await getMeetingRequest(meetingRequestId);
                let userIdentifiers = (await getUserIdentifiers(meetingRequest.author))[0];
                newLogData.push({meetingRequest : meetingRequest, userIdentifiers: userIdentifiers})
            }
            setLogData(newLogData);
        };

        if(updatePage) {
            getData();
        }

        if(updatePage && logData.length > 0) {
            let list = []
            console.log("log data: " + logData.length);
            console.log(logData)
            for(let i=0; i < logData.length; i++) {
                let data = logData[i];
                let date = new Date(data.meetingRequest.deadline);
                list.push(
                    <View key={'request' + i}>
                        <Text>{data.userIdentifiers.displayName}</Text>
                        <Title>{data.meetingRequest.name}</Title>
                        {data.meetingRequest.isUnanimousMeetingRequest && 
                            <View>
                                <Button mode='contained'>Accept</Button>
                                <Button mode='contained'>Decline</Button>
                                <Text>Closes {date.toLocaleDateString()}  at {date.toLocaleTimeString()}</Text>
                            </View>
                        }

                        {!data.meetingRequest.isUnanimousMeetingRequest && 
                            <View>
                                <Button mode='contained'>Vote</Button>
                                <Text>Poll Closes {date.toLocaleDateString()}  at {date.toLocaleTimeString()}</Text>
                            </View>
                        }
                    </View>
                );
            }
            setRequestsLog(list);
            setUpdatePage(false);
        }

        
    });

    return(
        <View style={styles.container}>
            <Appbar.Header style={styles.navbar} >
                <Appbar.BackAction onPress={() => {setUpdatePage(true) ;navigation.navigate(GROUPS)}}/>
                <Appbar.Content
                title={groupData.name}
                />
                <Appbar.Action 
                icon="dots-vertical" 
                color="white" 
                size={20}
                onPress={()=> alert("Will eventually take you to the settings screen")}
                />
            </Appbar.Header>
            {requestsLog}
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={() =>{setUpdatePage(true); navigation.navigate(CREATE_MEETING_REQUEST, {userId: route.params.userId, groupId: route.params.groupId})}}
            />
        </View>
    );
}

export default ViewGroupScreen;