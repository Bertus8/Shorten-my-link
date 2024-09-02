import React from 'react';
import Header from '../../client/components/header';
import LinkCreate from '../../client/components/link_create';
import LinkList from '../../client/components/link_list';

export const App = () => (
  <div>
    <Header />
    <LinkCreate />
    <LinkList />
  </div>
);
