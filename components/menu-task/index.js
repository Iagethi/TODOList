import React from 'react';
import { Button} from 'react-native-elements'
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import {style} from './style';

const MenuTask = ({isVisible, onDisapearCallBack, onDeleteCallBack, onChangeStatusCallBack}) => (
    <TouchableWithoutFeedback onPress={()=> onDisapearCallBack()}>
        <Modal
        isVisible={isVisible}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}

        >
            <TouchableWithoutFeedback>
                <View style={style.modal}>
                    <View style={style.textView}>
                        <Text>Que souhitez vous faire sur la tâche</Text>   
                    </View> 
                    <View style={style.buttonView}>
                        <Button
                        buttonStyle={style.buttonDelete}
                        title="Supprimer"
                        onPress={()=> onDeleteCallBack()}
                        />
                        <Button
                        buttonStyle={style.buttonChangeStatus}
                        title="Modifier status"
                        onPress={()=> onChangeStatusCallBack()}
                        />
                    </View> 
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </TouchableWithoutFeedback>
);

export default MenuTask;