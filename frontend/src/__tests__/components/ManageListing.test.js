import React from 'react';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageListing from '../../components/ManageListing';

describe('ManageListing components', () => {
  beforeEach(() => {
    render(
      <Router>
        <ManageListing />
      </Router>
    );
  });
});