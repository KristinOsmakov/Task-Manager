import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import s from "../AddItemForm.module.css";
import * as React from "react";

import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../redusers/store";
import {TaskType} from "../App";
import {Tasks} from "../Tasks";
import {v1} from "uuid";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TODOLISTS/Tasks',
  component: Tasks,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
  // More on argTypes: https://storybook.js.org/docs/api/argtypes

} satisfies Meta<typeof Tasks>;

export default meta;
type Story = StoryObj<typeof meta>;

 const TaskWithRedux = () => {
  let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

     if (!task) task =  {id: v1(), title: "DEFAULT TASK", isDone: true}

  return <Tasks task={task} todolistId={'todolistId1'}/>
}

export const TasksStory = {
  render: () => <TaskWithRedux />
}
