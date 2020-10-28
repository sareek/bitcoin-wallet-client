/*
 *
 * ExamDisplay actions
 *
 */

import action from "utils/action";
import * as types from './constants';

export const loadAllExamRequest = action(types.LOAD_ALL_EXAM_REQUEST, 'page', 'perPage', 'query');
export const loadAllExamSuccess = action(types.LOAD_ALL_EXAM_SUCCESS, 'response');
export const loadAllExamFailure = action(types.LOAD_ALL_EXAM_FAILURE, 'error');

export const loadExamByIdRequest = action(types.LOAD_EXAM_BY_ID_REQUEST, 'exam_id');
export const loadExamByIdSuccess = action(types.LOAD_EXAM_BY_ID_SUCCESS, 'response');
export const loadExamByIdFailure = action(types.LOAD_EXAM_BY_ID_FAILURE, 'error');

export const loadPackageExamsRequest = action(types.LOAD_PACKAGE_EXAMS_REQUEST,'package_id');
export const loadPackageExamsSuccess = action(types.LOAD_PACKAGE_EXAMS_SUCCESS,'response');
export const loadPackageExamsFailure = action(types.LOAD_PACKAGE_EXAMS_FAILURE,'error');


export const clearMessage = action(types.CLEAR_MESSAGE);
