import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refresh } from '../../interactions/auth';

class AuthTimer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;

    this.setRefreshInterval = this.setRefreshInterval.bind(this);
  }

  componentDidMount() {
    this.setRefreshInterval();
  }

  // a refresh has been made.
  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshTime !== this.props.refreshTime) {
      this.setRefreshInterval();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setRefreshInterval() {
    this.timer = setTimeout(this.props.refresh, this.props.refreshTime);
  }

  render() {
    return this.props.children;
  }
}

AuthTimer.propTypes = ({
  children: PropTypes.node.isRequired,
  refresh: PropTypes.func.isRequired,
  refreshTime: PropTypes.number,
});

AuthTimer.defaultProps = ({
  refreshTime: null,
});

const mapStateToProps = state => ({
  refreshTime: state.auth.refreshInterval.timeoutSeconds,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ refresh }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthTimer);
