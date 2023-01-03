/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {TtnInfo} from './TtnInfo';
import {initialData, PHONE_MASK} from '../constants/constants';
import {useTtnInfo} from '../hooks/useTtnInfo';
import {Formik} from 'formik';
import MaskInput from 'react-native-mask-input';
import {Masks, useMaskedInputProps} from 'react-native-mask-input';
import * as Yup from 'yup';

export const CheckTtn = () => {
  const [renderData, setRenderData] = useState(initialData);
  const [isShownInfo, setIsShownInfo] = useState(false);
  const [numberTtn, setNumberTtn] = useState('');
  const [phone, setPhone] = useState('');

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

  const handlePress = (ttn, phoneNum) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTtnInfo(ttn, phoneNum).then(data => {
      setRenderData(data);
      console.log(phoneNum);
      setIsShownInfo(true);
    });
  };
  return (
    <SafeAreaView>
      <Formik
        validationSchema={validation}
        initialValues={{numberTtn: '', phone: ''}}
        onSubmit={({numberTtn, phone}) => {
          setNumberTtn(numberTtn);
          setPhone(phone);
          handlePress(numberTtn, phone);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          setFieldValue,
          values,
        }) => {
          console.log(values);
          const onPhoneChange = handleChange('phone');
          return (
            <View>
              <TextInput
                mode="outlined"
                outlineColor="gray"
                selectionColor="#e5192e"
                activeOutlineColor="#e5192e"
                maxLength={14}
                style={styles.input}
                keyboardType="numeric"
                label="Enter TTN number"
                onChangeText={handleChange('numberTtn')}
                value={values.numberTtn}
              />
              {errors.numberTtn && <Text>{errors.numberTtn}</Text>}

              <TextInput
                style={styles.input}
                mode="outlined"
                outlineColor="gray"
                selectionColor="#e5192e"
                activeOutlineColor="#e5192e"
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

              {errors.phone && <Text>{errors.phone}</Text>}

              <View style={styles.buttonWrapper}>
                <Button
                  textColor="#fff"
                  style={styles.button}
                  onPress={handleSubmit}>
                  Get Info
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
      {isShownInfo && <TtnInfo renderData={renderData} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    width: 200,
    backgroundColor: '#e5192e',
    color: '#fff',
    borderRadius: 8,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
});
