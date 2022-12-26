import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {useTtnInfo} from '../hooks/useTtnInfo';
import {initialData, PHONE, TTN} from '../constants/constants';
import {fontSizes, spacing} from '../constants/sizes';
import {TtnInfo} from '../components/TtnInfo';

export const MainPage = () => {
  const [renderData, setRenderData] = useState(initialData);
  const [isShownInfo, setIsShownInfo] = useState(false);

  const handlePress = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTtnInfo(TTN, PHONE).then(data => {
      setRenderData(data);
      setIsShownInfo(true);
    });
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Package info</Text>
      </View>
      <Button
        style={styles.button}
        onPress={handlePress}
        mode="contained"
        buttonColor="#f44336">
        Get info
      </Button>
      {isShownInfo && <TtnInfo renderData={renderData} />}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
    textAlign: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    flex: 0.2,
    margin: spacing.lg,
  },
  button: {
    marginHorizontal: 100,
    borderRadius: spacing.sm,
    fontSize: fontSizes.xxl,
  },
});
