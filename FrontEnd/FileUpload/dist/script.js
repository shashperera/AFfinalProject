console.clear();
const {
  createClass,
  PropTypes } =
React;
const {
  render } =
ReactDOM;

const styles = {
  inputWrapper: 'input-wrapper',
  inputCover: 'input-cover',
  helpText: 'help-text',
  fileName: 'file-name',
  fileNameStretch: 'file-name spacer',
  fileExt: 'file-ext',
  fileDrag: 'file-drag',
  input: 'input',
  loader: 'loader',
  disabled: 'disabled',
  loading: 'loading',
  loaderItem: 'loader-item',
  spacer: 'spacer',
  button: 'button',
  hover: 'hover',
  imagePreview: 'image-preview',
  preview: 'preview',
  previewItem: 'preview-item',
  previews: 'previews' };


const uploadFileToServer = file => {
  const delay = file.size / 100;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

const getExtFromType = type => {
  const parts = type.split('/');
  return parts[parts.length - 1];
};
const getExtFromName = name => {
  const parts = name.split('.');
  return parts[parts.length - 1];
};

const Loader = () => {
  return React.createElement("div", { className: styles.loader },
  React.createElement("span", { className: styles.loaderItem }),
  React.createElement("span", { className: styles.loaderItem }),
  React.createElement("span", { className: styles.loaderItem }));

};

const FilePreview = createClass({
  getInitialState() {
    return {
      loading: true };

  },
  getDefaultProps() {
    return {
      onRemove: () => {} };

  },
  componentWillMount() {
    this.loadData();
  },
  componentWillReceiveProps(newProps) {
    this.loadData(newProps.data);
  },
  loadData(data = this.props.data) {
    if (!data) {
      return;
    }
    const reader = new FileReader();
    const type =
    data.type.match('text') ?
    'text' :
    data.type.match('image') ?
    'image' :

    data.type;


    reader.onload = e => {
      const src = e.target.result;
      this.setState({
        src,
        type,
        loading: false });

    };
    if (type === 'text') {
      reader.readAsText(data);

    } else if (type === 'image') {
      reader.readAsDataURL(data);
    } else {
      this.setState({
        src: false,
        type,
        loading: false });

    }
  },
  render() {
    const loading =
    this.state.loading ?
    'loading data...' :

    null;


    const uploading =
    this.props.data.loading ?
    React.createElement(Loader, null) :

    null;


    const preview =
    !this.state.loading && !this.props.data.loading ?
    this.state.type === 'text' ?
    React.createElement("pre", { className: styles.preview }, this.state.src) :
    this.state.type === 'image' ?
    React.createElement("img", { alt: "preview", src: this.state.src, className: styles.imagePreview }) :

    React.createElement("pre", { className: styles.preview }, "no preview") :


    null;


    const classes = [
    styles.previewItem,
    this.props.data.loading ? styles.disabled : ''].
    join(' ').trim();
    return (
      React.createElement("div", { className: classes },
      uploading,
      loading,
      preview,
      React.createElement("div", { className: styles.fileNameStretch }, this.props.data.name),
      React.createElement("button", { className: styles.button,
        onClick: this.props.onRemove }, "remove"),


      React.createElement("button", { className: styles.button,
        onClick: this.props.onUpload }, "upload")));




  } });


const FileUpload = React.createClass({ displayName: "FileUpload",
  getInitialState() {
    return {
      fileList: [] };

  },

  handleDragOver(e) {
    if ('preventDefault' in e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const hoverState =
    e.type === 'dragover' ?
    styles.hover :

    null;


    this.setState({
      hoverState });

  },
  handleFileSelect(e) {
    this.handleDragOver(e);
    const files = e.target.files || e.dataTransfer.files;
    const fileList = Object.keys(files).map(file => files[file]);
    this.setState({
      fileList });

  },

  removeItem(index) {
    const fileList = this.state.fileList;
    fileList.splice(index, 1);
    this.setState({
      fileList });

  },
  removeFile(file) {
    const fileList = this.state.fileList;
    const index = fileList.indexOf(file);
    this.removeItem(index);
  },
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      const fileList = this.state.fileList;
      const index = fileList.indexOf(file);
      fileList[index].loading = true;
      this.setState({ fileList });
      if (typeof file === 'file' || !('size' in file)) {
        return reject(new Error('No file size'));
      }
      this.props.onUpload(file).then(data => {
        resolve(data);
      });
    });
  },

  previews() {
    return this.state.fileList.map((file, index) => {
      const removeItem = () => {
        this.removeItem(index);
      };
      const uploadFile = () => {
        this.uploadFile(file).then(() => {
          this.removeFile(file);
        });
      };
      return (
        React.createElement(FilePreview, { key: index,
          data: file,
          onRemove: removeItem,
          onUpload: uploadFile }));

    });
  },
  uploadFiles() {
    this.state.fileList.forEach(file => {
      this.uploadFile(file).then(() => {
        this.removeFile(file);
      });
    });
  },
  selectFile(e) {
    e.preventDefault();
    this.input.click(e);
  },
  render() {
    const {
      maxSize,
      name,
      multiple,
      label } =
    this.props;

    const dragClasses = [
    styles.fileDrag,
    this.state.hoverState].
    join(' ').trim();
    const fileExt =
    this.state.fileList.length === 1 ?
    this.state.fileList[0].type ?
    `.${getExtFromType(this.state.fileList[0].type)}` :

    `.${getExtFromName(this.state.fileList[0].name)}` :


    null;


    const extTail =
    fileExt ?
    React.createElement("span", { className: styles.fileExt }, fileExt) :

    null;


    const fileNames =
    this.state.fileList.length > 1 ?
    `${this.state.fileList.length} Files` :
    this.state.fileList.length === 1 ?
    this.state.fileList[0].name.replace(fileExt, '') :

    'No file chosen';



    return (
      React.createElement("div", null,
      React.createElement("input", { type: "hidden", name: `${name}:maxSize`, value: maxSize }),
      React.createElement("div", null,
      React.createElement("label", null,
      React.createElement("span", null, label),
      React.createElement("div", { className: dragClasses,
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragOver,
        onDrop: this.handleFileSelect },
      React.createElement("div", { className: styles.inputWrapper },
      React.createElement("input", { type: "file",
        tabIndex: "-1",
        ref: x => this.input = x,
        className: styles.input,
        name: name,
        multiple: multiple,
        onChange: this.handleFileSelect }),
      React.createElement("div", { className: styles.inputCover },
      React.createElement("button", { className: styles.button,
        type: "button",
        onClick: this.selectFile }, "Choose Files"),

      React.createElement("span", { className: styles.fileName }, fileNames),
      extTail)),


      React.createElement("span", { className: styles.helpText }, "or drop files here"))),

      React.createElement("button", { className: styles.button,
        type: "button",
        onClick: this.uploadFiles }, "Upload All"),


      React.createElement("div", { className: styles.previews }, this.previews()))));



  } });


const app = document.getElementById('app');
render(React.createElement(FileUpload, { multiple: true,
  name: "example-upload",
  maxSize: 300000,
  onUpload: uploadFileToServer,
  label: "Upload Files" }), app);