import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
// import Address from './Address';

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      {/* <Address /> */}
      <Text>Hello!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
