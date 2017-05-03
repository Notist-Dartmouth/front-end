import React from 'react';
import Annotation from '../../Discussion/components/MyCard';
// An arraylist of annotations queried from the adipiscing -- each of them are myCard objects

const recentAnnotationsArray = [
  {
    title: 'Hello',
    subtitle: 'Lorem ipsum',
    expandableText: 'Hi',
  },
  {
    title: 'Hello',
    subtitle: 'Lorem ipsum',
    expandableText: 'Hi',
  },
  {
    title: 'Hello',
    subtitle: 'Lorem ipsum',
    expandableText: 'Hi',
  },
];

// Eventually replace recentAnnotationsArray with props.recentAnnotationsarray from mapping store to state

const RecentAnnotations = props => (
  <div>
    {recentAnnotationsArray.map((annotation, i) => {
      /* eslint-disable */
      return (<Annotation annotation={annotation} key={i} id={i} />);
      /* eslint-enable */
    })}
  </div>
);

export default RecentAnnotations;
