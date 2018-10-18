import React from 'react';
import { storiesOf } from '@storybook/react';
import AccountInput from './';

storiesOf('AccountInput', module)
	.add('base', () =>
		<AccountInput>Component</AccountInput>
	);
