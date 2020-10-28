/*
 *
 * ExamDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Toaster from 'components/Toaster';
import {
  Grid,
} from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
import mediquiz from 'assets/images/pkg_lst2.jpg';
import {
  makeSelectSuccess,
  makeSelectExams,
  makeSelectReportInfo
} from './selectors';
import {
  loadAllExamRequest,
  clearMessage,
  loadPackageExamsRequest,
} from './actions';

import './assests/style.scss';

const mapStateToProps = createStructuredSelector({
  isSuccess: makeSelectSuccess(),
  exams: makeSelectExams(),
  reportInfo:makeSelectReportInfo()
});

const mapDispatchToProps = dispatch => ({
  loadAllExamDisplay: (page, perPage, query) =>
    dispatch(loadAllExamRequest(page, perPage, query)),
  clearMessage: () => dispatch(clearMessage()),
  fetchPackageExams: package_id =>
    dispatch(loadPackageExamsRequest(package_id)),
});

class ExamDisplay extends React.Component {

  state = {
    page: 1,
    perPage: 10,
    query: {},
    data: {},
  };

  componentDidMount() {
    const { page, perPage, query } = this.state;
    let package_id = this.props.match.params.package_id
      ? this.props.match.params.package_id
      : '';
    this.setState({ package_id });
    let url = window.location.href.split('/');
    this.setState({ url });
    if (package_id) {
      this.props.fetchPackageExams(package_id);
    } else {
      this.props.loadAllExamDisplay(page, perPage, query);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reportInfo !== this.props.reportInfo) {
      this.setState({ reportSubmitted: nextProps.reportInfo && nextProps.reportInfo.toJS().assessment_submission_confirmed });
    }
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data && nextProps.data.toJS() });
    }
    if (nextProps.exams !== this.props.exams) {
      this.setState({ data: nextProps.exams.toJS() }, () => {
        if (this.state.url && this.state.url.includes('trial')) {
          let filter = [];
          filter = this.state.data.filter(trial => {
            return trial.is_available_trial_period == true;
          });
          this.setState({ data: filter });
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  onPaginate = (page, perPage) => {
    this.setState({ page, perPage });
    this.props.loadAllExamDisplay(page, perPage, this.state.query);
  };

  handleRadioChange = (e, data, idx) => {
    let newState = JSON.parse(JSON.stringify(this.state.data));
    newState[idx].quiz_type = data.value;
    this.setState({ data: newState });
    if (newState[idx].quiz_type === 'Practice') {
      newState[idx].quizRoute = 'practice-quiz';
    } else if (newState[idx].quiz_type === 'Exam') {
      newState[idx].quizRoute = 'exam-quiz';
    }
    this.setState({ data: newState });
  };

  render() {
    const { page, perPage, data, reportSubmitted } = this.state;
    let url = window.location.href.split('/');
    const {
      successResponse,
      errorResponse,
      xresponse,
      isRequesting,
      isSuccess,
    } = this.props;

    let message = null;
    // if (successResponse && typeof successResponse == 'string') {
    //   message = <Toaster message={xresponse} timeout={5000} success />;
    // }
    // if (errorResponse && typeof errorResponse == 'string') {
    //   message = <Toaster message={errorResponse} timeout={5000} error />;
    // }
    return (
      <div className="mr-5">
        {message && message}
        
        <React.Fragment>
          <Grid>
             {data && data.length > 0 ? (
              data.map((exam, idx) => (
                <Grid.Column
                  
                  key={`exam_${idx}`}
                >
                  <div className="two-col-grid">
                    <div className="obt-fit">
                    {exam.image_name.document_name ? (
                       <div>
                      <h1 className="main_title">
                        {this.props.location && this.props.location.state
                          ? this.props.location.state.title
                          : ''}
                         {exam.title}
                      </h1>
                      <div className="product-image">
                      <img
                        className="product-img"
                        src={`${DOCUMENT_URL_UPDATE}${
                          exam.image_name.document_name
                        }`}
                        alt={exam.title}
                      />
                      </div>
                      </div>
                    ) : (
                      <img src={mediquiz} />
                    )}
                    </div>
                    <div className="right product-detail">
                      <div className="">
                      <p className="product-profile"><span>Profile : </span>{exam.profile_name}</p>
                      <p className="product-industry"><span>Industry : </span>{exam.industry}</p>
                      <p className="product-price"><span>Price : </span><small>$</small>{exam.price}</p>
                      <p className="product-country"><span>Country : </span>{exam.country}</p>
                      <p className="product-description"><span>Description : </span>{exam.description}</p>
                     { reportSubmitted == true ? 
                      <Link
                          className="button buy-btn"
                          to={`/user/dashboard/product-display/questions/summary/${exam._id}`}
                          role="button"
                          disabled={Object.keys(this.state.data[idx]).includes(
                            'quiz_type',
                          )}
                        >
                          View Summary
                        </Link>
                        :
                        <Link
                        className="button buy-btn"
                        to={`/user/dashboard/product-display/questions/${exam._id}`}
                        role="button"
                        disabled={Object.keys(this.state.data[idx]).includes(
                          'quiz_type',
                        )}
                      >
                        Start your assessment
                      </Link>
                     }
                        </div>
                    </div>
                  </div>
                </Grid.Column>
              ))
            ) : isRequesting ? (
                <div className="ui segment loader-wrap">
                  <div className="ui active inverted dimmer">
                    <div className="ui small text loader">Loading.....</div>
                  </div>
                  <p></p>
                </div>
            ) : (
              <div>
                {Object.keys(data).length < 1 &&
                    <div className="ui segment loader-wrap">
                     <div className="ui active inverted dimmer">
                       <div className="ui small text loader">Loading.....</div>
                     </div>
                     <p></p>
                   </div>
                }
              </div>
            )}
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'productDisplay', reducer });
const withSaga = injectSaga({ key: 'productDisplay', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExamDisplay);
