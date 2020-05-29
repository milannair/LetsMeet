import React, {useState} from 'react';
import {Card, Avatar} from 'react-native-paper';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

function DateTimePickerComponent({currDate=(new Date()), callBack, style, mode, display, fontSize, index=null, label=null}) {
    const[showDateTimePicker, setShowDateTimePicker] = useState(false);
    const icon = mode === 'date' ? 'calendar' : 'clock';
    function getTime() {
        let hours = currDate.getHours();
        let minutes = currDate.getMinutes();
        let time = '';
        let meridiem = ' AM';
        if(hours > 12) {
            hours= hours - 12;
            meridiem = ' PM';
        }
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes + meridiem;
    }

    return(
        <View>
            <Card onPress={() => setShowDateTimePicker(true)} style={style} key={'card' + label + index}>
                <Card.Title 
                    title={mode === 'date' ? currDate.toDateString(): getTime()}
                    titleStyle={{fontSize: fontSize}}
                    right={() => <Avatar.Icon size={35} icon={icon} style={{backgroundColor: 'white'}}/>}
                />
            </Card>
            {showDateTimePicker && <DateTimePicker
                value={currDate}
                mode={mode}
                onChange={(_, date) => {
                    date? currDate = date : console.log("cancelled"); 
                    setShowDateTimePicker(false);
                    index? callBack(currDate, label, index) : callBack(currDate);
                }}
                display={display}
                key={'picker' + label + index}
            />}
        </View>
    );
}

export default DateTimePickerComponent;