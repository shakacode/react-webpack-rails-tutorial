import { Platform } from 'react-native';

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios') ? 20 : 25;
export const NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 44 : 31;
