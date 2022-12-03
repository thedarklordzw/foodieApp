import React from 'react';
import axios from 'axios';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';

const SearchBar = ({ navigation, onSearch, onSubmit }) => {
  const onTextChangeHandler = event => {
    onSearch(event);
  };

  return (
    <View style={styles.view}>
      <EvilIcons style={styles.icon} name='search' size={30} />
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.textInput}
        placeholder='Search'
        onChangeText={onTextChangeHandler}
        onEndEditing={onSubmit}
      />
      {/* <Pressable>
        <Text>Search</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cfdae5',
    borderRadius: 6,
  },

  textInput: {
    borderColor: 'transparent',
    borderWidth: 1,
    fontSize: 16,
    width: '100%',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default SearchBar;
