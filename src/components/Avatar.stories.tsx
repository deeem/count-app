import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import '../index.css'

import { Avatar } from './Avatar'

export default {
  title: 'My/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Default = Template.bind({})
Default.args = {
  photoURL: 'https://i.pravatar.cc/300',
  status: 'online',
  isActive: true,
}
