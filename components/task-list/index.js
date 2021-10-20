import React from 'react';
import { ListItem, Avatar, Badge } from 'react-native-elements'
import { View, Text } from 'react-native';
import { TASK } from '../model/index';
import { APP_COLORS } from '../../styles/color';


export const TaskList = ({ taskList, onPressCallBack, onLongPressCallBack }) => (
<View>
  {
    taskList.map((task, i) => (
      <ListItem key={i} bottomDivider
        onPress={()=> onPressCallBack(task)}
        onLongPress = {()=> onLongPressCallBack(task)}
      >
        <ListItem.Content>
          <ListItem.Title>{task.content}</ListItem.Title>

        </ListItem.Content>
        <Badge
            value={task.status}
            badgeStyle={
                task.status === TASK.doneStatus ? {backgroundColor: 'green'} : {backgroundColor : APP_COLORS.lightPrimaryColor }

            }
          />
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>

);

export default TaskList;