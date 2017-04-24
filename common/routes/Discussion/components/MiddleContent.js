import React from 'react';
import MyCard from './MyCard';
import Comments from './Comments';
// import { styles } from '../styles/styles';

/* eslint-disable */

const annotation = {
  title: 'Trump lol',
  subtitle: 'The president tends to grow frustrated if crucial\
            intelligence is not delivered within the first seven letters or so.\
            We recently gave him a briefing that consisted only of the term ‘nuclear proliferation,’\
            but he clearly became distracted by the end of the',
  expandableText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.\
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.\
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
};

/* eslint-enable */

const MiddleContent = props =>
  (
    <div id="card1">
      <MyCard annotation={annotation} />
      <Comments />
    </div>
  );

export default MiddleContent;
