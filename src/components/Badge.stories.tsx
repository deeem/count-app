import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import '../index.css'

import { Badge } from './Badge'

export default {
  title: 'My/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  variant: 'orange',
  children: 'lorem',
}
