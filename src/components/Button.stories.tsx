import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'My/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  variant: 'default',
  children: 'Button',
}

export const Red = Template.bind({})
Red.args = {
  variant: 'red',
  children: 'Button',
}

export const Blue = Template.bind({})
Blue.args = {
  variant: 'blue',
  children: 'Button',
}

export const Disabled = Template.bind({})
Disabled.args = {
  variant: 'blue',
  disabled: true,
  children: 'Button',
}
