import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { fullBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    textColor: fullBlack,
    primaryText: fullBlack,
    secondaryText: fullBlack,
  },
  userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all',
});

const strings = [
  'Whats', 'up', 'CS', '98', 'friends',
];

/**
 * Two examples of filtering. The first uses `caseInsensitiveFilter`, the second uses `fuzzyFilter`,
 * and limits the number of results displayed using the `maxSearchResults` property.
 * http://www.material-ui.com/#/components/auto-complete
 */
const Search = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AutoComplete
      floatingLabelText="Search"
      filter={AutoComplete.fuzzyFilter}
      dataSource={strings}
      maxSearchResults={5}
      style={{ color: fullBlack }}
    />
    {/* changing the style isn't working */}
  </MuiThemeProvider>
);

export default Search;
