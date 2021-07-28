import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'

export default {
  title: 'My/Button',
  component: Button,
  args: {
    children: 'Button',
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
}

export const FilledBlueMedium = Template.bind({})
FilledBlueMedium.args = {
  variant: 'filled',
  color: 'blue',
  size: 'medium',
}

export const FilledRedMedium = Template.bind({})
FilledRedMedium.args = {
  variant: 'filled',
  color: 'red',
  size: 'medium',
}

export const FilledGrayMedium = Template.bind({})
FilledGrayMedium.args = {
  variant: 'filled',
  color: 'gray',
  size: 'medium',
}

export const OutlinedBlueMedium = Template.bind({})
OutlinedBlueMedium.args = {
  variant: 'outline',
  color: 'blue',
  size: 'medium',
}

export const OutlinedRedMedium = Template.bind({})
OutlinedRedMedium.args = {
  variant: 'outline',
  color: 'red',
  size: 'medium',
}

export const OutlinedGrayMedium = Template.bind({})
OutlinedGrayMedium.args = {
  variant: 'outline',
  color: 'gray',
  size: 'medium',
}

export const FilledBlueSmall = Template.bind({})
FilledBlueSmall.args = {
  variant: 'filled',
  color: 'blue',
  size: 'small',
}

export const FilledRedSmall = Template.bind({})
FilledRedSmall.args = {
  variant: 'filled',
  color: 'red',
  size: 'small',
}

export const FilledGraySmall = Template.bind({})
FilledGraySmall.args = {
  variant: 'filled',
  color: 'gray',
  size: 'small',
}

export const OutlinedBlueSmall = Template.bind({})
OutlinedBlueSmall.args = {
  variant: 'outline',
  color: 'blue',
  size: 'small',
}

export const OutlinedRedSmall = Template.bind({})
OutlinedRedSmall.args = {
  variant: 'outline',
  color: 'red',
  size: 'small',
}

export const OutlinedGraySmall = Template.bind({})
OutlinedGraySmall.args = {
  variant: 'outline',
  color: 'gray',
  size: 'small',
}

export const FilledBlueLarge = Template.bind({})
FilledBlueLarge.args = {
  variant: 'filled',
  color: 'blue',
  size: 'large',
}

export const FilledRedLarge = Template.bind({})
FilledRedLarge.args = {
  variant: 'filled',
  color: 'red',
  size: 'large',
}

export const FilledGrayLarge = Template.bind({})
FilledGrayLarge.args = {
  variant: 'filled',
  color: 'gray',
  size: 'large',
}

export const OutlinedBlueLarge = Template.bind({})
OutlinedBlueLarge.args = {
  variant: 'outline',
  color: 'blue',
  size: 'large',
}

export const OutlinedRedLarge = Template.bind({})
OutlinedRedLarge.args = {
  variant: 'outline',
  color: 'red',
  size: 'large',
}

export const OutlinedGrayLarge = Template.bind({})
OutlinedGrayLarge.args = {
  variant: 'outline',
  color: 'gray',
  size: 'large',
}
