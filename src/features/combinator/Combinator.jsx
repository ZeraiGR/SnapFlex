import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateVerb,
  updateBundle
} from './combinatorSlice';
import styles from './Combinator.module.css';

export function Combinator() {
  // const count = useSelector(selectCount)
  const dispatch = useDispatch()
  // const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      Combinator
    </div>
  )
}