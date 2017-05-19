import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import FlatButton from 'material-ui/FlatButton';

/* eslint-disable max-len */
const styles = {
  markdown: {
    icon: 'M950.154 192H73.846C33.127 192 0 225.12699999999995 0 265.846v492.308C0 798.875 33.127 832 73.846 832h876.308c40.721 0 73.846-33.125 73.846-73.846V265.846C1024 225.12699999999995 990.875 192 950.154 192zM576 703.875L448 704V512l-96 123.077L256 512v192H128V320h128l96 128 96-128 128-0.125V703.875zM767.091 735.875L608 512h96V320h128v192h96L767.091 735.875z',
    viewBoxSize: 1024,
    size: 20,
  },
  container: {
    marginLeft: '20px',
    marginRight: '15px',
  },
  controlBar: {
    border: '1px solid gray',
    width: '30%',
    backgroundColor: 'white',
  },
};

class CommentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPreview: false,
    };
  }

  render() {
    const editorStyle = {
      border: this.state.isPreview ? 'none' : '1px solid gray',
      backgroundColor: 'white',
      borderTop: 'none',
      width: this.state.isPreview ? '100%' : '30%',
      minHeight: '100px',
      fontSize: '14px',
      cursor: 'text',
      padding: '5px',
      fontFamily: 'inherit',
      resize: 'none',
    };
    return (
      <div style={styles.container}>
        <div style={styles.controlBar}>
          <span style={{ paddingLeft: '10px' }}>
            <svg
              width={styles.markdown.size}
              height={styles.markdown.size}
              viewBox={`0 0 ${styles.markdown.viewBoxSize} ${styles.markdown.viewBoxSize}`}
            >
              <path d={styles.markdown.icon} />
            </svg>
          </span>
          <FlatButton
            onClick={() => this.setState({ isPreview: true })}
            label="Preview"
            primary
            disabled={this.state.isPreview}
          />
          <FlatButton
            onClick={() => this.setState({ isPreview: false })}
            label="Write"
            primary
            disabled={!this.state.isPreview}
          />
        </div>
        <textarea
          style={editorStyle}
          hidden={this.state.isPreview}
          value={this.props.markdown}
          onChange={this.props.onMarkdownChange}
          placeholder="Enter Comment"
        >{this.props.isEditing ? this.props.preloadedText : ''}</textarea>
        <div
          style={editorStyle}
          hidden={!this.state.isPreview}
          dangerouslySetInnerHTML={{
            __html: this.props.markdown.length > 0 ? marked(this.props.markdown) : marked('Nothing to preview'),
          }}
        />
      </div>
    );
  }
}

CommentEditor.propTypes = {
  onMarkdownChange: PropTypes.func.isRequired,
  markdown: PropTypes.string.isRequired,
};

export default CommentEditor;
