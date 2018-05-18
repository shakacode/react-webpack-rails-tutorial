import { StyleSheet } from 'react-native';
import * as colors from 'ReactNativeTutorial/app/styles/colors';

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: colors.ITEM_BACKGROUND,
    shadowColor: colors.SHADOW,
    shadowRadius: 5,
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 5,
  },
  header: {
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    color: colors.HEADER_TEXT,
  },
  body: {
    marginHorizontal: 10,
    marginBottom: 10,
    color: colors.BODY_TEXT,
  },
});

export default styles;
