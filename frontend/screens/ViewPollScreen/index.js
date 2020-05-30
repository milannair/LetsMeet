import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {getGroupData} from '../../controllers/GroupController';
import { Text, Appbar, List, Divider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { VIEW_GROUP } from '../../navigation/tab_navigator/stacks/groups/screen-names';
import { getMeetingRequest } from '../../controllers/MeetingRequestController';
import { getUserIdentifiers } from '../../controllers/UserController';
import { getOption, addVote, removeVote } from '../../controllers/OptionsController';
import moment from 'moment';

function ViewPollScreen({route, navigation}) {
  const [meetingData, setMeetingData] = useState({"name": "", "deadline": "", "requestedOptions": []});
  const [author, setAuthor] = useState("");
  const [optionData, setOptionData] = useState([]);
  const [pollOptions, setPollOptions] = useState([]);

  const optionPressed = (option) => {
    // let votes = option.votes;
    // for (let i = 0; i < votes.length; i++) {
    //   let vote = votes[i];
    //   if (vote === route.params.userId) {
    //     console.log("remove vote");
    //     // removeVote(option.Id, route.params.userId);
    //     return;
    //   }
    // }
    // console.log("add vote");
    // addVote(option._id, route.params.userId)
  }

  useEffect( () => {
    const getMeetingReq = async () => {
      try {
        const meetingReq = await getMeetingRequest(route.params.meetingId);
        const userIdentifiers = (await getUserIdentifiers(meetingReq.author))[0];
        console.log(meetingReq);
        setAuthor(userIdentifiers.displayName);
        setMeetingData(meetingReq);
        let newOptionData = [];
        for (let i = 0; i < meetingReq.requestedOptions.length; i++) {
          const optionId = meetingReq.requestedOptions[i];
          const option = await getOption(optionId);
          newOptionData.push(option);
        }
        setOptionData(newOptionData);
        
        let list = [];
        for (let i = 0; i < newOptionData.length; i++) {
          let option = newOptionData[i];
          console.log(option);
          let startTime = new Date(option.time.start);
          let endTime = new Date(option.time.end);
          let numVotes = option.votes.length;
          console.log(option._id);
          list.push(
            <View key={'option' + i}>
              <List.Item
                style={styles.option}
                title={moment(startTime).format("dddd, MMMM Do YYYY")}
                description={moment(startTime).format("LT") + " to " + moment(endTime).format("LT")}
                right={() => <Text style={styles.numVotes}>{numVotes}</Text>}
                onPress={() => addVote(option._id, route.params.userId)}
              />
              <Divider />
            </View>
          );
        }
        setPollOptions(list);
      } catch (error) {
        console.error(error);
      }
    };
    getMeetingReq();
   }, []);

  return(
    <View>
      <Appbar.Header style={styles.navbar} >
        <Appbar.BackAction 
          onPress={() => {navigation.navigate(VIEW_GROUP, {groupId: route.params.groupId, userId: route.params.userId})}}
          color="white"
        />
        <Appbar.Content
          title="Poll"
          color="white"
        />
      </Appbar.Header>
      <View style={styles.container}>
          <Icon name="assessment" size={45} color="black" style={{marginTop:50}}/>
          <Text style={styles.title}>
            {meetingData.name}
          </Text>
          <Text style={styles.medText}>
            Requested by {author}
          </Text>
        </View>
        <Divider />
        {pollOptions}
    </View>
  );
}

export default ViewPollScreen;