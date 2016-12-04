import { StyleSheet } from 'react-native';
import * as colors from 'ReactNativeTutorial/app/styles/colors';

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: colors.TABBAR_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.BORDER,
  },
});

export default styles;
