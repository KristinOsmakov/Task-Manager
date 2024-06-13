import type { Meta, StoryObj } from '@storybook/react';
import s from "../AddItemForm.module.css";
import * as React from "react";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../redusers/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TODOLISTS/AppWithRedux',
  component: AppWithRedux,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof AppWithRedux>;

export default meta;
type Story = StoryObj<typeof meta>;
export const AppWithReduxStory: Story = {}