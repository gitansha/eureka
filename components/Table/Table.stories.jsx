import { Table } from './Table';

export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs']
};

export const Lined = {
  args: {
    type: 'lined',
    input: '[{"Account": "Visa","Date": "10-10-2020","Amount": 200,"Terms": "2 Months"}, {"Account": "Master","Date": "08-10-2020","Amount": 200,"Terms": "3 Months"},{"Account": "Cirrus","Date": "10-12-2020","Amount": 350,"Terms": "5 Months"},{"Account": "Visa","Date": "25-03-1865","Amount": 463,"Terms": "3 Months"}, {"Account": "AMEX","Date": "10-10-2020","Amount": 400,"Terms": "12 Months"}]',
    search: false,
    sort: false,
    siblingCount: 1,
    paginationProps: {
      paginationType: "default"
    },
    searchProps: {
      textinputType: 'outlined',
      placeholder: 'Search',
      textinputDisabled: false,
      helpText: '',
      trailingIcon: false,
      error: false,
      textinputLeadIcon: {
        textinputIcon: "search",
        textinputIconFamily: "solid"
      },
    },
    inverted: false,
  },
};

export const Unlined = {
  args: {
    type: 'unlined',
    input: '[{"Account": "Visa","Date": "10-10-2020","Amount": 200,"Terms": "2 Months"}, {"Account": "Master","Date": "08-10-2020","Amount": 200,"Terms": "3 Months"},{"Account": "Cirrus","Date": "10-12-2020","Amount": 350,"Terms": "5 Months"},{"Account": "Visa","Date": "25-03-1865","Amount": 463,"Terms": "3 Months"}, {"Account": "AMEX","Date": "10-10-2020","Amount": 400,"Terms": "12 Months"}]',
    search: false,
    sort: false,
    siblingCount: 1,
    paginationProps: {
      paginationType: "default"
    },
    searchProps: {
      textinputType: 'outlined',
      placeholder: 'Search',
      textinputDisabled: false,
      helpText: '',
      trailingIcon: false,
      error: false,
      textinputLeadIcon: {
        textinputIcon: "search",
        textinputIconFamily: "solid"
      },
    },
    inverted: false,
  },
};

export const Alternate = {
  args: {
    type: 'alternate',
    input: '[{"Account": "Visa","Date": "10-10-2020","Amount": 200,"Terms": "2 Months"}, {"Account": "Master","Date": "08-10-2020","Amount": 200,"Terms": "3 Months"},{"Account": "Cirrus","Date": "10-12-2020","Amount": 350,"Terms": "5 Months"},{"Account": "Visa","Date": "25-03-1865","Amount": 463,"Terms": "3 Months"}, {"Account": "AMEX","Date": "10-10-2020","Amount": 400,"Terms": "12 Months"}]',
    search: false,
    sort: false,
    siblingCount: 1,
    paginationProps: {
      paginationType: "default"
    },
    searchProps: {
      textinputType: 'outlined',
      placeholder: 'Search',
      textinputDisabled: false,
      helpText: '',
      trailingIcon: false,
      error: false,
      textinputLeadIcon: {
        textinputIcon: "search",
        textinputIconFamily: "solid"
      },
    },
    inverted: false,
  },
};