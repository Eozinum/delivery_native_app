/* eslint-disable dot-notation */
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, FlatList} from 'react-native';
import {useDepartments} from '../hooks/useDepartments';
import {DepartmentItem} from './DepartmentItem';
import {spacing, fontSizes} from '../constants/sizes';
import {colors} from '../constants/colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput, Button} from 'react-native-paper';

export const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const validation = Yup.object({
    cityName: Yup.string()
      .matches(/^[а-яА-Я]*$/, 'Enter valid city name!')
      .required('Enter city'),
  });

  const handlePress = (city: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDepartments(city).then(data => {
      setDepartments(data);
      Keyboard.dismiss();
    });
  };

  const renderItem = ({item}: any) => (
    <DepartmentItem department={`✧ ${item.Description}`} />
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Find Departments</Text>
      </View>
      <Formik
        onSubmit={({cityName}) => handlePress(cityName)}
        validationSchema={validation}
        initialValues={{cityName: ''}}>
        {({handleChange, handleSubmit, errors, values}) => (
          <View>
            <TextInput
              mode="outlined"
              theme={{roundness: spacing.sm}}
              outlineColor={colors.lightGray}
              selectionColor={colors.red}
              activeOutlineColor={colors.red}
              label="Enter city name"
              onChangeText={handleChange('cityName')}
              value={values.cityName}
              style={styles.input}
            />
            {errors.cityName && (
              <Text style={styles.error}>{errors.cityName}</Text>
            )}
            <View style={styles.buttonWrapper}>
              <Button
                textColor={colors.white}
                labelStyle={styles.buttonLabel}
                style={styles.button}
                onPress={handleSubmit}>
                Show Departments
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <FlatList
        style={styles.list}
        data={departments}
        renderItem={renderItem}
        keyExtractor={item => item['SiteKey']}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
  },
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
    marginVertical: spacing.md,
  },
  error: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.red,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
});
