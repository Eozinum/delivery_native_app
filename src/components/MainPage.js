/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {ToggleButton} from 'react-native-paper';
import {spacing} from '../constants/sizes';
import {CheckTtn} from './CheckTtn';
import {Departments} from './Departments';

export const MainPage = () => {
  const [isLeftActive, setIsLeftActive] = useState(true);
  const [isRightActive, setIsRightActive] = useState(false);
  const [value, setValue] = useState('left');

  const handleTogglePress = () => {
    setIsLeftActive(isLeftActive ? false : true);
    setIsRightActive(isRightActive ? false : true);
  };

  return (
    <SafeAreaView>
      <ToggleButton.Row
        style={styles.toggleContainer}
        onValueChange={value => setValue(value)}
        value={value}>
        <ToggleButton
          isActive={isLeftActive}
          style={isLeftActive ? styles.toggleActive : styles.toggleNotActive}
          onPress={handleTogglePress}
          icon={() => (
            <View>
              <Text style={isLeftActive ? styles.whiteText : styles.greyText}>
                Check TTN Info
              </Text>
            </View>
          )}
          value="left"
        />
        <ToggleButton
          style={isRightActive ? styles.toggleActive : styles.toggleNotActive}
          isActive={isRightActive}
          onPress={handleTogglePress}
          icon={() => (
            <View>
              <Text style={isRightActive ? styles.whiteText : styles.greyText}>
                Departments
              </Text>
            </View>
          )}
          value="right"
        />
      </ToggleButton.Row>
      {isLeftActive ? <CheckTtn /> : <Departments />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toggle: {
    width: 150,
    borderRadius: spacing.sm,
  },
  toggleActive: {
    width: 150,
    borderRadius: spacing.sm,
    borderColor: '#f44336',
    backgroundColor: '#f44336',
  },
  toggleNotActive: {
    width: 150,
    borderRadius: spacing.sm,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  toggleContainer: {
    marginVertical: 40,
    justifyContent: 'center',
  },
  whiteText: {
    color: '#fff',
  },
  greyText: {
    color: 'grey',
  },
});
