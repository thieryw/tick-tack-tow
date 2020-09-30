import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {App} from "./App";

import {useEvt} from "evt/hooks";

const store = getStore();


render(<App store={store} />, document.getElementById('root'));
