import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#F0F0F0',
    shadowColor: '#000000',
    shadowRadius: 11,
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  header: {
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  body: {
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#555555',
  },
});

export default styles;
