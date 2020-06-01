import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {getGroupData} from '../../controllers/GroupController';
import { Text, Appbar, List, Divider, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { VIEW_GROUP } from '../../navigation/tab_navigator/stacks/groups/screen-names';
import { getMeetingRequest } from '../../controllers/MeetingRequestController';
import { getUserIdentifiers } from '../../controllers/UserController';
import { getOption, addVote, removeVote } from '../../controllers/OptionsController';
import moment from 'moment';
import useSocket from '../../hooks/UseSocket/index';

function ViewPollScreen({route, navigation}) {
  const [meetingData, setMeetingData] = useState({"name": "", "deadline": "", "requestedOptions": []});
  const [author, setAuthor] = useState("");
  const [optionData, setOptionData] = useState([]);
  const [pollOptions, setPollOptions] = useState([]);
  const [numVotes, setNumVotes] = useState([]);
  const [isHighlighted, setIsHighlighted] = useState([]);
  const [updateOptions, setUpdateOptions] = useState(false);
  const { colors } = useTheme();
  useSocket('add vote', ({userId, optionId}) => {
    console.log('add: ' + userId);
    setOptionData((prev) => {
      prev.forEach((option) => {
        if (option._id === optionId) {
          option.votes.push(userId);
        }
      });
      return prev;
    });
    setUpdateOptions(true);
  });

  useSocket('remove vote', ({userId, optionId}) => {
    console.log('remove: ' + userId);
    setOptionData((prev) => {
      prev.forEach((option) => {
        if (option._id === optionId) {
          const index = option.votes.indexOf(userId);
          if (index != -1) {
            option.votes.splice(index, 1);
          }
        }
      });
      return prev;
    });
    setUpdateOptions(true);
  });

  const optionPressed = (option) => {
    console.log(option);
    let votes = option.votes;
    for (let i = 0; i < votes.length; i++) {
      let vote = votes[i];
      if (vote === route.params.userId) {
        removeVote(option._id, route.params.userId, route.params.groupId);
        return;
      }
    }
    addVote(option._id, route.params.userId, route.params.groupId);
  }

  useEffect( () => {
    console.log('re-render')
    const getMeetingReq = async () => {
      try {
        const meetingReq = await getMeetingRequest(route.params.meetingId);
        const userIdentifiers = (await getUserIdentifiers(meetingReq.author))[0];
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
        let numVotesList = [];
        for (let i = 0; i < newOptionData.length; i++) {
          let option = newOptionData[i];
          let startTime = new Date(option.time.start);
          let endTime = new Date(option.time.end);
          let numVotes = option.votes.length;
          numVotesList.push(numVotes);
          list.push(
            <View key={'option' + i}>
              <List.Item
                style={{backgroundColor: colors.accent}}
                title={moment(startTime).format("dddd, MMMM Do YYYY")}
                description={moment(startTime).format("LT") + " to " + moment(endTime).format("LT")}
                right={() => <Text style={styles.numVotes}>{numVotes}</Text>}
                onPress={() => optionPressed(option)}
              />
              <Divider />
            </View>
          );
        }
        setPollOptions(list);
        setNumVotes(numVotesList);
        setUpdateOptions(false);
      } catch (error) {
        console.error(error);
      }
    };
    getMeetingReq();
   }, [updateOptions]);

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