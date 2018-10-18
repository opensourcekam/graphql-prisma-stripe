import React from 'react';
import { storiesOf } from '@storybook/react';
import SubscribeUser from './';

storiesOf('SubscribeUser', module)
	.add('base', () =>
		<SubscribeUser>Component</SubscribeUser>
	);
