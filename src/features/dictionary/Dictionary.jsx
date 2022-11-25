import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWordDescr
} from './dictionarySlice';
import styles from './Dictionary.module.css';

export function Dictionary() {
  // const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [word, setWord] = useState('');

  return (
    <div className={styles.dictionary}>
      <form>
				<input className={styles.input} value={word} type="text" onChange={e => setWord(e.target.value)} />
				<button className={styles.button} type="submit" onClick={() => dispatch(fetchWordDescr(word))}>Look up</button>
			</form>
			<div className={styles.result}>
				definition
			</div>
    </div>
  )
}