import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#f9f9f9',
    },
    groupDetailsContainer: {
        width: "90%",
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 15,
    },
    groupAvatarEdit: {
        height: '20%',
        paddingTop: '4%',
        width: 80
    },
    avatar : {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '8%'
    },
    edit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#bfbfbf',
    },
    groupNameContainer: {
        marginBottom: 'auto',
        marginTop: 'auto',
    },
    textinput: {
        paddingTop: 15,
        backgroundColor: '#f9f9f9',
        width: 250,
    },
    chip: {
        margin: '4%',
        backgroundColor: '#b3b3b3'
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
        overflow: 'scroll'
    },
    searchBar: {
        width: "100%",
        paddingTop: -3,
        height: 50,
    },
    buttonText: {
        fontWeight: '600'
    }, 
});

export default styles