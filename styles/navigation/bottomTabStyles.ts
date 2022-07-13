import { StyleSheet } from 'react-native';
import { dark } from '../colors';

export default StyleSheet.create(
    {
        container: {
            position: 'absolute',
            bottom: 0,
            zIndex: 1000,
            flexDirection: 'row',
            justifyContent: "space-around",
            width: '100%',
            alignItems: 'center',
            height: 80,
            backgroundColor: dark,
            paddingBottom: 15
        }
    }
)