const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  subRoot: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  container: {
    maxWidth: '60rem',
  },
  textField: {
    width: '12rem',
    marginBottom: '1.5rem',
    color: '#3f51b5',
  },
  timer: {
    width: '10rem',
    height: '10rem',
    background: '#ffffff',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#3f51b5',
  },
  card: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    minWidth: '60rem',
  },
  pos: {
    marginTop: 12,
    marginBottom: 3,
  },
  actionTimer: {
    marginBottom: '1.5rem',
    background: '#ffffff',
    color: '#3f51b5',
  },
  actionButton: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    background: '#ffffff',
    color: '#3f51b5',
  },
  buttonContainerCenter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tabs: {
    marginBottom: '1.5rem',
  },
  tabsItems: {
    background: '#00bcd4',
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: '40rem',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  modalContent: {
    marginBottom: '1.5rem',
  },
  modalClose: {
    position: 'absolute',
    color: '#3f51b5',
    right: 15,
    bottom: 10,
  },
  contentWrapper: {
    marginBottom: '1.5rem',
  },
  button: {
    background: '#ffffff',
    color: '#3f51b5',
  },
  cellTable: {
    background: '#eaf6ff',
  },
  marginTopContainer: {
    marginTop: '1.5rem',
  },
});

export default styles;
