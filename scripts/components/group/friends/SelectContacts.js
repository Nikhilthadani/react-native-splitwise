import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
const RenderItem = ({name,phone}) => {
    return <Button style={{ flex: 1, bord }}>
        <View>
            <Text>{name}</Text>
            <Text>{phone }</Text>
        </View>
    </Button>
}
const SelectContacts = ({contacts}) => {
  return (
   <FlatList data={contacts} renderItem={} />
  );
};

export default SelectContacts;

const styles = StyleSheet.create({});
