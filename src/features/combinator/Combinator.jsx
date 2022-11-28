import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
			<Link className="button muted-button" to={'/'}>To home</Link>
    </div>
  )
}