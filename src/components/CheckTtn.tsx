import React, {useState} from 'react';
import {View, Keyboard, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {TtnInfo} from './TtnInfo';
import {initialData, PHONE_MASK} from '../constants/constants';
import {spacing, fontSizes} from '../constants/sizes';
import {useTtnInfo} from '../hooks/useTtnInfo';
import {Formik} from 'formik';
import MaskInput from 'react-native-mask-input';
import {colors} from '../constants/colors';
import * as Yup from 'yup';

export const CheckTtn = () => {
  const [renderData, setRenderData] = useState(initialData);
  const [isShownInfo, setIsShownInfo] = useState(false);

  const validation = Yup.object({
    numberTtn: Yup.string()
      .min(14, 'Enter valid TTN number')
      .matches(/^\d+$/, 'Enter valid TTN number (only numbers)!')
      .required('Enter TTN number'),

    phone: Yup.string()
      .matches(/^\d+$/, 'Enter valid phone (only numbers)!')
      .min(12, 'Enter valid phone number')
      .required('Enter your phone'),
  });

  const handlePress = (ttn: string, phoneNum: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTtnInfo(ttn, phoneNum).then(data => {
      setRenderData(data);
      setIsShownInfo(true);
    });
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Package Info</Text>
      </View>
      <Formik
        validationSchema={validation}
        initialValues={{numberTtn: '', phone: ''}}
        onSubmit={({numberTtn, phone}) => {
          handlePress(numberTtn, phone);
          Keyboard.dismiss();
        }}>
        {({handleChange, handleSubmit, errors, values}) => {
          const onPhoneChange = handleChange('phone');
          return (
            <View>
              <TextInput
                mode="outlined"
                theme={{roundness: spacing.sm}}
                outlineColor={colors.lightGray}
                selectionColor={colors.red}
                activeOutlineColor={colors.red}
                maxLength={14}
                style={styles.input}
                keyboardType="numeric"
                label="Enter TTN number"
                onChangeText={handleChange('numberTtn')}
                value={values.numberTtn}
              />
              {errors.numberTtn && (
                <Text style={styles.error}>{errors.numberTtn}</Text>
              )}

              <TextInput
                style={styles.input}
                theme={{roundness: spacing.sm}}
                mode="outlined"
                outlineColor={colors.lightGray}
                selectionColor={colors.red}
                activeOutlineColor={colors.red}
                keyboardType="numeric"
                label="Enter phone number"
                render={props => (
                  <MaskInput
                    {...props}
                    onChangeText={(value, unmasked) => {
                      onPhoneChange(`38${unmasked}`);
                    }}
                    mask={PHONE_MASK}
                  />
                )}
                value={values.phone}
              />

              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <View style={styles.buttonWrapper}>
                <Button
                  textColor={colors.white}
                  labelStyle={styles.buttonLabel}
                  style={styles.button}
                  onPress={handleSubmit}>
                  Show Info
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
      {isShownInfo && <TtnInfo renderData={renderData} />}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  button: {
    width: 200,
    backgroundColor: colors.red,
    color: colors.white,
    borderRadius: spacing.sm,
  },
  buttonLabel: {
    fontSize: fontSizes.md,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  error: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    color: colors.red,
  },
  headerContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
  },
});
