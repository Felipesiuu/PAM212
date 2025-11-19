import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, View } from 'react-native';

export default function Profile() {
    return(
        <View style= {styles.container}>
            <View style={styles.iconRow}>
                <Ionicons name='person-outline' size={28} color='green'/>
                <Text style={styles.title}> Perfil de Usuario </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconRow: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'green',
    },
});