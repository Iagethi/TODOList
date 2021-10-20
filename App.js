
import React from 'react';
import lodash from 'lodash';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import Header from './components/header';
import TaskList from './components/task-list';
import ButtonAddTask from './components/button-add-task';
import MenuTask from './components/menu-task';
import { TASK } from './components/model/index';
import TextPrompt from './components/text-prompt';
import { style } from './style.js';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      taskList: [], 
      isMenuTaskVisible:false, 
      currentTask: {}, 
      isAddPromptVisible: false, 
      idGenerator: 0,
      isRenamePromptVisible: false,
    };
  }

  displayMenuTask = (taskContent) => {
    console.log('onPress', taskContent);
  };

  toogleMenuTaskVisibility = task => {
    let currentTask = task;
    if(this.state.isMenuTaskVisible){
      currentTask = {};
    }
    this.setState({isMenuTaskVisible:!this.state.isMenuTaskVisible, currentTask: currentTask});
  };

  deleteCurrentTask = () => {
    const index = lodash.findIndex(this.state.taskList, {id:this.state.currentTask.id});

    const list = this.state.taskList;
    list.splice(index,1);
    this.setState({taskList:list,currentTask:{}});
    this.toogleMenuTaskVisibility();
  };

  toogleTaskStatus = () => {
    const updatedStatus = this.state.currentTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus;
    const upadatedTask = this.state.currentTask;
    upadatedTask.status = updatedStatus;
    const index = lodash.findIndex(this.state.taskList, {id:this.state.currentTask.id});

    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = upadatedTask;
    this.setState({
      taskList:updatedTaskList,
      isMenuTaskVisible:false,
      currentTask:{}
    })

  };


  hideAddPrompt = () => {
    this.setState({isAddPromptVisible: false})
  }

  onAddTask = value => {
    const newTask = {
      id: this.state.idGenerator,
      content: value,
      status: TASK.todoStatus
    };
    this.setState({taskList:[...this.state.taskList, newTask],
    isAddPromptVisible: false, idGenerator: this.state.idGenerator + 1
    });
  }

  displayAddPrompt = () => {
    this.setState({isAddPromptVisible:true})
  }

  displayRenameTask = (task) => {
    this.setState({ currentTask: task, isRenamePromptVisible: true });
  }

  hideRenamePrompt = () => {
    this.setState({ isRenamePromptVisible: false, currentTask: {} })
  }
  
  renameTask = (value) => {
    const updatedTask = this.state.currentTask;
    updatedTask.content = value;
    const index = lodash.findIndex(this.state.taskList, {id:this.state.currentTask.id});

    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = updatedTask;

    this.setState({ taskList:updatedTaskList}, () => {
      this.hideRenamePrompt();
    });
  }

  renderTaskList = () => {
    if(this.state.taskList.lenght>0){
      return (
        <TaskList 
        onPressCallBack={this.toogleMenuTaskVisibility}
        onLongPressCallBack={this.displayRenameTask}
        taskList={this.state.taskList}/>
      );
    } 
    return  <Text>Cliquer sur le bouton ajouter pour créer une tâche</Text> ;
  }

  render(){
    return (
      <View style={{ flex:1 }}>
        <Header content="Liste de tâches"/>
        <ScrollView>
          {this.renderTaskList()}
        </ScrollView>
        <MenuTask
        isVisible={this.state.isMenuTaskVisible} 
        onDisapearCallBack={this.toogleMenuTaskVisibility}
        onDeleteCallBack={this.deleteCurrentTask}
        onChangeStatusCallBack={this.toogleTaskStatus}
        />
        <TextPrompt 
        isVisible={this.state.isAddPromptVisible} 
        onCancelCallBack={this.hideAddPrompt} 
        onSubmitCallBack={this.onAddTask}
        title={"Ajouter une nouvelle tache"}
        placeHolder={'Ex: Acheter du lait'}
        defaultValue={""}
        />
        <TextPrompt 
        isVisible={this.state.isRenamePromptVisible} 
        onCancelCallBack={this.hideRenamePrompt} 
        onSubmitCallBack={this.renameTask}
        title={"Renommer la tache"}
        placeHolder={''}
        defaultValue={this.state.currentTask.content}
        />
        <ButtonAddTask onPressCallBack={this.displayAddPrompt} />
      </View>
  
    );
  }


}

