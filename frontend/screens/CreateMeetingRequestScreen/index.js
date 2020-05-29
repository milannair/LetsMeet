import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import {TextInput, RadioButton, Text, Title, IconButton, Appbar, Button} from 'react-native-paper'
import styles from './styles'
import DateTimePickerComponent from '../../components/DatePickerComponent/index'
import {VIEW_GROUP} from '../../navigation/tab_navigator/stacks/groups/screen-names'
import {createGroupMeetingRequest} from '../../controllers/MeetingRequestController'
import {createOption} from '../../controllers/OptionsController'
 
function CreateMeetingRequest({route, navigation}) {
    const [meetingName, setMeetingName] = useState("");
    const [isUnanimousMeetingRequest, setIsUnanimousMeetingRequest] = useState(false);
    const [deadlineDate, setDeadlineDate] = useState(new Date());
    const [loadOptions, setLoadOptions] = useState(true)
    const [options, setOptions] = useState([{date: new Date(), start: new Date(), end: new Date()}]);
    const [displayOptions, setDisplayOptions] = useState([]);
    
    useEffect(() => {
        const getOptions = () => {
            let pollOptions = [];
            for(let i = 0; i < options.length; i++) {
                const option = options[i]
                pollOptions.push(getPollOption(option.date, option.start, option.end, i))
            }
            setDisplayOptions(pollOptions);
            setLoadOptions(false);
        }
        if(loadOptions) {
            getOptions();
        }
        
    })

    function removeOption(index) {
        let newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
        setLoadOptions(true);
    }

    function updateOption(index, label, date) {
        let newOptions = [...options]
        if(label === 'date') {
            newOptions[index].date = date;
        } else if(label === 'start') {
            newOptions[index].start = date;
        } else {
            newOptions[index].end = date;
        }
        setOptions(newOptions);
        setLoadOptions(true);
    }

    function getPollOption(date, start, end, index) {
        return(
            <View style={styles.pollOptions} key={'option' + index}>
                <DateTimePickerComponent
                    currDate ={date}
                    callBack={(d) => {updateOption(index, 'date', d)}} 
                    mode='date'
                    display='calendar'
                    style={styles.optionDatePicker}
                    fontSize={11}
                    index={index}
                    label='date'
                />
                <DateTimePickerComponent
                    currDate={start}
                    callBack={(d) => {updateOption(index, 'start', d)}}
                    mode='time'
                    display='clock'
                    style={styles.optionTimePicker}
                    fontSize={11}
                    index={index}
                    label='start'
                />
                <DateTimePickerComponent
                    currDate={end}
                    callBack={(d) => {updateOption(index, 'end', d)}}
                    mode='time'
                    display='clock'
                    style={styles.optionTimePicker}
                    fontSize={11}
                    index={index}
                    label='end'
                />
                
                {!isUnanimousMeetingRequest && options.length > 1 &&
                    <IconButton
                        icon='minus'
                        color='white'
                        size={15}
                        style={styles.removeOptionButton}
                        onPress={() => {removeOption(index)}}
                    />
                }
            </View>
        );
    }

    async function submitMeetingRequest() {
        const name = meetingName ? meetingName : 'Meeting'
        const requestedOptions = []
        for(let i = 0; i < options.length; i++) {
            let start = new Date(options[i].date);
            let end = new Date(start);
            start.setHours(options[i].start.getHours(), options[i].start.getMinutes());
            end.setHours(options[i].end.getHours(), options[i].end.getMinutes());
            let option = createOption(start, end, []);
            let id = (await option)._id;
            requestedOptions.push(id);
        }
        const status = 0
        createGroupMeetingRequest(route.params.userId, route.params.groupId, name, isUnanimousMeetingRequest, requestedOptions,
            deadlineDate, status);
        navigation.navigate(VIEW_GROUP, {groupId: route.params.groupId, userId: route.params.userId})
    }

    return(
        <View style={styles.container}>
            <Appbar.Header style={styles.navbar}>
                <Appbar.BackAction onPress={() => {navigation.navigate(VIEW_GROUP)}}/>
                <Appbar.Content title='Request a Meeting'/>
                <Button color='white' labelStyle={styles.buttonText} onPress={() => submitMeetingRequest()}>
                    DONE
                </Button>
                
            </Appbar.Header>

            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <TextInput
                    style={styles.textinput}
                    label="Meeting Name"
                    value={meetingName}
                    onChangeText= {(text) => {setMeetingName(text);}}
                />
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButtons}>
                        <Text style={styles.text}>Unanimous</Text>
                        <RadioButton
                            value="Unanimous Meeting Request"
                            status={isUnanimousMeetingRequest ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setIsUnanimousMeetingRequest(!isUnanimousMeetingRequest); 
                                setOptions([options[0]]); 
                                setLoadOptions(true);
                            }}
                        />
                    </View>
                    <View style={styles.radioButtons}>
                    <Text style={styles.text}>Poll</Text>
                        <RadioButton
                            value="Poll Meeting Request"
                            status={isUnanimousMeetingRequest? 'unchecked' : 'checked'}
                            onPress={() => {setIsUnanimousMeetingRequest(!isUnanimousMeetingRequest); setLoadOptions(true)}}
                        />
                    </View>
                </View>

                <Title> Deadline</Title>

                <View style={styles.deadlineContainer}>
                    <DateTimePickerComponent 
                        callBack={(date) => {setDeadlineDate(date)}} 
                        mode='date'
                        display='calendar'
                        style={styles.datePicker}
                        fontSize={15}
                    />
                    <DateTimePickerComponent
                        callBack={(date) => {
                            let newDate = new Date(deadlineDate);
                            newDate.setHours(date.getHours(), date.getMinutes());
                            setDeadlineDate(newDate);
                        }}
                        mode='time'
                        display='clock'
                        style={styles.timePicker}
                        fontSize={15}
                    />
                </View>

                <Text style={styles.text}>{isUnanimousMeetingRequest ? ' Option' : ' Options'}</Text>

                {displayOptions}

                {!isUnanimousMeetingRequest && <View style={styles.addOption}>
                    <IconButton
                        icon='plus'
                        color='white'
                        style={styles.addOptionButton}
                        onPress={() => {
                            let newOptions = [...options, {date: new Date(), start: new Date(), end: new Date()}]
                            setOptions(newOptions);
                            setLoadOptions(true);
                        }}
                    />
                    <Text style={styles.addOptionText}>Add option</Text>
                </View>}

            </ScrollView>
            
        </View>
    );
}

export default CreateMeetingRequest;