import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',

  },

  form: {
    width: '100%',
    backgroundColor: '#FFF',
    paddingTop: 62,
    padding: 20,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: 44,
    width: 154
  },

  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: 8,
    flex: 1,
    height: 100,
    width: '100%',
    backgroundColor: '#313030ff',
  },

  header: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E6E8",
    paddingBottom: 12,
  },

  clearButton: {
    alignSelf: "center",
    marginLeft: "auto"
  },

  clearButtonText: {
    color: "#828282",
    fontWeight: 600,
    fontSize: 12
  },
  
  separator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: '#828282',
  },

  listContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },

  emptyListText: {
    color: '#828282',
    fontWeight: 600,
    textAlign: 'center'
  }
})