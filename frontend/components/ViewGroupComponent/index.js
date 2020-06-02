import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import {FAB, Text, Title, Button, Divider} from 'react-native-paper';
import styles from './styles';
import {CREATE_MEETING_REQUEST, VIEW_POLL} from '../../navigation/tab_navigator/stacks/groups/screen-names';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

function ViewGroupComponent({route, navigation, updateLog, logData, groupData}) {
    const [requestsLog, setRequestsLog] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);  
    
    useEffect(() => {
        if(updateLog && logData.length > 0) {
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
            setShowSpinner(false);
        }

        
    }, [updateLog]);

    return(
        <View style={styles.container}>
            <Spinner
                visible={showSpinner}
                textContent={'Loading...'}
                textStyle={{
                  color: 'white'
              }}
            />
            <ScrollView style={{flex: 1, flexDirection: 'column'}} scrollEnabled={true}>
                {requestsLog}
            </ScrollView>
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={() =>{navigation.navigate(CREATE_MEETING_REQUEST, {
                    userId: route.params.userId, 
                    groupId: route.params.groupId,
                    groupData: groupData,
                })}}
            />
        </View>
    );
}

export default ViewGroupComponent;