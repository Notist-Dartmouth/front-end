// Almost the same as a myCard object but with an avatar section in cardHeader

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { styles, muiTheme } from '../../Discussion/styles/styles';

const userCard = props =>
 (
   <MuiThemeProvider muiTheme={muiTheme}>
     <Card>
       <CardHeader style={styles.cardHeader}
         title="Mark Erwin"
         subtitle="Hi, I'm a lorem ipsum type of writer and I like commenting on lorem ipsum"
         avatar="../../../current-1.png"
         actAsExpander
         showExpandableButton
       />
       <CardActions>
         <FlatButton label="Follow" />
       </CardActions>
       <CardText expandable>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
     </Card>
   </MuiThemeProvider>
    );

export default userCard;
