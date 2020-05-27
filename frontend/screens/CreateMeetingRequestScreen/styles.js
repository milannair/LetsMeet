import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#f9f9f9',
    },
    fab: {
        position: 'absolute',
        marginBottom: 30,
        marginRight: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#663399",
    },
    textinput: {
        paddingTop: 15,
        backgroundColor: '#f9f9f9',
        width: "100%",
    },
    text: {
        paddingTop: 6,
        fontSize: 18,
        marginBottom: 10,
    },
    radioButtons: {
        flexDirection: 'row',
        height: 40,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
        marginBottom: 20,
    },
    headingText: {
        fontSize: 22,
        color: 'gray',
    },
    datePicker: {
        width: 155,
    },
    timePicker: {
        width: 110,
    },
    deadlineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width:'100%',
        marginBottom: 15,
    },
    pollOptions: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 5,
    },
    optionDatePicker: {
        width: 130,
        height: 60,
    },
    optionTimePicker: {
        width: 95,
        height: 60,
    },
    removeOptionButton: {
        backgroundColor: 'black',
        marginTop: 20,
    },
    addOptionButton: {
        backgroundColor: 'black',
    },
    addOption: {
        flexDirection: "row",
        width: 80,
        marginTop: 5,
        elevation: -4,
    },
    addOptionText: {
        fontSize: 15,
        marginTop: 15,
    },
    displayOptions: {
        maxHeight: '25%',
        backgroundColor: 'red',
        flexDirection: 'column',
    }
});

export default styles;