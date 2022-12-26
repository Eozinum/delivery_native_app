import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontSizes, spacing} from '../constants/sizes';

export const TtnInfo = ({renderData}) => {
  const {
    Status,
    RecipientFullName,
    AnnouncedPrice,
    SenderFullNameEW,
    CityRecipient,
    CitySender,
    CargoDescriptionString,
  } = renderData;

  return (
    <View style={styles.container}>
      <Text style={styles.row}>
        Recipient: <Text style={styles.data}>{RecipientFullName}</Text>
      </Text>
      <Text style={styles.row}>
        Status: <Text style={styles.data}>{Status}</Text>
      </Text>
      <Text style={styles.row}>
        Summ: <Text style={styles.data}>{AnnouncedPrice}</Text>
      </Text>
      <Text style={styles.row}>
        Sender: <Text style={styles.data}>{SenderFullNameEW}</Text>
      </Text>
      <Text style={styles.row}>
        City from: <Text style={styles.data}>{CitySender}</Text>
      </Text>
      <Text style={styles.row}>
        City to: <Text style={styles.data}>{CityRecipient}</Text>
      </Text>
      <Text style={styles.row}>
        Description: <Text style={styles.data}>{CargoDescriptionString}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    flex: 1,
  },
  row: {
    fontWeight: 'bold',
    fontSize: fontSizes.md,
    paddingTop: spacing.md,
  },
  data: {
    fontWeight: 'normal',
  },
});
