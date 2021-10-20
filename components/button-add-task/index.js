import React from 'react';
import { APP_COLORS } from '../../styles/color';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const ButtonAddTask = ({onPressCallBack}) => (
    <ActionButton
        buttonColor={
            APP_COLORS.primaryAction
        }
        renderIcon={active => active ? (<Icon color={APP_COLORS.primaryText} name={'add'}/>) : (<Icon color={APP_COLORS.primaryText} name={'add'}/>) }
        onPress={()=>onPressCallBack()}
    />
)

function onPress(){
    console.log('add');
}

export default ButtonAddTask;