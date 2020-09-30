import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { getStore, Store } from './logic';
import './style.css';