import React from 'react';
import { Link } from 'react-router-dom';

import {
  Grid,
  Form,
  Button,
  Radio,
  TextArea,
  Popup,
  Label,Progress
} from 'semantic-ui-react';
import '../assests/style.scss';

var complete;

const ViewPracticeQuestion = props => {
  const {
    data,
    productId,
    page,
    perPage,
    handleAnswerChange,
    saveSubjectiveAnswer,
    handleNextButton,
    handleViewResultButton,
    handleSubmitResultButton,
    questionIdx,
    showAnswer,
    error_msg,
    show_final_result,
    score,
    full_score,
    is_radio_disabled,
    time,
    isCorrect,
    count,
    resultResponse,
    url,
    handleBackButton,
    fav_questions,
    handleJump,
    correctAnswers,
    attempted_length,
    saveAnswerResponse,
    tempValue,
    subjectiveQuesId,
    bit,
    handleRevise,
    confirmSubmitQuestions,
    progressBar,
    summaryPage
  } = props;

   const yesno = [
           {answer: 'Yes'},
           {answer: 'No'}
   ]
   var final = progressBar
   var counter
   if(saveAnswerResponse.question_answer != undefined) {
  counter = 0
  Object.values(saveAnswerResponse.question_answer).map((value, index) => {
    if(value != '') {
      counter=counter+1
    }
  })
  final = (counter / (data.length)) * 100 
   } else if(saveAnswerResponse.question_answer != undefined) {
     final = progressBar
   }
  
  const progress = final

  return (
    <div>
      {!show_final_result && 
      <div>
        <h4>
          Total Questions : {data.length}
        </h4>
      <div style={{'marginRight' : '10%'}}>  
      <br />
      <Progress percent={progress != 0 ? progress : 0 } indicating />
      </div>
      </div>
      }
      <Grid>
        {data.length > 0 && !show_final_result && (
          <Grid.Column largeScreen={16} widescreen={16}>
            <div className="question-wrap mr-5">
               {questionIdx != 0 && (
                  <Popup content='Previous Question' trigger={
                  <Button 
                    size="mini"
                    color="blue"
                    className="buy-btn prev-btn"
                    onClick={e => handleBackButton(e, questionIdx)}
                    disabled={
                      questionIdx == 0 }>
                    <i className="icon-arrow-left mr-1" />
                  </Button> } />

                )} 
               {questionIdx < data.length - 1 && ( 
                  <Popup content='Next Question' trigger={<Button
                    size="mini"
                    color="blue"
                    className="buy-btn next-btn"
                    onClick={e => handleNextButton(e, questionIdx, data[questionIdx].questionnaire_id)}
                      disabled={
                        questionIdx > data.length - 1
                    }
                  >
                   
                    <i className="icon-arrow-right ml-1" />
                  </Button> } />
                 
                )} 
                {data && data[questionIdx] && data[questionIdx].answer_tip != '' &&
                <span className="float-right">Hint:

                  <Popup header='Answer Tip:' content={data[questionIdx].answer_tip} position='top right' trigger={<Button className="answer-tip" icon='idea' />} /></span>
                }
               <br />
                <br />
                <h4 className="item">
                  
                </h4>
             { data[questionIdx] && data[questionIdx].type_of_questions == "Objective" &&
              <Form>
                <div className="wrapper"> <h1 className="question-title"><b>Q.{questionIdx + 1}</b>  {data[questionIdx].question}</h1></div>
                <Form.Field>
                  {data[questionIdx].answers.length > 0 &&
                    data[questionIdx].answers.map((ans, idx) =>
                        <div key={`ans${idx}`}>
                          <Radio 
                            disabled={is_radio_disabled}
                            label={`${ans.answer}`}
                            value={ans.answer}
                            name={`ans${questionIdx}`}
                            checked={
                              saveAnswerResponse.question_answer && saveAnswerResponse.question_answer.hasOwnProperty(data[questionIdx].questionnaire_id) ? 
                              saveAnswerResponse.question_answer[data[questionIdx].questionnaire_id] === ans.answer : false
                            }
                            onChange={(e, se) =>
                              handleAnswerChange(e, se, idx, questionIdx, data[questionIdx].questionnaire_id)
                            }
                          />
                        </div>
                    )}
                </Form.Field>
              </Form>

             }
                { data[questionIdx] && data[questionIdx].type_of_questions == "Yes/No" &&
                     <div>
                      <div className="wrapper"> <h1 className="question-title"><b>Q.{questionIdx + 1}</b>  {data[questionIdx].question}</h1></div>
                   
                      <Form>
                        <Form.Field>
                         { yesno.length > 0 &&
                           yesno.map((ans, idx) => (
                           <div key={`ans${idx}`}>
                           <Radio
                             disabled={is_radio_disabled}
                             label={`${ans.answer}`}
                             value={ans.answer}
                             name={`ans${questionIdx}`}
                              // checked={
                              //   mockData.data.question_answer.hasOwnProperty(data[questionIdx].questionnaire_id) ? 
                              //       mockData.data.question_answer[data[questionIdx].questionnaire_id] === ans.answer : false
                              // }
                              checked={ 
                                saveAnswerResponse.question_answer && saveAnswerResponse.question_answer.hasOwnProperty(data[questionIdx].questionnaire_id) ? 
                                saveAnswerResponse.question_answer[data[questionIdx].questionnaire_id] === ans.answer : false
                              }
                             onChange={(e, se) =>
                               handleAnswerChange(e, se, idx, questionIdx, data[questionIdx].questionnaire_id)
                             }
                           />
                         </div>
                           )
                       )} 
                           </Form.Field>
                         </Form>
                        </div>
                  }
                  {data[questionIdx] && data[questionIdx].type_of_questions == "Subjective" &&
                  <div>
                   <div className="wrapper"> <h1 className="question-title"><b>Q.{questionIdx + 1}</b>  {data[questionIdx].question}</h1></div>
                   <Form onSubmit={() =>
                         saveSubjectiveAnswer(progress)}>
                     <Form.Field>
                    <TextArea 
                       placeholder='Tell us more' 
                       cols={100}
                       rows={5}
                        // value ={ mockData.data.question_answer.hasOwnProperty(data[questionIdx].questionnaire_id) ? 
                        //              mockData.data.question_answer[data[questionIdx].questionnaire_id] : ''}
                        value ={!bit && saveAnswerResponse && saveAnswerResponse.question_answer && saveAnswerResponse.question_answer.hasOwnProperty(data[questionIdx].questionnaire_id) ? 
                                   saveAnswerResponse.question_answer[data[questionIdx].questionnaire_id] : 
                                          data[questionIdx].questionnaire_id === subjectiveQuesId ? tempValue : '' }             
                        onChange={(e, se) =>
                          handleAnswerChange(e, se, '', questionIdx, data[questionIdx].questionnaire_id)}
                       />
                       </Form.Field>
                       <Form.Field>
                       <Button color="green" type='submit'>Save Answer</Button>
                       </Form.Field>
                     </Form> 
                    </div>
            
                  }
             
                {/* {questionIdx === data.length - 1 && (
                <Button
                  color="teal"
                  content="View Summary"
                  onClick={e => handleSubmitResultButton(e, questionIdx)}
                />
              )} */}
                          
               {/* {data && (
                <div className="pagination">
                  {data &&
                    data.length > 0 &&
                    data.map((each, idx) => (
                      <Label
                        // color={data[idx].user_answer && 'green'}
                        circular
                        key={`list${idx}`}
                        onClick={e => handleJump(e, idx, questionIdx)}
                      >
                        {idx + 1}
                      </Label>
                    ))}
                </div>
              )} */}
            </div>
          </Grid.Column>
        )}
      </Grid>
      <br />
      <br />
      {data &&
                data.length > 0 &&
                data.map((question, indx) => {
                  if(true){
                    complete = saveAnswerResponse && saveAnswerResponse.question_answer && saveAnswerResponse.question_answer.hasOwnProperty(question.questionnaire_id) && 
                     saveAnswerResponse.question_answer[question.questionnaire_id] != '' ? 
                       saveAnswerResponse.question_answer[question.questionnaire_id] : 'Not Answered'
                   }
                })
               }
               {data.length > 0 && !show_final_result &&
               <div>
                  <Button
                  color="teal"
                  content="View Summary"
                  onClick={e => handleSubmitResultButton(e, questionIdx)}
                />
                <Button disabled= {complete == 'Not Answered'} onClick={confirmSubmitQuestions} color="green">Confirm Submit</Button>
                </div>
               }

      {show_final_result && (
        <div>
          <div className="score_point">
            <h2 className="main_title">Detail</h2>
            {summaryPage != true &&
            <span>Note: Please answer every questions to submit for report generation.</span>
            }
          </div>
          <div className="resultdetail mr-5">
            <Grid>
              {data &&
                data.length > 0 &&
                data.map((question, indx) => {

                  if(true){
                    complete = saveAnswerResponse && saveAnswerResponse.question_answer && 
                      saveAnswerResponse.question_answer.hasOwnProperty(question.questionnaire_id) && 
                        saveAnswerResponse.question_answer[question.questionnaire_id] != '' ? 
                          saveAnswerResponse.question_answer[question.questionnaire_id] : 'Not Answered'
                   }
                  
                  return(
                  <Grid.Column
                    largeScreen={16}
                    widescreen={16}
                    key={`que${indx}`}
                  >
                      <div>
                          <div className="result_listing">
                          <div>
                            
                            <h3 className="question-title mb-3"><span><b>Q.{indx + 1}</b></span> {question.question}</h3>
                            <p className="your-answer"><b>:</b> 
                            { saveAnswerResponse && saveAnswerResponse.question_answer && 
                              saveAnswerResponse.question_answer.hasOwnProperty(question.questionnaire_id) && 
                                saveAnswerResponse.question_answer[question.questionnaire_id] != '' ? 
                                saveAnswerResponse.question_answer[question.questionnaire_id] : 'Not Answered' }
                            </p>
                            </div>
                          </div>
                      </div>
                  </Grid.Column>
                )
                })}
                {summaryPage != true &&
                  <div>
                  <Button onClick={e => handleRevise()} color="blue">Revise</Button>
                  <Button disabled= {complete == 'Not Answered'} onClick={confirmSubmitQuestions} color="green">Confirm Submit</Button>
                  </div>
                 }
                 {summaryPage == true &&
                 <div>
                    <Link
                    className="button buy-btn"
                    to={`/user/dashboard/product-display/${productId}`}
                    role="button"
                    >
                    Back
                  </Link>
                  <Link
                  className="button buy-btn"
                  to={`/user/dashboard/report/detail/${productId}`}
                  role="button"
                  >
                  Go to graph
                </Link>
                </div>
                 }
                </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPracticeQuestion;