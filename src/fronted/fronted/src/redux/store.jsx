// store.js
import { configureStore } from '@reduxjs/toolkit';
import { freelancersListReducer } from '@/redux/reducers/freelancersReducers';
import { userLoginReducer, userRegisterReducer } from '@/redux/reducers/userReducers';

import { projectCreateReducer, projectDetailsReducer, projectListReducer,projectCommentsReducer,taskCommentsReducer,milestoneCommentsReducer } from "@/redux/reducers/projectReducers.js";
import {
  profileDetailsReducer,
  skillsDetailsReducer,
  experienceDetailsReducer,
  educationDetailsReducer,
  portfolioDetailsReducer,
  ratingDetailsReducer,
  profileImagesReducer,
} from "./reducers/profileReducer";
import { projectOwnedListReducer, projectWorkingListReducer } from '@/redux/reducers/projectReducers';
import { milestoneListReducer } from "@/redux/reducers/milestoneReducers.js";
import {taskStatsReducer} from "@/redux/reducers/taskStatsReducer.js";
import {taskListReducer} from "@/redux/reducers/taskReducers.js";
import notificationsReducer from './reducers/notificationsReducer';
import { milestoneCreateReducer } from "@/redux/reducers/ultimateMilestoneReducer.js";
import {  taskCreateReducer } from "@/redux/reducers/ultimateTaskReducer.js";

const getLocalStorageItem = (key, defaultValue) => {
  const localStorageValue = localStorage.getItem(key);
  return localStorageValue && localStorageValue !== 'undefined'
      ? JSON.parse(localStorageValue)
      : defaultValue;
};

const userInfoFromStorage = getLocalStorageItem('userInfo', null);

const preloadedState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    profileDetails: profileDetailsReducer,
    skillsDetails: skillsDetailsReducer,
    experienceDetails: experienceDetailsReducer,
    educationDetails: educationDetailsReducer,
    portfolioDetails: portfolioDetailsReducer,
    ratingDetails: ratingDetailsReducer,
    projectDetails: projectDetailsReducer,
    projectList: projectListReducer,
    freelancersList: freelancersListReducer,
    projectCreate: projectCreateReducer,
    profileImages: profileImagesReducer,
    projectOwnedList: projectOwnedListReducer,
    projectWorkingList: projectWorkingListReducer,
    taskList: taskListReducer,
    milestoneList: milestoneListReducer,
    taskStats: taskStatsReducer,
    projectComments:projectCommentsReducer,
    milestoneComments: milestoneCommentsReducer,
    taskComments: taskCommentsReducer,
    notifications: notificationsReducer,
    taskCreateReducer: taskCreateReducer,
    milestoneCreateReducer: milestoneCreateReducer,

  },
  preloadedState,  // Aquí se agrega preloadedState
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;