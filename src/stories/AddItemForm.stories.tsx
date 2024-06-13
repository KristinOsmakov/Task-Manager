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


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: 'Button clicked inside',
      // action: 'clicked'
    }

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { addItem: fn() },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;
export const AddItemFormStory: Story = {};

const AddItemFormWithError = (props: AddItemFormPropsType) => {
  const [itemTitle, setItemTitle] = useState('')
  const [error, setError] = useState<string | null>('Title is required')

  const addItemHandler = () => {

    if(itemTitle.trim()){
      props.addItem(itemTitle.trim())
      setItemTitle('')
    }
    else{
      setError('Title is required')
    }

  }
  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value)
  }
  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null)
    if (event.key === 'Enter') {
      addItemHandler()
    }
  }

  return (
      <div>
        <TextField
            label="Enter a title"
            variant={'outlined'}
            value={itemTitle}
            size={'small'}
            error={!!error}
            helperText={error}
            onChange={changeItemTitleHandler}
            onKeyUp={addItemOnKeyUpHandler}
        />
        {/*<Button title={'+'} onClick={addItemHandler}/>*/}
        <IconButton
            color={"success"}
            onClick={addItemHandler}
            aria-label="add">
          <AddTaskIcon />
        </IconButton>
        {error && <div className={s.errorMessage}>{error}</div>}
      </div>
  );
}

export const AddItemFormWithErrorStory: Story = {
  render: (args) => <AddItemFormWithError addItem={args.addItem}/>
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
