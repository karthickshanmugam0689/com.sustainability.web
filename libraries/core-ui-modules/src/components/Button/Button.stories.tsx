import type { Story } from '@storybook/react/types-6-0';

import { Button } from './Button';
import { IButton } from './IButton';

export default {
  title: 'Button',
  component: Button,
};

const Template: Story<IButton> = args => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  text: 'Sample',
  onClick: () => alert('Clicked me'),
};
