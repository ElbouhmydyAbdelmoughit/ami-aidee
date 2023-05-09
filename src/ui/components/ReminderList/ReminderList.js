import React from 'react'
import { FlatList, View } from 'react-native'
import Config from 'react-native-config'

import ReminderItem from './ReminderItem'
import styles from './styles'

const ReminderList = ({ style, data, loading, onPress, onRefreshing }) => {
  console.log('data')
  console.log(data)

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const handlePress = item => {
    onPress(item)
  }

  const handleRefreshing = () => {
    onRefreshing()
  }

  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <ReminderItem
        title={item.subjet}
        desc={item.activite}
        image={`${Config.API_URL}/${item.picture_url}`}
        onPress={() => handlePress(item)}
      />
    )
  }

  const _keyExtractor = (item, index) => {
    item.id
  }

  return (
    <View style={style}>
      <FlatList
        vertical
        data={data}
        refreshing={loading}
        onRefresh={handleRefreshing}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default ReminderList
