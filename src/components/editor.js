import React from "react";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw, AtomicBlockUtils } from "draft-js";
import "./rich.css";

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), showURLInput: false, url: "", urlType: "" };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const contentState = editorState.getCurrentContent();
    localStorage.setItem("contents", JSON.stringify(convertToRaw(contentState)));
    // console.log(JSON.stringify(convertToRaw(contentState).blocks[0].text));
    let isempty = JSON.stringify(convertToRaw(contentState).blocks[0].text);

    if (isempty == '""') {
      this.props.onChange("null");
    } else if (isempty.length > 1) {
      this.props.onChange(convertToRaw(contentState));
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _confirmMedia(e) {
    e.preventDefault();
    const { editorState, urlValue, urlType } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, "IMMUTABLE", { src: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    this.setState(
      {
        // The third parameter here is a space string, not an empty string
        // If you set an empty string, you will get an error: Unknown DraftEntity key: null
        editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "),
        showURLInput: false,
        urlValue: "",
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  }

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }

  _promptForMedia(type) {
    this.setState(
      {
        showURLInput: true,
        urlValue: "",
        urlType: type,
      },
      () => {
        setTimeout(() => this.refs.url.focus(), 0);
      }
    );
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, this.state.editorState, 4 /* maxDepth */);
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }
  _onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log("content state", convertToRaw(contentState));
    this.setState({
      editorState,
    });
  };

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }

  _promptForMedia(type) {
    this.setState(
      {
        showURLInput: true,
        urlValue: "",
        urlType: type,
      },
      () => {
        setTimeout(() => this.refs.url.focus(), 0);
      }
    );
  }

  _addAudio() {
    this._promptForMedia("audio");
  }

  _addImage() {
    this._promptForMedia("image");
  }

  _addVideo() {
    this._promptForMedia("video");
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>Confirm</button>
        </div>
      );
    }

    return (
      <div className="RichEditor-root">
        {this.props.viewBox && (
          <div style={styles.buttons}>
            <button onMouseDown={this.addAudio} style={{ marginRight: 10 }}>
              Add Audio
            </button>
            <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
              Add Image
            </button>
            <button onMouseDown={this.addVideo} style={{ marginRight: 10 }}>
              Add Video
            </button>
          </div>
        )}
        {urlInput}
        {/* NewCode */}
        {this.props.viewBox && <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />}
        {this.props.viewBox && <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />}

        <div className={className} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.props.viewState !== "" ? this.props.viewState : editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Start Here"
            ref="editor"
            spellCheck={true}
            readOnly={this.props.readOnly}
          />
        </div>
      </div>
    );
  }
}

// // Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

function mediaBlockRenderer(block) {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};

const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === "audio") {
    media = <Audio src={src} />;
  } else if (type === "image") {
    media = <Image src={src} />;
  } else if (type === "video") {
    media = <Video src={src} />;
  }

  return media;
};

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: "center",
  },
  media: {
    width: "100%",
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: "initial",
  },
};

export default RichEditor;
