import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {getGroupData} from '../../controllers/GroupController';
import {FAB, Text} from 'react-native-paper'
import styles from './styles'
import {CREATE_MEETING_REQUEST} from '../../navigation/tab_navigator/stacks/groups/screen-names'
import {getMeetingRequest} from '../../controllers/MeetingRequestController'

function ViewGroupScreen({route, navigation}) {
    const [groupData, setGroupData] = useState({});
    const [updatePage, setUpdatePage] = useState(true);
    const [meetingRequests, setMeetingRequests] = useState([]);
    const [requestsLog, setRequestsLog] = useState([]);
    useEffect(() => {
        const getData = async () => {await setGroupData( await getGroupData(route.params.groupId))};
        if(updatePage) {
            getData();
            setUpdatePage(false);
            setMeetingRequests(groupData.meetingRequests)
        }
        setMeetingRequests(groupData.meetingRequests)
        if(meetingRequests && meetingRequests.length > 0) {
            for(let i = 0; i < meetingRequests.length; i++) {
                getDisplayRequest(meetingRequests[i]);
            }
        }
    });

    async function getDisplayRequest(meetingRequestId) {
        let meetingRequest = await getMeetingRequest(meetingRequestId);
        console.log(meetingRequest);
    }
    
    return(
        <View style={styles.container}>
            <Text>{groupData.name}</Text>
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={() => navigation.navigate(CREATE_MEETING_REQUEST, {userId: route.params.userId, groupId: route.params.groupId})}
            />
        </View>
    );
}

export default ViewGroupScreen;